const { app, BrowserWindow } = require('electron')
const path = require('path');
const { spawn } = require('child_process');

const isDev = !app.isPackaged;

const backendPath = isDev
  ? 'backend.py'
  : path.join(process.resourcesPath, 'python', 'backend.exe');

const flask = isDev
  ? spawn('python', [backendPath])
  : spawn(backendPath);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 340,
    height: 420,
    frame: false,
    transparent: true,
    opacity: 0.95,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { ipcMain } = require('electron')

ipcMain.on('close-window', () => {
    win.close()
})
