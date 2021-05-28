
const fs    = require('fs');
const path  = require('path');

const convertor = require('../xlsx-convertor/.');

(async function main(){
    
    const filePath = path.join(__dirname, '/data/test-01.xlsx');
    
    convertor( filePath ).then((obj) => {
        fs.writeFileSync(path.join(__dirname, '/data/out-test.txt'), JSON.stringify(obj, '\n',1));
        process.exit(0);
    }).catch((e) => {
        console.log(e.message);
        process.exit(1);
    })
})();