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
        { role: 'togglefullscreen' }
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
            shell.openExternal(`https://github.com/kamranahmedse/pennywise/releases/tag/${appVersion}`);
          }
        },
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
