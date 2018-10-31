const { app, Menu, shell } = require('electron');

module.exports = {
  setMainMenu
};

const isWindows = process.platform === 'win32';

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
          accelerator: 'CmdOrCtrl+Down',
          click() {
            mainWindow.setOpacity(
              getUpdatedOpacity(mainWindow.getOpacity(), -0.1)
            );
          }
        },
        {
          label: 'Increase Opacity',
          accelerator: 'CmdOrCtrl+Up',
          click() {
            mainWindow.setOpacity(
              getUpdatedOpacity(mainWindow.getOpacity(), 0.1)
            );
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
      label: 'Tools',
      submenu: [
        {
          label: 'Development Window',
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
