
const fs = require('fs');

function searchGroupRow( matrix ) {
    for(let id = 0; id < matrix.length; id++){
        if( matrix[id].filter(el => !!el).join('').match(/^([А-ЯҐЄІЇ][А-ЯҐЄІЇ]-\d\d[А-ЯҐЄІЇ]?-\d)+$/gi) ){
            return id;
        }
    }
}

function searchSubGroupRow( matrix ) {
    for(let id = 0; id < matrix.length; id++){
        if( matrix[id].filter(el => !!el).join('').match(/^(\d\s{0,}підгрупа)+$/gi) ){
            return id;
        }
    }
}

function searchWeekInfo( matrix ) {
    const weekPatterns = ['понеділок', 'вівторок', 'середа', 'четверг', 'п.?ятниця', 'субота', 'неділя'];
    const weekRegxp = weekPatterns.map(str => { return new RegExp(str, 'gi') });

    let isDayFound = false;
    let isLectionFound = false;
    let isWeekTypeFound = false;

    let res = {
        weedDayColumn: null,
        lectionIndexColumn: null,
        weekTypeCoulumn: null // Числ. Знам. в расписании
    };
    
    for(let row of matrix){
        for(let cid = 0; cid < row.length; cid++){
            if( !row[cid] ) continue;
            if( !isDayFound ) {
                for(let re of weekRegxp) {
                    if( String(row[cid]).match(re) ){
                        res.weedDayColumn = cid;
                        isDayFound = true;
                    }
                }
            }
            if( isDayFound && !isLectionFound ){
                if( Number.isInteger(row[cid]) ){
                    res.lectionIndexColumn = cid;
                    isLectionFound = true;
                }
            }
            if( isDayFound && !isWeekTypeFound ){
                if( String(row[cid]).match(/^\s{0,}чис\.?\s{0,}|\s{0,}знам\.?\s{0,}$/i) ){
                    res.weekTypeCoulumn = cid;
                    isWeekTypeFound = true;
                }
            }
            if( isDayFound && ((cid + 1) === row.length) ){
                return {...res};
            }
        }
    }
}



module.exports = function ( matrix ) {

    const state = {
        isGoupDetected: false,
        isSubGroupDetected: false,
        isScheduleInfoDetected: false
    };
    
    const position = {
        group: null,
        subGroup: null,
        week: []
    };
    //week[0-6]   - 0: Monday ... 6: Sunday
    //    .start  - start row into matrix
    //    .end    - last row of the day into matrix

    console.log('GROUP ID: ', searchGroupRow(matrix));
    console.log('SUBGROUP ID: ', searchSubGroupRow(matrix));
    console.log('Week info: ', JSON.stringify(searchWeekInfo(matrix)));
}