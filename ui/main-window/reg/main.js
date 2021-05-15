
document.getElementById('back-btn').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-home');
});
