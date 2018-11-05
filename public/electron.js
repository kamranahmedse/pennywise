const { app, BrowserWindow, ipcMain } = require('electron');
const pdfWindow = require('electron-pdf-window');
const path = require('path');

const { setMainMenu } = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Pennywise',
    width: 700,
    height: 600,
    autoHideMenuBar: true,
    backgroundColor: '#16171a',
    show: false,
    webPreferences: {
      plugins: true
    },
  });

  pdfWindow.addSupport(mainWindow);

  const isDev = !!process.env.APP_URL;
  if (process.env.APP_URL) {
    mainWindow.loadURL(process.env.APP_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  // Show the window once the content has been loaded
  mainWindow.on('ready-to-show', () => {
    // Hide the dock icon before showing and
    // show it once the app has been displayed
    // @link https://github.com/electron/electron/issues/10078
    // @fixme hack to make it show on full-screen windows
    app.dock && app.dock.hide();
    mainWindow.show();
    app.dock && app.dock.show();

    // Set the window to be always on top
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.setFullScreenable(false);

    bindIpc();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Open the dev tools only for dev
  // and when the flag is not set
  if (isDev && !process.env.DEV_TOOLS) {
    mainWindow.webContents.openDevTools();
  }

  setMainMenu(mainWindow);
}

// Binds the methods for renderer/electron communication
function bindIpc() {
  // Binds the opacity getter functionality
  ipcMain.on('opacity.get', (event) => {
    // Multiplying by 100 – browser range is 0 to 100
    event.returnValue = mainWindow.getOpacity() * 100;
  });

  ipcMain.on('opacity.set', (event, opacity) => {
    // Divide by 100 – window range is 0.1 to 1.0
    mainWindow.setOpacity(opacity / 100);
  });
}

// Makes the app start receiving the mouse interactions again
function disableDetachedMode() {
  app.dock && app.dock.setBadge('');
  mainWindow && mainWindow.setIgnoreMouseEvents(false);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Make the window start receiving mouse events on focus/activate
app.on('browser-window-focus', disableDetachedMode);
app.on('activate', disableDetachedMode);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
