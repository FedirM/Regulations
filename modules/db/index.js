
const fs = require('fs');


let data            = require('./data.json');
let schedule_info   = require('./schedule.json');

function getData() {
    return JSON.parse(JSON.stringify(data));
}

function setData( tmp ) {
    try {
        fs.writeFileSync('./data_old.json', JSON.stringify(data, '\n', 2));
        fs.writeFileSync('./data.json', JSON.stringify(tmp, '\n', 2));
        data = JSON.stringify(JSON.parse(tmp));
        return true;
    } catch(e) {
        throw e.message;
    }
}

function getProfessor( id ) {
    if( !id ) return {};
    return JSON.parse(JSON.stringify(data.professor.find(el => { return el.p_id === id })));
}


// Schedule

function getScheduleInfo() {
    return JSON.parse(JSON.stringify(schedule_info));
}


module.exports = {
    getData,
    setData,
    getProfessor,
    getScheduleInfo
}