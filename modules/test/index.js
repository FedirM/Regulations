
const path  = require('path');

const convertor = require('../xlsx-convertor/.');

(async function main(){

    const filePath = path.join(__dirname, '/data/test.xlsx');
    
    convertor( filePath ).then((obj) => {
        console.log(JSON.stringify(obj, '\n',2));
        process.exit(0);
    }).catch((e) => {
        console.log(e.message);
        process.exit(1);
    })
})();