const { contextBridge, ipcRenderer } = require('electron')

// Expose safe APIs to renderer
contextBridge.exposeInMainWorld('electron', {
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  toggleAlwaysOnTop: (state) => ipcRenderer.invoke('toggle-always-on-top', state),
})
