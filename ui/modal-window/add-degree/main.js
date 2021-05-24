
function init() {
    document.forms['new-degree'].addEventListener('submit', onFormSubmit);
    document.getElementById('cancel-btn').addEventListener('click', onCancelForm);
}

function onFormSubmit(event) {
    event.preventDefault();
    const data = {
        fullName: document.getElementById('fullName').value,
        shortName: document.getElementById('shortName').value
    }
    window.ipc.send('modal-window:confirm', data);
}

function onCancelForm(event) {
    window.ipc.send('modal-window:cancel');
}