const { app, dialog, Menu, shell } = require('electron');

module.exports = {
  setMainMenu
};

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const appVersion = app.getVersion();

/**
 * Gets the updated opacity with the given update factor
 * @param currentOpacity
 * @param updateFactor
 * @return {*}
 */
function getUpdatedOpacity(currentOpacity, updateFactor) {
  let newOpacity = currentOpacity + updateFactor;

  if (newOpacity >= 1) {
    return 1;
  } else if (newOpacity <= 0.2) {
    return 0.2;
  } else {
    return newOpacity;
  }
}

/**
 * Conditionally gets the menu items for changing window
 * opacity if it is supported
 * @param mainWindow
 * @return {array}
 */
function getOpacityMenuItems(mainWindow) {
  if (!isWindows && !isMac) {
    return [];
  }

  return [
    {
      label: 'Decrease Opacity',
      accelerator: 'CmdOrCtrl+Shift+Down',
      click() {
        const nextOpacity = getUpdatedOpacity(mainWindow.getOpacity(), -0.1);

        mainWindow.webContents.send('opacity.sync', nextOpacity * 100);
        mainWindow.setOpacity(nextOpacity);
      }
    },
    {
      label: 'Increase Opacity',
      accelerator: 'CmdOrCtrl+Shift+Up',
      click() {
        const nextOpacity = getUpdatedOpacity(mainWindow.getOpacity(), 0.1);

        mainWindow.webContents.send('opacity.sync', nextOpacity * 100);
        mainWindow.setOpacity(nextOpacity);
      }
    },
    {
      label: 'Set Opacity',
      submenu:[
        {
          label: '10%',
          accelerator: 'CmdOrCtrl+1',
          click() {
            mainWindow.webContents.send('opacity.sync', 10);
            mainWindow.setOpacity(0.1);
          }
        },
        {
          label: '20%',
          accelerator: 'CmdOrCtrl+2',
          click() {
            mainWindow.webContents.send('opacity.sync', 20);
            mainWindow.setOpacity(0.2);
          }
        },
        {
          label: '30%',
          accelerator: 'CmdOrCtrl+3',
          click() {
            mainWindow.webContents.send('opacity.sync', 30);
            mainWindow.setOpacity(0.3);
          }
        },
        {
          label: '40%',
          accelerator: 'CmdOrCtrl+4',
          click() {
            mainWindow.webContents.send('opacity.sync', 40);
            mainWindow.setOpacity(0.4);
          }
        },
        {
          label: '50%',
          accelerator: 'CmdOrCtrl+5',
          click() {
            mainWindow.webContents.send('opacity.sync', 50);
            mainWindow.setOpacity(0.5);
          }
        },
        {
          label: '60%',
          accelerator: 'CmdOrCtrl+6',
          click() {
            mainWindow.webContents.send('opacity.sync', 60);
            mainWindow.setOpacity(0.6);
          }
        },
        {
          label: '70%',
          accelerator: 'CmdOrCtrl+7',
          click() {
            mainWindow.webContents.send('opacity.sync', 70);
            mainWindow.setOpacity(0.7);
          }
        },
        {
          label: '80%',
          accelerator: 'CmdOrCtrl+8',
          click() {
            mainWindow.webContents.send('opacity.sync', 80);
            mainWindow.setOpacity(0.8);
          }
        },
        {
          label: '90%',
          accelerator: 'CmdOrCtrl+9',
          click() {
            mainWindow.webContents.send('opacity.sync', 90);
            mainWindow.setOpacity(0.9);
          }
        },
        {
          label: '100%',
          accelerator: 'CmdOrCtrl+0',
          click() {
            mainWindow.webContents.send('opacity.sync', 100);
            mainWindow.setOpacity(1);
          }
        },
      ]
    },
    { type: 'separator' },
  ];
}

/**
 * Sets the main menu
 * @param mainWindow
 */
function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog(function (fileNames) {
              if (!fileNames || !fileNames[0]) {
                return;
              }

              // For the file URLs, load them directly
              // Append the `file://` prefix otherwise
              const url = /^file:\/\/\//.test(fileNames[0]) ? fileNames[0] : `file://${fileNames[0]}`;
              mainWindow.loadURL(url);
            });
          }
        },
        { role: 'close' },
        { type: 'separator' },
        { role: 'quit' },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Embed Videos',
          type: 'checkbox',
          checked: true,
          click(menuItem) {
            mainWindow.webContents.send('embedVideos.set', menuItem.checked);
          }
        },
        { type: 'separator' },
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        ...getOpacityMenuItems(mainWindow),
        {
          label: 'Toggle Navbar',
          accelerator: 'CmdOrCtrl+Shift+L',
          click() {
            mainWindow.webContents.send('nav.toggle');
          }
        },
        {
          label: 'Focus URL',
          accelerator: 'CmdOrCtrl+L',
          click() {
            mainWindow.webContents.send('nav.show');
            mainWindow.webContents.send('nav.focus');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Detached Mode',
          accelerator: 'CmdOrCtrl+Shift+D',
          click() {
            app.dock && app.dock.setBadge('Detached');
            mainWindow.setIgnoreMouseEvents(true);
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Developer Tools',
          accelerator: 'CmdOrCtrl+Alt+I',
          click() {
            mainWindow.webContents.openDevTools();
          }
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin', accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomout' },
        { type: 'separator' },
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Found a Bug',
          click() {
            shell.openExternal('https://github.com/kamranahmedse/pennywise/issues/new');
          }
        },
        {
          label: 'Suggestions',
          click() {
            shell.openExternal('https://github.com/kamranahmedse/pennywise/issues/new');
          }
        },
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://github.com/kamranahmedse');
          }
        },
        {
          label: `About Version`,
          click() {
            shell.openExternal(`https://github.com/kamranahmedse/pennywise/releases/tag/v${appVersion}`);
          }
        },
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
