// main.js
//
// The Electron main process. It finds the course, renders lessons, saves progress, checks which languages can run,
// runs a step's code when asked, opens links in the browser, and manages the pop-out lesson window. The page talks
// to this process only through the preload bridge.

'use strict';

const { app, BrowserWindow, ipcMain, Menu, screen, shell } = require('electron');
const { execFile, spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const { loadCatalog, flatten, summarize, neighbors } = require('./core/catalog');
const { createRenderer } = require('./core/markdown');
const { highlightCode, markdownHighlight } = require('./core/highlight');
const {
  emptyState,
  loadState,
  saveState,
  markVisited,
  recordProgress,
  lessonProgress,
  recordSolutionsRevealed,
  solutionsRevealed,
} = require('./core/state');
const { loadWindowState, saveWindowState, isVisibleOn } = require('./core/window-state');
const { probeAll } = require('./core/toolchains');
const { FILE_NAMES, commandFor } = require('./core/run');

// The runner lives in lesson-runner/, inside the course folder.
const courseRoot = path.resolve(__dirname, '..');
const rendererDir = path.join(__dirname, 'renderer');
const md = createRenderer({ highlight: markdownHighlight });

// The file extension for each language's starter and solution files: main.cs and solution.cs, and so on.
const EXTENSIONS = { csharp: 'cs', python: 'py', javascript: 'js' };
// Time allowed for one run. C# is slower to start, because the first run compiles the file.
const TIME_LIMIT_MS = { csharp: 60000, python: 10000, javascript: 10000 };

let mainWindow = null;
let popoutWindow = null;
let toolchainCache = null;
let activeRun = null;

function stateFile() {
  return path.join(app.getPath('userData'), 'progress.json');
}

function currentItems() {
  return flatten(loadCatalog(courseRoot));
}

function findItem(id) {
  return currentItems().find((candidate) => candidate.id === id) ?? null;
}

// The files named prefix.ext for each language a step has, read from the step's folder. Missing files are skipped.
function codeFiles(item, prefix) {
  const files = {};
  for (const language of item.languages) {
    const file = path.join(item.dir, `${prefix}.${EXTENSIONS[language]}`);
    if (fs.existsSync(file)) files[language] = fs.readFileSync(file, 'utf8');
  }
  return files;
}

// Which course languages can run here. The check runs once per session, and the result is kept.
function toolchains() {
  if (toolchainCache === null) toolchainCache = probeAll(execFile);
  return toolchainCache;
}

function openLesson(id) {
  const items = currentItems();
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Unknown lesson: ${id}`);

  const markdown = fs.readFileSync(item.markdownPath, 'utf8');
  const { previous, next } = neighbors(items, id);
  const state = loadState(stateFile());
  const isCodeStep = item.kind === 'step' && item.languages.length > 0;
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    html: md.render(markdown),
    markdown,
    previous: previous ? { id: previous.id, title: previous.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
    isLast: next === null,
    progress: lessonProgress(state, id),
    // For a code step: the languages it covers, its starter code in each, and whether its solutions are revealed.
    // The solutions themselves are not sent until the learner opens the gate.
    languages: isCodeStep ? item.languages : [],
    starters: isCodeStep ? codeFiles(item, 'main') : {},
    solutionsRevealed: isCodeStep && solutionsRevealed(state, id),
    // The learner's prompt file for a code step, if the step has one. It's language-neutral, so it isn't per language.
    // The sample prompt (prompt.md) is part of the solution, so like the solutions it is sent only once the gate is open.
    // It is rendered here, and the page shows it read-only.
    prompt: isCodeStep && solutionsRevealed(state, id) && fs.existsSync(path.join(item.dir, 'prompt.md'))
      ? md.render(fs.readFileSync(path.join(item.dir, 'prompt.md'), 'utf8'))
      : null,
  };
}

// Links in a lesson open in the learner's browser. Only web addresses are allowed, so a lesson can't start a program.
function openInBrowser(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
  shell.openExternal(parsed.toString());
  return true;
}

// Keeps a window from navigating away from the lesson page. Every outside link opens in the browser instead.
function guardWindow(window) {
  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    openInBrowser(url);
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    openInBrowser(url);
    return { action: 'deny' };
  });
}

function sendPopoutState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('popout:state', { open: popoutWindow !== null });
  }
}

function windowStateFile() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

// The pop-out reopens where it was last closed, if enough of that place is still on a screen. Otherwise the default
// place is used, so an unplugged monitor can't leave the window off-screen.
function savedPopoutBounds() {
  const saved = loadWindowState(windowStateFile());
  if (!saved) return null;
  const workAreas = screen.getAllDisplays().map((display) => display.workArea);
  return isVisibleOn(saved, workAreas) ? saved : null;
}

// Saves the pop-out's position and size as it moves, resizes, and closes. Moves are saved after a short pause, so a
// drag writes the file once rather than many times.
function rememberPopout(window) {
  let timer = null;
  const save = () => {
    if (window.isDestroyed()) return;
    const maximized = window.isMaximized();
    const bounds = maximized ? window.getNormalBounds() : window.getBounds();
    saveWindowState(windowStateFile(), { ...bounds, maximized });
  };
  const later = () => {
    clearTimeout(timer);
    timer = setTimeout(save, 400);
  };
  window.on('move', later);
  window.on('resize', later);
  window.on('close', save);
}

function openPopout(id) {
  if (popoutWindow !== null) {
    popoutWindow.webContents.send('page:show', id);
    popoutWindow.focus();
    return;
  }
  const saved = savedPopoutBounds();
  popoutWindow = createWindow({ mode: 'lesson', lesson: id, width: 900, height: 700, saved });
  if (saved && saved.maximized) popoutWindow.maximize();
  rememberPopout(popoutWindow);
  popoutWindow.on('closed', () => {
    popoutWindow = null;
    sendPopoutState();
  });
  sendPopoutState();
}

// Stops the run in progress, if there is one.
function stopActiveRun() {
  if (activeRun !== null) {
    activeRun.kill();
    activeRun = null;
  }
}

// Writes the learner's code to a file in the user data folder, runs it, and streams its output to the window that asked.
async function startRun(sender, lessonId, language, code) {
  const item = findItem(lessonId);
  if (!item || item.kind !== 'step' || !item.languages.includes(language)) {
    throw new Error('This step has no code in that language.');
  }
  if (typeof code !== 'string' || code.length > 200000) throw new Error('The code is too long to run.');

  const tool = (await toolchains())[language];
  if (!tool || !tool.available) throw new Error(`${language} is not installed on this computer.`);

  stopActiveRun();
  const dir = path.join(app.getPath('userData'), 'runs', lessonId.replace(/[^A-Za-z0-9-]+/g, '_'));
  fs.mkdirSync(dir, { recursive: true });
  const file = FILE_NAMES[language];
  fs.writeFileSync(path.join(dir, file), code, 'utf8');

  const { command, args } = commandFor(language, file);
  const send = (payload) => {
    if (!sender.isDestroyed()) sender.send('run:event', payload);
  };
  const child = spawn(command, args, { cwd: dir, windowsHide: true, shell: false });
  activeRun = child;
  child.stdin.end();

  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill();
  }, TIME_LIMIT_MS[language]);

  child.stdout.on('data', (chunk) => send({ kind: 'stdout', text: chunk.toString() }));
  child.stderr.on('data', (chunk) => send({ kind: 'stderr', text: chunk.toString() }));
  child.on('error', (error) => send({ kind: 'stderr', text: `${error.message}\n` }));
  child.on('close', (exitCode) => {
    clearTimeout(timer);
    if (activeRun === child) activeRun = null;
    send({ kind: 'done', code: exitCode, timedOut });
  });
}

function registerHandlers() {
  ipcMain.handle('catalog:list', () => summarize(loadCatalog(courseRoot)));
  ipcMain.handle('lesson:open', (_event, id) => openLesson(String(id)));
  ipcMain.handle('state:get', () => loadState(stateFile()));
  ipcMain.handle('state:visit', (_event, id) => {
    const items = currentItems();
    if (!items.some((item) => item.id === id)) throw new Error(`Unknown lesson: ${id}`);
    const next = markVisited(loadState(stateFile()), id);
    saveState(stateFile(), next);
    return next;
  });
  ipcMain.handle('link:open', (_event, url) => openInBrowser(String(url)));
  ipcMain.handle('progress:record', (_event, id, kind, index, value) => {
    const lessonId = String(id);
    if (!currentItems().some((item) => item.id === lessonId)) throw new Error(`Unknown lesson: ${lessonId}`);
    if (kind !== 'quiz' && kind !== 'spoiler') throw new Error(`Unknown progress kind: ${kind}`);
    if (!Number.isInteger(index) || index < 0 || index > 999) throw new Error('Progress index out of range');
    const valid = kind === 'quiz' ? Number.isInteger(value) && value >= 0 && value <= 99 : typeof value === 'boolean';
    if (!valid) throw new Error(`Invalid ${kind} value`);
    saveState(stateFile(), recordProgress(loadState(stateFile()), lessonId, kind, index, value));
  });
  // Clears saved progress and tells every open window to redraw its lesson.
  ipcMain.handle('progress:reset', () => {
    saveState(stateFile(), emptyState());
    for (const window of [mainWindow, popoutWindow]) {
      if (window && !window.isDestroyed()) window.webContents.send('progress:reset');
    }
  });
  // Opens a code step's solution gate. Only then are its solutions sent to the page, and the gate stays open.
  ipcMain.handle('solutions:reveal', (_event, id) => {
    const lessonId = String(id);
    const item = findItem(lessonId);
    if (!item || item.kind !== 'step' || item.languages.length === 0) throw new Error('This step has no solutions.');
    const solutions = codeFiles(item, 'solution');
    if (Object.keys(solutions).length === 0) throw new Error('The solution files for this step are missing.');
    saveState(stateFile(), recordSolutionsRevealed(loadState(stateFile()), lessonId));
    // The sample prompt and its reasoning (prompt.md) are part of the solution. They are rendered, and read-only in the page.
    const promptFile = path.join(item.dir, 'prompt.md');
    const prompt = fs.existsSync(promptFile) ? md.render(fs.readFileSync(promptFile, 'utf8')) : null;
    return { code: solutions, prompt };
  });
  ipcMain.handle('toolchains:get', () => toolchains());
  ipcMain.handle('code:highlight', (_event, code, language) => highlightCode(String(code), String(language)));
  ipcMain.handle('run:start', (event, id, language, code) =>
    startRun(event.sender, String(id), String(language), code),
  );
  ipcMain.handle('run:stop', () => {
    stopActiveRun();
  });
  ipcMain.handle('popout:open', (_event, id) => {
    openPopout(String(id));
  });
  ipcMain.handle('popout:navigated', (_event, id) => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('page:navigated', String(id));
  });
  ipcMain.handle('popout:sync', (_event, id) => {
    if (popoutWindow !== null) popoutWindow.webContents.send('page:show', String(id));
  });
  ipcMain.handle('popout:close', () => {
    if (popoutWindow !== null) popoutWindow.close();
  });
  ipcMain.handle('popout:state', () => ({ open: popoutWindow !== null }));
}

// A window for the lesson page. The main window shows the whole runner. A pop-out shows the lesson alone.
// A saved place, when given, sets the window's position as well as its size.
function createWindow({ mode, lesson, width = 1280, height = 820, saved = null }) {
  const placement = saved
    ? { x: saved.x, y: saved.y, width: saved.width, height: saved.height }
    : { width, height };
  const window = new BrowserWindow({
    ...placement,
    minWidth: 720,
    minHeight: 520,
    title: 'AI-Assisted Coding Training',
    icon: fs.existsSync(path.join(rendererDir, 'app.png')) ? path.join(rendererDir, 'app.png') : undefined,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  guardWindow(window);
  const query = mode ? { mode, lesson: lesson ?? '' } : undefined;
  window.loadFile(path.join(rendererDir, 'index.html'), query ? { query } : undefined);
  return window;
}

app.whenReady().then(() => {
  // The File, Edit, View, and Window menus are not used, so the menu bar is removed.
  Menu.setApplicationMenu(null);
  registerHandlers();
  mainWindow = createWindow({});
  mainWindow.on('closed', () => {
    mainWindow = null;
    stopActiveRun();
    if (popoutWindow !== null) popoutWindow.close();
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow({});
    }
  });
});

app.on('window-all-closed', () => {
  stopActiveRun();
  app.quit();
});
