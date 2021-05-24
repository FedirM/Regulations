const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "ipc", {
        send (channel, data) {
            // whitelist channels
            let validChannels = [
                'modal-window:confirm',
                'modal-window:cancel'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            } else {
                console.log('ERROR: Attempt to use UNVALID channel');
            }
        },
        on (channel, func) {
            // whitelist channels
            let validChannels = [];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            } else {
                console.log('ERROR: Attempt to use UNVALID channel');
            }
        }
    }
);