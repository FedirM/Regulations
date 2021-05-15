
document.getElementById('db-btn').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-db');
});

document.getElementById('reg-btn').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-reg');
});
