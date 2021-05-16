
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

    initProffesorsTable();
}

function navTabClick(event) {
    state.navTab = event.target.id;
    console.log(state.navTab);
}

function initProffesorsTable() {
    const tbody = document.getElementById('proffesor-table-body');

    for(let i = 2; i < 30; i++){
        tbody.insertAdjacentHTML('beforeend', `<tr>
        <td>${i}</td>
        <td>Книш Л. І.</td>
        <td>Книш Людмила Іванівна</td>
        <td>
            <select class="selectpicker" data-live-search="true">
                <option>N/A</option>
                <option>Mustard</option>
                <option>Ketchup</option>
                <option>Книш Людмила Іванівна</option>
            </select>
        </td>
        <td>5</td>
    </tr>`);
    }
}