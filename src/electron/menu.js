const { app, Menu, shell } = require('electron');
const platform = require('../utils/platform');

module.exports = {
  setMainMenu
};

function setMainMenu() {
  const template = [
    {
      label: platform.isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: platform.isWindows ? 'Exit' : `Quit ${app.getName()}`,
          accelerator: platform.isWindows ? null : 'CmdOrCtrl+Q',
          click() {
            app.quit();
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