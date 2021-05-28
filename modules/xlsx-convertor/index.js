
const ExcelJS = require('exceljs');

function getWorksheetMatrix( worksheet ){
    return new Promise((resolve, reject) => {
        let promiseList = [];
        worksheet.eachRow({ includeEmpty: true }, (row, id) => {
            promiseList.push(
                new Promise((rslv, rjct) => {
                    rslv(JSON.stringify(row.values))
                })
            );
        });

        Promise.all(promiseList).then((res) => {
            let matrix = [];
            for(let str of res){
                matrix.push( JSON.parse(str) );
            }
            resolve( matrix );
        }).catch(err => {
            reject( err );
        });
    });
}

function matrixAlign( matrix ) {
    let maxLength = 0;
    for(let arr of matrix) {
        if( maxLength < arr.length ) maxLength = arr.length
    }

    for(let id = 0; id < matrix.length; id++) {
        let dif = maxLength - matrix[id].length;
        if( dif > 0 ){
            matrix[id].push( ...Array(dif).fill(null) );
        }
    }
    return matrix;
}


/**
 * 
 * @param {String} filePath - absolute path to *.xlsx file to convert
 * @returns - Promise<Array<Object>>: array of objects of matrix 2x2 of all defined cells
 */
module.exports = function (filePath) {
    return new Promise(async(resolve, reject) => {
        const wb = new ExcelJS.Workbook();
        let promiseList = [];

        wb.xlsx.readFile( filePath ).then( workbook => {
            workbook.eachSheet((ws, wsID) => {
                promiseList.push( new Promise((rslv, rjct) => {
                    rslv({id: wsID, name: ws.name});
                }));
            });
            
            Promise.all(promiseList).then(async(value) => {
                let result = [];
                let maximum = value.length;
                for(let indx = 1; indx <= maximum; indx++) {
                    const ws = value.find((el) => { return el.id === indx });
                    if( !ws ) {
                        maximum++;
                        continue;
                    }
                    const matrix = await getWorksheetMatrix(workbook.getWorksheet(ws.name));
                    result.push({
                        id: ws.id,
                        name: ws.name,
                        matrix: matrixAlign(matrix) 
                    });
                }

                resolve(JSON.parse(JSON.stringify(result)));
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    });
}