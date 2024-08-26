const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
      //nodeIntegration: true,
    },
  })

  win.loadFile('index.html')

  win.on("ready-to-show", () => {
    //console.log(Object.keys(win.webContents))
    //nodeIntegrationInWorker
    //console.log('win.webContents.nodeIntegration:', win.webContents.nodeIntegration)
    //win.webContents.openDevTools();
    //console.log(win.webContents)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
