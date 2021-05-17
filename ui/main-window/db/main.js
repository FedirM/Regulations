
let state = {
    navTab: 'professors-tab' // current nav tab id
};

let db = null;


function init() {
    
    document.getElementById('back-btn').addEventListener('click', (event) => {
        window.ipc.send('main-window:open-home');
    });

    for(let el of document.getElementsByClassName('nav-link')){
        el.addEventListener('click', navTabClick);
    }

    window.ipc.send('main-window:init-db');
}

function navTabClick(event) {
    state.navTab = event.target.id;
    console.log(state.navTab);
}

function initDegreeTable() {
    const tbody = document.getElementById('degree-table-body');

    for(let d of db.degree) {
        tbody.insertAdjacentHTML('beforeend',
        `<div class="table-row">
            <div id="sub-${s.s_id}" class="row">
                <div class="col-1 text-center lh">${s.s_id}</div>
                <div class="col-10 text-left pl-5 lh">${s.s_name}</div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-sub-${s.s_id}" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`);
    }
}

function initSubjectTable() {
    const tbody = document.getElementById('subject-table-body');

    for(let s of db.subject) {
        tbody.insertAdjacentHTML('beforeend',
        `<div class="table-row">
            <div id="sub-${s.s_id}" class="row">
                <div class="col-1 text-center lh">${s.s_id}</div>
                <div class="col-10 text-left pl-5 lh">${s.s_name}</div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-sub-${s.s_id}" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`);
    }
}

function parseDegree( professorDegree = null ) {
    return [{d_id: null,d_name: 'NULL'}, ...db.degree].map((d) => {
        return `<option value="${d.d_id}" ${(d.d_id === professorDegree)?'selected':''}>${d.d_name}</option>`
    }).join('\n');
}

function initProfessorsTable() {
    const tbody = document.getElementById('professor-table-body');

    for(let p of db.professor) {
        tbody.insertAdjacentHTML('beforeend',
        `<div class="table-row">
            <div id="prof-${p.p_id}" class="row">
                <div class="col-1 text-center lh">${p.p_id}</div>
                <div class="col-2 text-center lh pt-1">
                    <input type="email" class="form-control" id="prof-alias-${p.p_id}" value="${p.p_alias}" />
                </div>
                <div class="col-3 text-center lh pt-1">
                    <input type="email" class="form-control" id="prof-name-${p.p_id}" value="${p.p_name}" />
                </div>
                <div class="col-2 text-center lh">
                    <select class="selectpicker" data-live-search="true">
                        ${ parseDegree(p.d_id) }
                    </select>
                </div>
                <div class="col-3 text-center pt-1">
                    <button id="btn-prof-sub-${p.p_id}" class="btn btn-outline-primary px-5">Переглянути</button>
                </div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-prof-${p.p_id}" class="btn btn-outline-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`);
    }

    $('.selectpicker').selectpicker('refresh');
}



// IPC

window.ipc.on('main-window:on-db-init', (args) => {
    db = args;
    initProfessorsTable();
    initSubjectTable();
});