// tools/check-course.js
//
// Checks the course for problems that are easy to miss by reading. Run it from the course root:
//   node tools/check-course.js
// It prints each problem with its file, and exits with code 1 if there are any. It runs no lessons.
//
// Checks:
//   1. Every chapter folder (chNN-name) has lesson.md, and every step folder (NN-name) has lesson.json and lesson.md.
//   2. Every prerequisite names an existing step title, exactly, and that step comes earlier in the course.
//   3. No two steps share a title.
//   4. Every quiz question has exactly one correct option (the mark is a filled circle).
//   5. Every runnable step has a starter and a solution for each language it lists.
//   6. No em dashes in course documentation (.md and .json files outside resources/ and node_modules/).

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const CHAPTER = /^ch\d\d-/;
const STEP = /^\d\d-/;
const EXTENSIONS = { csharp: 'cs', python: 'py', javascript: 'js' };
const EM_DASH = '\u2014';
const CORRECT = '\u25c9';   // filled circle
const WRONG = '\u25cb';     // hollow circle
const FEEDBACK = '\u2192';  // right arrow

const problems = [];
function problem(file, message) {
  problems.push(`${path.relative(ROOT, file) || file}: ${message}`);
}

function folders(dir, pattern) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && pattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    problem(file, `not valid JSON (${error.message})`);
    return null;
  }
}

// Checks each quiz block: every question has exactly one filled circle before its feedback lines.
function checkQuizzes(file, markdown) {
  const lines = markdown.split(/\r?\n/);
  let inQuiz = false;
  let question = null;

  function finishQuestion() {
    if (question && question.correct !== 1) {
      problem(file, `quiz question "${question.text}" has ${question.correct} correct options, expected 1`);
    }
    question = null;
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!inQuiz) {
      if (line === '```quiz') {
        inQuiz = true;
        question = null;
      }
      continue;
    }
    if (line === '```') {
      finishQuestion();
      inQuiz = false;
      continue;
    }
    if (line === '') continue;
    if (line.startsWith(CORRECT) || line.startsWith(WRONG)) {
      if (!question) {
        problem(file, `quiz option on line ${i + 1} has no question`);
        continue;
      }
      if (line.startsWith(CORRECT)) question.correct += 1;
      continue;
    }
    if (line.startsWith(FEEDBACK)) continue;
    // Any other line starts a new question. A question that is still open here has no correct option.
    finishQuestion();
    question = { text: line.slice(0, 60), correct: 0 };
  }
  if (inQuiz) problem(file, 'quiz block is not closed');
}

function checkEmDashes(file, text) {
  const index = text.indexOf(EM_DASH);
  if (index !== -1) {
    const line = text.slice(0, index).split(/\r?\n/).length;
    problem(file, `em dash on line ${line}`);
  }
}

function walkDocuments(dir, found) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'resources' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDocuments(full, found);
    else if (entry.name.endsWith('.md') || entry.name.endsWith('.json')) found.push(full);
  }
  return found;
}

// ---- Collect chapters and steps in course order ----

const chapters = folders(ROOT, CHAPTER);
const orderedSteps = [];

for (const chapterName of chapters) {
  const chapterDir = path.join(ROOT, chapterName);
  const intro = path.join(chapterDir, 'lesson.md');
  if (!fs.existsSync(intro)) {
    problem(chapterDir, 'chapter has no lesson.md');
    continue;
  }

  for (const stepName of folders(chapterDir, STEP)) {
    const stepDir = path.join(chapterDir, stepName);
    const jsonFile = path.join(stepDir, 'lesson.json');
    const mdFile = path.join(stepDir, 'lesson.md');

    if (!fs.existsSync(jsonFile)) problem(stepDir, 'step has no lesson.json');
    if (!fs.existsSync(mdFile)) problem(stepDir, 'step has no lesson.md');
    if (!fs.existsSync(jsonFile)) continue;

    const meta = readJson(jsonFile);
    if (!meta) continue;
    if (typeof meta.title !== 'string' || meta.title.trim() === '') {
      problem(jsonFile, 'step has no title');
      continue;
    }

    const languages = Array.isArray(meta.languages) ? meta.languages : [];
    if (meta.runtime === 'multi') {
      if (languages.length === 0) problem(jsonFile, 'runnable step lists no languages');
      for (const language of languages) {
        const extension = EXTENSIONS[language];
        if (!extension) {
          problem(jsonFile, `unknown language "${language}"`);
          continue;
        }
        for (const name of ['main', 'solution']) {
          const file = path.join(stepDir, `${name}.${extension}`);
          if (!fs.existsSync(file)) problem(stepDir, `missing ${name}.${extension} for ${language}`);
        }
      }
    }

    orderedSteps.push({
      title: meta.title,
      prerequisites: Array.isArray(meta.prerequisites) ? meta.prerequisites : [],
      file: jsonFile,
      markdownFile: mdFile,
    });
  }
}

// ---- Titles and prerequisites ----

const titleIndex = new Map();
orderedSteps.forEach((step, index) => {
  if (titleIndex.has(step.title)) {
    problem(step.file, `title "${step.title}" is used by more than one step`);
  } else {
    titleIndex.set(step.title, index);
  }
});

orderedSteps.forEach((step, index) => {
  for (const prerequisite of step.prerequisites) {
    if (!titleIndex.has(prerequisite)) {
      problem(step.file, `prerequisite "${prerequisite}" is not the exact title of any step`);
    } else if (titleIndex.get(prerequisite) >= index) {
      problem(step.file, `prerequisite "${prerequisite}" comes later in the course`);
    }
  }
});

// ---- Quizzes and em dashes in every course document ----

for (const step of orderedSteps) {
  if (fs.existsSync(step.markdownFile)) {
    checkQuizzes(step.markdownFile, fs.readFileSync(step.markdownFile, 'utf8'));
  }
}
for (const chapterName of chapters) {
  const intro = path.join(ROOT, chapterName, 'lesson.md');
  if (fs.existsSync(intro)) checkQuizzes(intro, fs.readFileSync(intro, 'utf8'));
}

for (const file of walkDocuments(ROOT, [])) {
  checkEmDashes(file, fs.readFileSync(file, 'utf8'));
}

// ---- Report ----

if (problems.length === 0) {
  console.log(`OK: ${chapters.length} chapters, ${orderedSteps.length} steps, no problems found.`);
  process.exit(0);
}

console.log(`${problems.length} problem(s) found:`);
for (const message of problems) console.log(`  ${message}`);
process.exit(1);
