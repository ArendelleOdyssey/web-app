// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {isMacintosh} = require('@treverix/custom-electron-titlebar')
const customTitlebar = require('@treverix/custom-electron-titlebar');
const {Menu} = require('@treverix/remote')
const fs = require('fs')

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
  style.innerHTML = fs.readFileSync('./style.css', 'utf-8');
  document.head.appendChild(style);
})