
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

function onIpcInit() {
    initProfessorsTable();
    initSubjectTable();
    initDegreeTable();
}

function showSnackbar( message, isError = false ) {
    Snackbar.show({
        text: message,
        textColor: (isError) ? 'rgb(255, 123, 123)' : '#ffffff',
        pos: 'bottom-right',
        showAction: false,
        backgroundColor: 'rgba(0,0,0,0.7)',
        duration: 3500
    });
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
            <div id="sub-${d.d_id}" class="row">
                <div class="col-1 text-center lh">${d.d_id}</div>
                <div class="col-5 text-left pl-5 lh">
                    <input type="email" class="form-control" id="degree-name-${d.d_id}" value="${d.d_name}" />
                </div>
                <div class="col-5 text-left pl-5 lh">
                    <input type="email" class="form-control" id="degree-alias-${d.d_id}" value="${d.d_alias}" />
                </div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-degree-${d.d_id}" class="btn btn-outline-danger bi bi-trash"></button>
                </div>
            </div>
        </div>`);
        document.getElementById(`degree-name-${d.d_id}`).addEventListener('input', onDegreeNameChange);
        document.getElementById(`degree-alias-${d.d_id}`).addEventListener('input', onDegreeAliasChange);
        document.getElementById(`btn-delete-degree-${d.d_id}`).addEventListener('click', onDegreeDelete);
    }
}

function initSubjectTable() {
    const tbody = document.getElementById('subject-table-body');

    for(let s of db.subject) {
        tbody.insertAdjacentHTML('beforeend',
        `<div class="table-row">
            <div id="sub-${s.s_id}" class="row">
                <div class="col-1 text-center lh">${s.s_id}</div>
                <div class="col-10 text-left pl-5 lh">
                    <input type="email" class="form-control" id="sub-name-${s.s_id}" value="${s.s_name}" />
                </div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-sub-${s.s_id}" class="btn btn-outline-danger bi bi-trash"></button>
                </div>
            </div>
        </div>`);
        document.getElementById(`sub-name-${s.s_id}`).addEventListener('input', onSubNameChange);
        document.getElementById(`btn-delete-sub-${s.s_id}`).addEventListener('click', onSubDelete);
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
                    <select id="prof-degree-${p.p_id}" class="selectpicker" data-live-search="true">
                        ${ parseDegree(p.d_id) }
                    </select>
                </div>
                <div class="col-3 text-center pt-1">
                    <button id="btn-prof-sub-${p.p_id}" class="btn btn-outline-primary px-5">Переглянути</button>
                </div>
                <div class="col-1 text-center pt-1">
                    <button id="btn-delete-prof-${p.p_id}" class="btn btn-outline-danger bi bi-trash"></button>
                </div>
            </div>
        </div>`);
        document.getElementById(`prof-name-${p.p_id}`).addEventListener('input', onProfNameChange);
        document.getElementById(`prof-alias-${p.p_id}`).addEventListener('input', onProfAliasChange);
        document.getElementById(`prof-degree-${p.p_id}`).addEventListener('change', onProfDegreeChange);
        document.getElementById(`btn-delete-prof-${p.p_id}`).addEventListener('click', onProfDelete);
    }

    $('.selectpicker').selectpicker('refresh');
}

// Change listeners
function onProfNameChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.professor.findIndex(e => e.p_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.professor[idx].p_name = event.target.value;
}
function onProfAliasChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.professor.findIndex(e => e.p_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.professor[idx].p_alias = event.target.value;
}
function onProfDegreeChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.professor.findIndex(e => e.p_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.professor[idx].d_id = Number(event.target.value);
}

function onSubNameChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.subject.findIndex(e => e.s_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.subject[idx].s_name = event.target.value;
}

function onDegreeNameChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.degree.findIndex(e => e.d_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.degree[idx].d_name = event.target.value;
}
function onDegreeAliasChange(event) {
    const id = Number(event.target.id.match(/\d+/)[0]);
    const idx = db.degree.findIndex(e => e.d_id === id);
    let tmp = JSON.parse(JSON.stringify(db));
    tmp.degree[idx].d_alias = event.target.value;
}

function onProfDelete(event) {
    console.log('Delete id: ', event.target.id);
}

function onSubDelete(event) {
    console.log('Delete id: ', event.target.id);
}

function onDegreeDelete(event) {
    console.log('Delete id: ', event.target.id);
}

// IPC

window.ipc.on('main-window:on-db-init', (args) => {
    db = args;
    onIpcInit();
});