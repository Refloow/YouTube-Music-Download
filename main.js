// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const YtDlpWrap = require('yt-dlp-wrap').default;

const ytDlpWrap = new YtDlpWrap();
let selectedDownloadFolder = null;
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// Set ffmpeg path depending on environment
const ffmpegPath = app.isPackaged
  ? path.join(process.resourcesPath, 'ffmpeg.exe')
  : path.join(__dirname, 'bin', 'ffmpeg.exe');

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

function loadSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath);
      const settings = JSON.parse(data);
      selectedDownloadFolder = settings.downloadFolder || null;
    }
  } catch (err) {
    console.error('Error loading settings:', err);
  }
}

function saveSettings() {
  try {
    const settings = { downloadFolder: selectedDownloadFolder };
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

app.whenReady().then(() => {
  loadSettings();

  try {
    const binaryPath = app.isPackaged
      ? path.join(process.resourcesPath, 'yt-dlp.exe')
      : path.join(__dirname, 'bin', 'yt-dlp.exe');

    ytDlpWrap.setBinaryPath(binaryPath);
  } catch (err) {
    console.error('Failed to set yt-dlp binary path:', err);
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('select-download-folder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Select Default Download Folder',
    properties: ['openDirectory']
  });

  if (!canceled && filePaths.length > 0) {
    selectedDownloadFolder = filePaths[0];
    saveSettings();
    return selectedDownloadFolder;
  }

  return null;
});

ipcMain.handle('get-saved-folder', () => {
  return selectedDownloadFolder;
});

ipcMain.on('download-audio', async (event, { url, format }) => {
  if (!selectedDownloadFolder) {
    return event.sender.send('download-error', 'No folder selected. Please select a download folder first.');
  }

  let videoTitle = 'audio';
  try {
    const info = await ytDlpWrap.getVideoInfo(url);
    videoTitle = info.title.replace(/[\\/:*?"<>|]/g, '');
  } catch (err) {
    console.error('Failed to fetch video info:', err);
  }

  const extension = format === 'mp3' ? 'mp3' : 'webm';
  const outputTemplate = path.join(selectedDownloadFolder, `${videoTitle}.${extension}`).replace(/\\/g, '/');

  const args = [
    url,
    '-f', 'bestaudio',
    '-o', outputTemplate,
  ];

  if (format === 'mp3') {
    args.push('-x', '--audio-format', 'mp3', '--ffmpeg-location', ffmpegPath);
  }

  const download = ytDlpWrap.exec(args);

  download.on('progress', (progress) => {
    event.sender.send('download-progress', progress.percent);
  });

  download.on('close', () => {
    event.sender.send('download-complete');
  });
});
