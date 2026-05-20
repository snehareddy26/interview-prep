const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow

function createWindow() {
  // Create frameless, transparent window
  mainWindow = new BrowserWindow({
    width: 420,
    height: 500,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    level: 'screen-saver',
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  })

  // Hide from dock (Mac)
  if (process.platform === 'darwin') {
    app.dock.hide()
  }

  // Invisible in screen share (Mac)
  mainWindow.setContentProtection(true)

  // Load React app (Vite dev server or production build)
  const startUrl = isDev
    ? 'http://localhost:5173' // Vite dev server
    : `file://${path.join(__dirname, 'dist/index.html')}`

  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On Mac, keep app running until Cmd+Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Global hotkey to toggle window visibility
const globalShortcut = require('electron').globalShortcut

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })
})

// IPC handlers for preload
ipcMain.handle('minimize-window', () => {
  mainWindow.minimize()
})

ipcMain.handle('toggle-always-on-top', (event, state) => {
  mainWindow.setAlwaysOnTop(state)
})
