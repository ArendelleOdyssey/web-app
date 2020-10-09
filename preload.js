// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path');
const url = require('url');
const {isMacintosh} = require('@treverix/custom-electron-titlebar')
const customTitlebar = require('@treverix/custom-electron-titlebar');
const {Menu, MenuItem, ipcMain} = require('@treverix/remote')

window.addEventListener('DOMContentLoaded', () => {

  // It does not make sense to use the custom titlebar on macOS where
  // it only tries to simulate what we get with the normal behavior anyway.
  if (!isMacintosh) {

    // add a menu
    const menu = new Menu();

    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#000F42'),
        icon: 'https://cdn.discordapp.com/attachments/729829070572879904/729833823403245647/logo_final_final.png',
        menu
    });
  }

  var style = document.createElement('style');
  style.innerHTML = `
  /* Custom scrollbar */

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px 5px #75A8DB;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #AA7BB9;
    border-radius: 20px;
  }
  `;
  document.head.appendChild(style);
})