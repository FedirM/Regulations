
let state = {
    navTab: 'professors-tab' // current nav tab id
};


function init() {
    
    document.getElementById('back-btn').addEventListener('click', (event) => {
        window.ipc.send('main-window:open-home');
    });

    for(let el of document.getElementsByClassName('nav-link')){
        el.addEventListener('click', navTabClick);
    }
}

function navTabClick(event) {
    state.navTab = event.target.id;
    console.log(state.navTab);
}