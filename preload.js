// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {isMacintosh} = require('@treverix/custom-electron-titlebar')
const customTitlebar = require('@treverix/custom-electron-titlebar');
const {Menu} = require('@treverix/remote')
const fs = require('fs')

document.addEventListener('DOMContentLoaded', (event) => {
  // It does not make sense to use the custom titlebar on macOS where
  // it only tries to simulate what we get with the normal behavior anyway.
  if (process.platform != 'darwin') {

    // add a menu
    const menu = new Menu();

    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#000F42'),
        icon: 'https://cdn.discordapp.com/attachments/729829070572879904/729833823403245647/logo_final_final.png',
        menu
    });
  }
})

document.addEventListener('readystatechange', (event) => {

    var head = document.getElementsByTagName('head')[0];
    var sty = document.createElement('style');
    sty.type = 'text/css';
    var css = `
      .titlebar{
          z-index: 999999;
      }
      .oneall_social_login{
          visibility: hidden;
      }

      div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton{
        top : 30px !important;
      }
      
      #wpadminbar{
          top: 30px !important;
      }
      
      /* There two selectors below is for the backsite (admin dashboard) */
      #adminmenuwrap{
        position: relative !important;
      }
      #adminmenu{
        top: 30px !important;
        margin : 40px 0 !important;
      }
      #wpbody{
          top: 30px !important;
      }
      }
      ` // You can compress all css files you need and put here
    if (sty.styleSheet){
      sty.styleSheet.cssText = css;
    } else {
      sty.appendChild(document.createTextNode(css));
    }
    head.appendChild(sty);

  var socialLogin = document.querySelector('.oneall_social_login');
  socialLogin.parentNode.removeChild(socialLogin);
});
  