
function init() {
    document.forms['new-degree'].addEventListener('submit', onFormSubmit);
    document.getElementById('cancel-btn').addEventListener('click', onCancelForm);
}

function onFormSubmit(event) {
    event.preventDefault();
    const data = {
        fullName: document.getElementById('fullName').value,
        name: document.getElementById('name').value
    }
    console.log('DATA: ', data);
}

function onCancelForm(event) {
    console.log('Cancel form');
}