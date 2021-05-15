const {
    app,
    ipcMain,
    BrowserWindow
} = require("electron");

const path = require('path');

let mainWin, modalWin;

function createWindow() {

    // Create the browser window.
    mainWin = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: './assets/icons/logo.jpg',
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, '/preloads/main-preload.js') // use a preload script
        }
    });

    // Load app
    mainWin.maximize();
    mainWin.loadFile('./ui/main-window/home/index.html');
    mainWin.setMenuBarVisibility(false);
    mainWin.webContents.openDevTools();
}

app.on('ready', createWindow);

// IPC
ipcMain.on('main-window:open-db', (event, args) => {
    mainWin.loadFile('./ui/main-window/db/index.html');
});

ipcMain.on('main-window:open-reg', (event, args) => {
    mainWin.loadFile('./ui/main-window/reg/index.html');
});

ipcMain.on('main-window:open-home', (event, args) => {
    mainWin.loadFile('./ui/main-window/home/index.html');
});
