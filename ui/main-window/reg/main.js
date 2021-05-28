
var db = null;
var stepper = null;
var fileList = [];

document.addEventListener('DOMContentLoaded', initStepper);

document.getElementById('back-btn').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-home');
});

document.getElementById('btn-add-new-file').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-file-picker');
});

// Array.from(document.getElementsByClassName('step-trigger')).forEach(btn => {
//     // btn.addEventListener('click', stepperNavigate);
// });

Array.from(document.getElementsByClassName('bi-chevron-left')).forEach(btn => {
    btn.addEventListener('click', previousStep);
});

Array.from(document.getElementsByClassName('bi-chevron-right')).forEach(btn => {
    btn.addEventListener('click', nextStep);
});

function initProfessorList( list ) {
    const selectHTML = document.getElementById('professors-identifier');
    for(let prof of [ {p_id: 0, p_name: 'NULL'}, ...list]) {
        selectHTML.insertAdjacentHTML('beforeend',
        `<option value="${prof.p_id}">${prof.p_name}</option>`);
    }
}

function checkNextStepConditions( btnID ) {
    switch( btnID ){
        case 'sn-1': {
            const id = Number(document.getElementById('professors-identifier').value);
            if( id > 0 ) {
                return true;
            } else {
                showStatusSnackbar('Спочатку виберіть професора із списку', true);
                return false;
            }
        }
        case 'sn-2': {
            console.log('Click on "sn-2" button');
            return true;
        }
        case 'sn-3': {
            console.log('Click on "sn-3" button');
            return true;
        }
        default: 
            return false;
    }
}

function sendFilesToProcess() {
    document.getElementById('loader').classList.remove('spinner-disabled');
    window.ipc.send('main-window:process-files', [...fileList]);
}

function processStepperTabOpen( tabID ) {
    switch( tabID ){
        case 1: {
            window.ipc.send('main-window:open-file-picker');
            break;
        }
        case 2: {
            sendFilesToProcess();
            break;
        }
        default: 
            break;
    }
}

function initStepper() {
    stepper = new Stepper(document.getElementById('bs-stepper'), {
        linear: true,
        animation: true,
        selectors: {
            steps: '.step',
            trigger: '.step-trigger',
            stepper: '.bs-stepper'
          }
    });

    document.getElementById('bs-stepper').addEventListener('show.bs-stepper', (event) => {
        processStepperTabOpen( Number(event.detail.indexStep) );
    });
}

// function stepperNavigate(event) {
//     if( !stepper ) return;
//     const num = Number(event.target.id.match(/\d+$/)[0]);
//     stepper.to( num );
// }

function previousStep(event) {
    if( !stepper ) return;
    stepper.previous();
}

function nextStep(event) {
    if( !stepper ) return;
    if( checkNextStepConditions( event.target.id ) ){
        stepper.next();
    }
}



function showStatusSnackbar( message, isError = false ) {
    Snackbar.show({
        text: message,
        textColor: (isError) ? 'rgb(255, 123, 123)' : '#ffffff',
        pos: 'bottom-right',
        showAction: false,
        backgroundColor: 'rgba(0,0,0,0.7)',
        duration: 3500
    });
}

function processFileList() {
    fileList = [...new Set(fileList)];
    const listHTML = document.getElementById('file-list');
    listHTML.innerHTML = '';
    for(let indx = 0; indx < fileList.length; indx++){
        listHTML.insertAdjacentHTML(
            'beforeend',
            `<li id="file-${indx}" class="list-group-item d-flex justify-content-between align-items-center">
                ${fileList[indx]}
                <button id="btn-file-${indx}" type="button" class="btn btn-danger bi bi-trash" onclick="deleteFileFromList(${indx})"></button>
            </li>`
        );
    }
}

function deleteFileFromList( id ) {
    fileList.splice(id, 1);

    processFileList();
}

// IPC

window.ipc.send('main-window:init-regulation');

window.ipc.on('main-window:on-regulation-init', (args) => {
    db = JSON.parse(JSON.stringify(args));
    initProfessorList(db.professor);
});

window.ipc.on('main-window:file-picker-results', (args) => {
    if( args && args.length ){
        fileList.push(...args);
        processFileList();
    }
});

window.ipc.on('main-window:process-files-results', (args) => {
    document.getElementById('loader').classList.add('spinner-disabled');
    console.log('RESULTS: ', args);
});