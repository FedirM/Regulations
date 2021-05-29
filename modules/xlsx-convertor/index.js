
const path      = require('path');
const convertor = require('./convertor');

/**
 * 
 * @param {Array<String>} fileList  - bunch of .xlsx schedule to process
 * @returns {Promise<Array<Object>>} - array of objects of convertor results
 */

module.exports = function( fileList ) {
    return new Promise((resolve, reject) => {
        let promiseList = [];
        fileList.forEach(file => {
            promiseList.push( new Promise((rslv, rjct) => {
                convertor( file ).then((answ) => {
                    rslv({
                        filePath: file,
                        fileName: path.basename(file),
                        data: answ
                    });
                }).catch((err) => rjct(err));
            }));
        });

        Promise.all(promiseList).then(res => {
            resolve(res);
        }).catch(err => reject(err));
    });
}