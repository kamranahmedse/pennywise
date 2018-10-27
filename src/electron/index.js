const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

const Constants = require('../utils/constants');
const { setMainMenu } = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT,
    backgroundColor: Constants.BACKGROUND_COLOR,
    show: false,
  });

  const appUrl = process.env.APP_URL || url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'index.html')
  });

  mainWindow.loadURL(appUrl);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Set the window to be always on top
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  // Open the dev-tools
  mainWindow.webContents.openDevTools();

  // Handler to set or get window opacity
  ipcMain.on('opacity', (event, opacity) => {
    // If no arguments given, return the current opacity
    if (!opacity) {
      // Multiplying by 100 – browser range is 0 to 100
      event.returnValue = mainWindow.getOpacity() * 100;
    } else {
      // Divide by 100 – window range is 0.1 to 1.0
      mainWindow.setOpacity(opacity / 100);
      event.returnValue = opacity;
    }
  });

  setMainMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});