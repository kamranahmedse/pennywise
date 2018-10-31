const { app, Menu, shell } = require('electron');

module.exports = {
  setMainMenu
};

const isWindows = process.platform === 'win32';
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
 * Sets the main menu
 * @param mainWindow
 */
function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
          accelerator: isWindows ? null : 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Decrease Opacity',
          accelerator: 'CmdOrCtrl+Shift+Down',
          click() {
            mainWindow.setOpacity(
              getUpdatedOpacity(mainWindow.getOpacity(), -0.1)
            );
          }
        },
        {
          label: 'Increase Opacity',
          accelerator: 'CmdOrCtrl+Shift+Up',
          click() {
            mainWindow.setOpacity(
              getUpdatedOpacity(mainWindow.getOpacity(), 0.1)
            );
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
          label: 'Developer Tools',
          accelerator: 'CmdOrCtrl+Alt+I',
          click() {
            mainWindow.webContents.openDevTools();
          }
        }
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
