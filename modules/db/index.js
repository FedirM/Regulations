
const fs = require('fs');


let data = require('./data.json');

function getData() {
    return JSON.parse(JSON.stringify(data));
}

function setData( tmp ) {
    fs.writeFileSync('./data_old.json', JSON.stringify(data, '\n', 2));
    fs.writeFileSync('./data.json', JSON.stringify(tmp, '\n', 2));
    data = JSON.stringify(JSON.parse(tmp));
}


module.exports = {
    getData,
    setData
}