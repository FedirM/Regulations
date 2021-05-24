
var stepper = null;

document.addEventListener('DOMContentLoaded', initStepper);

document.getElementById('back-btn').addEventListener('click', (event) => {
    window.ipc.send('main-window:open-home');
});

Array.from(document.getElementsByClassName('step-trigger')).forEach(btn => {
    btn.addEventListener('click', stepperNavigate);
});


function initStepper() {
    var stepper = new Stepper(document.getElementById('bs-stepper'), {
        linear: false,
        animation: true,
        selectors: {
            steps: '.step',
            trigger: '.step-trigger',
            stepper: '.bs-stepper'
          }
    });
}

function stepperNavigate(event) {
    if( !stepper ) return;
    const num = Number(event.target.id.match(/\d+$/)[0]);
    stepper.to( num );
    console.log('Switch to ', num);
}