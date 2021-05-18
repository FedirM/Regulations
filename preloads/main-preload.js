const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "ipc", {
        send (channel, data) {
            // whitelist channels
            let validChannels = [
                'main-window:open-db',
                'main-window:open-reg',
                'main-window:open-home',
                'main-window:init-db',
                'main-window:db-save-changes'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            } else {
                console.log('ERROR: Attempt to use UNVALID channel');
            }
        },
        on (channel, func) {
            // whitelist channels
            let validChannels = [
                'main-window:on-db-init'
            ];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            } else {
                console.log('ERROR: Attempt to use UNVALID channel');
            }
        }
    }
);
