const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { processFile, processJSON } = require('./utils/processItems');
const { Notification } = require('electron')
// import { showOpenDialog } from './dialogs';
// import url from 'url';

// Windows alatt beállítjuk az APP nevét
// Értesítéseknél jelenik meg
if (process.platform === 'win32') {
    app.setAppUserModelId(app.name);
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

console.log('-- path', path);
console.log('-- __dirname', __dirname);

var win;
const ipc = ipcMain;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // maximize the window size
  win.maximize();

  // Open the DevTools.
  win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.on('ready', () => {
  ipcMain.on('file-dropped', (event, filePath) => {

    console.log('filePath', filePath)

    let fileExt = filePath.split('.').pop();
    
    switch (fileExt) {
      case 'xls':
      case 'xlsx':
        processFile(filePath, null, win)
        break
      case 'json':
        processJSON(filePath, null, win)
        break
      default:
        new Notification({ title: 'Nem megfelelő fájlformátum!', body: 'Csak XLS, XLSX, JSON kiterjesztésű fájlok megengedettek' }).show()
    }
  });

  // ipcMain.on('ajanlat-save', (event, data) => {
  //   console.log(data)
  // });

  createWindow();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('saveText', (event, txtVal) => {
  console.log('saveText');
  fs.writeFile('teszt.txt', txtVal, (err) => {
    if (!err) {
      console.log('File written!')
    } else {
      console.log(err)
    }
  })
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
