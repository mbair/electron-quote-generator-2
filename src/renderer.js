/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

 import $ from 'jquery';
 import 'bootstrap';
 import 'datatables.net/js/jquery.dataTables.min.js';
 import 'datatables.net-select/js/dataTables.select.min.js';
 import 'datatables.net-buttons/js/dataTables.buttons.min.js';
 import 'datatables.net-buttons/js/buttons.html5.min.js';
 import datatables_hu from './utils/datatables.hu.json';
 import { lubexpertLogo, mobil1Logo, isoLogo, lablecLogo, arajanlatTemplate } from './utils/arajanlatTemplate';
 import pdfMake from 'pdfmake/build/pdfmake';
 import pdfFonts from 'pdfmake/build/vfs_fonts';
 pdfMake.vfs = pdfFonts.pdfMake.vfs; // Fix: Roboto-Regular.ttf not found
 
 // we also need to process some styles with webpack
 import fontawesome from '@fortawesome/fontawesome';
 import { faCloudUploadAlt, faExclamationCircle, faCheckCircle } from '@fortawesome/fontawesome-free-solid';
 fontawesome.library.add(faCloudUploadAlt);
 fontawesome.library.add(faExclamationCircle);
 fontawesome.library.add(faCheckCircle);
import './styles/index.scss';

console.log('👋 This message is being logged by "renderer.js", included via webpack');
