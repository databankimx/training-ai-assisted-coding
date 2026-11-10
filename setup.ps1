<#
.SYNOPSIS
  Sets up the AI-assisted coding course on this computer.

.DESCRIPTION
  1. Installs, with winget, anything that is missing: Git, Node.js (24 or later), Python (3.12 or later), the .NET SDK
     (10 or later), and Visual Studio Code. Anything already installed at a suitable version is left alone.
  2. Creates C:\Development\training if it doesn't exist.
  3. Clones the course repository into C:\Development\training\training-ai-assisted-coding, or updates it if it is
     already there.
  4. Installs the lesson runner's packages and runs its tests.

  When it finishes, open a terminal in C:\Development\training\training-ai-assisted-coding\lesson-runner and run:
      npm start

  The script does not sign anyone in to GitHub Copilot. That sign-in uses the learner's company account, and the
  Chapter 0 lesson explains it.

.PARAMETER Branch
  The branch to clone or update. Defaults to main.

.PARAMETER Root
  The folder that holds the training folder. Defaults to C:\Development.

.PARAMETER SkipTests
  Skips the lesson runner's tests after the packages are installed.

.EXAMPLE
  powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
#>
[CmdletBinding()]
param(
  [string]$Branch = 'main',
  [string]$Root = 'C:\Development',
  [switch]$SkipTests
)

$ErrorActionPreference = 'Stop'

$RepoUrl = 'https://github.com/databankimx/training-ai-assisted-coding.git'
$TrainingDir = Join-Path $Root 'training'
$RepoDir = Join-Path $TrainingDir 'training-ai-assisted-coding'
$RunnerDir = Join-Path $RepoDir 'lesson-runner'

# ---- Helpers ----

function Write-Step([string]$Text) {
  Write-Host ''
  Write-Host "==> $Text" -ForegroundColor Cyan
}

function Write-Note([string]$Text) {
  Write-Host "    $Text" -ForegroundColor DarkGray
}

# Runs a command and stops the script if it exits with an error.
function Invoke-Checked {
  param([string]$Description, [scriptblock]$Command)
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Description failed (exit code $LASTEXITCODE). Read the messages above, fix the problem, and run the script again."
  }
}

# Reloads the PATH from the registry, so a tool installed a moment ago can be found without a new window.
function Update-SessionPath {
  $machine = [Environment]::GetEnvironmentVariable('Path', 'Machine')
  $user = [Environment]::GetEnvironmentVariable('Path', 'User')
  $env:Path = "$machine;$user"
}

function Test-CommandExists([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

# Installs a package with winget. A fresh winget package may need a new window before its command is found.
function Install-WingetPackage {
  param([string]$Id, [string]$Label, [string[]]$ExtraArguments = @())
  Write-Note "Installing $Label with winget ($Id)..."
  $arguments = @('install', '--id', $Id, '--exact', '--source', 'winget',
                 '--accept-package-agreements', '--accept-source-agreements', '--silent') + $ExtraArguments
  & winget @arguments
  # winget returns 0 on success. It also returns a code when the package is already installed, which is fine.
  if ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne -1978335189) {
    throw "winget could not install $Label (exit code $LASTEXITCODE)."
  }
  Update-SessionPath
}

function Get-Version([string]$Command, [string[]]$Arguments) {
  try {
    $output = & $Command @Arguments 2>$null
    if ($LASTEXITCODE -ne 0 -or -not $output) { return $null }
    return ($output | Select-Object -First 1)
  } catch {
    return $null
  }
}

# ---- Step 0: winget ----

Write-Step 'Checking winget'
if (-not (Test-CommandExists 'winget')) {
  throw 'winget is not available. Install "App Installer" from the Microsoft Store, then run this script again.'
}
Write-Note 'winget is available.'

# ---- Step 1: tools ----

Write-Step 'Checking Git'
if (Test-CommandExists 'git') {
  Write-Note (Get-Version 'git' @('--version'))
} else {
  Install-WingetPackage -Id 'Git.Git' -Label 'Git'
  if (-not (Test-CommandExists 'git')) {
    throw 'Git was installed, but the git command is not found yet. Open a new terminal and run this script again.'
  }
}

Write-Step 'Checking Node.js (24 or later)'
$nodeVersion = $null
if (Test-CommandExists 'node') {
  $nodeVersion = Get-Version 'node' @('--version')
}
if (-not $nodeVersion -or [version]($nodeVersion.TrimStart('v')) -lt [version]'24.0.0') {
  Install-WingetPackage -Id 'OpenJS.NodeJS.LTS' -Label 'Node.js LTS'
  $nodeVersion = Get-Version 'node' @('--version')
}
if (-not $nodeVersion -or [version]($nodeVersion.TrimStart('v')) -lt [version]'24.0.0') {
  throw "Node.js 24 or later is needed, and this computer reports '$nodeVersion'. Install Node.js 24 by hand, open a new terminal, and run this script again."
}
Write-Note "Node.js $nodeVersion"

Write-Step 'Checking Python (3.12 or later)'
$pythonVersion = $null
if (Test-CommandExists 'python') {
  # On a fresh computer, 'python' can be a Microsoft Store stub that prints nothing useful. Only a real version counts.
  $pythonVersion = Get-Version 'python' @('--version')
  if ($pythonVersion -notmatch 'Python 3\.(\d+)') { $pythonVersion = $null }
}
$pythonOk = $false
if ($pythonVersion -and $pythonVersion -match 'Python 3\.(\d+)') {
  $pythonOk = [int]$Matches[1] -ge 12
}
if (-not $pythonOk) {
  Install-WingetPackage -Id 'Python.Python.3.12' -Label 'Python 3.12'
  $pythonVersion = Get-Version 'python' @('--version')
}
Write-Note "$pythonVersion"

Write-Step 'Checking the .NET SDK (10 or later)'
$dotnetOk = $false
if (Test-CommandExists 'dotnet') {
  $sdks = & dotnet --list-sdks 2>$null
  $dotnetOk = [bool]($sdks | Where-Object { $_ -match '^(1[0-9]|[2-9][0-9])\.' })
}
if (-not $dotnetOk) {
  Install-WingetPackage -Id 'Microsoft.DotNet.SDK.10' -Label '.NET 10 SDK'
  $sdks = & dotnet --list-sdks 2>$null
  $dotnetOk = [bool]($sdks | Where-Object { $_ -match '^(1[0-9]|[2-9][0-9])\.' })
}
if (-not $dotnetOk) {
  throw '.NET 10 SDK is needed. Install it by hand, open a new terminal, and run this script again.'
}
Write-Note (($sdks | Select-Object -Last 1) -replace '\s*\[.*$', '')

Write-Step 'Checking Visual Studio Code'
$codeExe = @(
  (Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code\Code.exe'),
  (Join-Path $env:ProgramFiles 'Microsoft VS Code\Code.exe')
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $codeExe) {
  Install-WingetPackage -Id 'Microsoft.VisualStudioCode' -Label 'Visual Studio Code' -ExtraArguments @('--scope', 'user')
  $codeExe = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code\Code.exe'),
    (Join-Path $env:ProgramFiles 'Microsoft VS Code\Code.exe')
  ) | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $codeExe) {
  throw 'Visual Studio Code is needed, but it could not be found after installing it. Install it by hand and run this script again.'
}
Write-Note $codeExe

# ---- Step 2: folders ----

Write-Step "Creating $TrainingDir if needed"
New-Item -ItemType Directory -Force -Path $TrainingDir | Out-Null
Write-Note 'Folder is ready.'

# ---- Step 3: the repository ----

Write-Step "Getting the course repository ($Branch)"
if (Test-Path (Join-Path $RepoDir '.git')) {
  Write-Note "The repository already exists at $RepoDir. Updating it."
  Invoke-Checked 'git fetch' { git -C $RepoDir fetch origin }
  Invoke-Checked "git checkout $Branch" { git -C $RepoDir checkout $Branch }
  Invoke-Checked "git pull $Branch" { git -C $RepoDir pull --ff-only origin $Branch }
} elseif (Test-Path $RepoDir) {
  throw "$RepoDir exists but is not a git repository. Move or rename that folder, then run this script again."
} else {
  Invoke-Checked 'git clone' { git clone --branch $Branch $RepoUrl $RepoDir }
}

# ---- Step 4: build the lesson runner ----

Write-Step 'Installing the lesson runner packages'
if (-not (Test-Path (Join-Path $RunnerDir 'package.json'))) {
  throw "The lesson runner was not found at $RunnerDir. Check that the branch '$Branch' contains lesson-runner."
}
Push-Location $RunnerDir
try {
  if (Test-Path 'package-lock.json') {
    Invoke-Checked 'npm ci' { npm.cmd ci }
  } else {
    Invoke-Checked 'npm install' { npm.cmd install }
  }

  if ($SkipTests) {
    Write-Note 'Skipping the tests (-SkipTests).'
  } else {
    Write-Step 'Running the lesson runner tests'
    npm.cmd test
    if ($LASTEXITCODE -ne 0) {
      Write-Host '    The tests did not all pass. The runner may still start, but tell the course owner.' -ForegroundColor Yellow
    } else {
      Write-Note 'All tests passed.'
    }
  }
} finally {
  Pop-Location
}

# ---- Done ----

Write-Host ''
Write-Host 'Setup is complete.' -ForegroundColor Green
Write-Host ''
Write-Host 'To start the lesson runner:' -ForegroundColor Green
Write-Host "    cd `"$RunnerDir`""
Write-Host '    npm start'
Write-Host ''
Write-Host 'To open the course in Visual Studio Code:' -ForegroundColor Green
Write-Host "    & `"$codeExe`" `"$RepoDir`""
Write-Host ''
Write-Host 'Chapter 0 explains how to sign in to GitHub Copilot with your company account.' -ForegroundColor DarkGray
