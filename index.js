const {
    app,
    ipcMain,
    BrowserWindow
} = require("electron");

const path = require('path');

// Custom modules
const db = require('./modules/db/.');

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

function createModalAddDegree() {
    modalWin = new BrowserWindow({
        width: 600,
        height: 200,
        parent: mainWin,
        modal: true,
        frame: true,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, '/preloads/modal-add-degree-preload.js')
        }
    });

    modalWin.loadFile('./ui/modal-window/add-degree/index.html');
    modalWin.setMenuBarVisibility(false);
    modalWin.webContents.openDevTools();
}

app.on('ready', createWindow);

// IPC
ipcMain.on('main-window:open-db', (event, args) => {
    mainWin.loadFile('./ui/main-window/db/index.html');
});

ipcMain.on('main-window:init-db', (event, args) => {    
    mainWin.webContents.send('main-window:on-db-init', db.getData());
});

ipcMain.on('main-window:open-reg', (event, args) => {
    mainWin.loadFile('./ui/main-window/reg/index.html');
});

ipcMain.on('main-window:open-home', (event, args) => {
    mainWin.loadFile('./ui/main-window/home/index.html');
});

ipcMain.on('main-window:db-save-changes', (event, args) => {
    db.setData(args);
})

ipcMain.on('main-window:open-modal-add-degree', (event, args) => {
    createModalAddDegree();
});
