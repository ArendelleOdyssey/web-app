const { autoUpdater } = require("electron-updater")
autoUpdater.checkForUpdatesAndNotify()
const aourl = 'https://arendelleodyssey.com'
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
require('@treverix/remote/main').initialize()
const wait = require('util').promisify(setTimeout);
var closeLogoWindow

function createWindow (callback) {
  // Create the browser window.
    const window = new BrowserWindow({
      show : false,
      backgroundColor: '#000F42',
      icon: 'build/icon.png',
      title: 'Arendelle Odyssey',
      frame: process.platform == 'darwin',  // the custom titlebar is useless on mac os
      webPreferences: {
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
      }
    })
    

    window.setMenu(null);
    
    window.flashFrame(true)
    window.once('focus', () => window.flashFrame(false))

    // and load the index.html of the app.
    //window.loadFile('content/index.html')
    window.loadURL(aourl)

    //if (!window.isMaximized()) window.maximize()

  // Open the DevTools.
  //window.webContents.openDevTools()

  window.webContents.on('new-window', function(e, url) {
    if (!url.startsWith(aourl)){
      e.preventDefault();
      require('electron').shell.openExternal(url);
    }
  });

  window.webContents.on('will-navigate', (e, url) => {
    if (!url.includes(aourl)){
      e.preventDefault();
      require('electron').shell.openExternal(url);
    }
  })

  window.on('ready-to-show', () => {
    if (!window.isMaximized()) window.maximize()
    window.show()
    if (callback) callback()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.whenReady().then(createWindow)
app.on('ready', async () => {
  const useH = 500
  const useW = 400

  let logoWindow = new BrowserWindow({
    width: useW,
    height: useH,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'loadingWindow', 'preload.js'),
      nodeIntegration: false,
    },
    transparent: false,
    backgroundColor: '#252525',
    icon: 'build/icon.png',
    title: 'Loading AO Web App...',
    frame: false,
    center: true,
    show: false
  });
  // logoWindow.loadURL(`${aourl}/web-app/start.html`);
  // logoWindow.loadURL(`https://github.com/ArendelleOdyssey/web-app/raw/main/build/logowindow.html`);
  // logoWindow.loadFile('build/logowindow.html')
  logoWindow.loadURL(`file://${__dirname}/loadingWindow/logowindow.html`)
  logoWindow.once('ready-to-show', () => {
    logoWindow.show();
  });
  var checkMaximize = setInterval(() => {
    if (logoWindow.isMaximized()) logoWindow.unmaximize()
  }, 0)
  closeLogoWindow = () => {
    clearInterval(checkMaximize)
    logoWindow.close();
  };
  //logoWindow.webContents.openDevTools()
  //await wait(5000)
  
});

ipcMain.on('online', () => {
  createWindow(closeLogoWindow);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.