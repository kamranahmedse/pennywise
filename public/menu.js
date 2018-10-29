const { app, Menu, shell, ipcRenderer } = require('electron');

module.exports = {
  setMainMenu
};

const isWindows = process.platform === 'win32';

function minus(mainWindow) {
  const opacity = (mainWindow.getOpacity() * 100) - 10;
  if (opacity < 20) {
   return 20 / 100;
  } else  {
    return opacity / 100;
  }
}

function plus(mainWindow) {
  const opacity = (mainWindow.getOpacity() * 100) + 10;
  if (opacity > 100) {
    return 100 / 100;
  } else  {
    return opacity / 100;
  }
}

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
          label: 'Lower Opacity',
          accelerator: 'CmdOrCtrl+-',
          click() {
            mainWindow.setOpacity(minus(mainWindow));
          }
        },
        {
          label: 'Increase Opacity',
          accelerator: 'CmdOrCtrl+=',
          click() {
            mainWindow.setOpacity(plus(mainWindow));
          }
        },
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' }, //just adds a line visually
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}