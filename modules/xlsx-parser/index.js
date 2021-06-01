

function searchGroupRow( matrix ) {
    for(let id = 0; id < matrix.length; id++){
        if( matrix[id].filter(el => !!el).join('').match(/^([А-ЯҐЄІЇ][А-ЯҐЄІЇ]-\d\d[А-ЯҐЄІЇ]?-\d)+$/gi) ){
            return id;
        }
    }
    return null;
}

function searchSubGroupRow( matrix ) {
    for(let id = 0; id < matrix.length; id++){
        if( matrix[id].filter(el => !!el).join('').match(/^(\d\s{0,}підгрупа)+$/gi) ){
            return id;
        }
    }
    return null;
}

function searchWeekInfo( matrix ) {
    const weekPatterns = ['понеділок', 'вівторок', 'середа', 'четверг', 'п.?ятниця', 'субота', 'неділя'];
    const weekRegxp = weekPatterns.map(str => { return new RegExp(str, 'gi') });

    let isDayFound = false;
    let isLectureFound = false;
    let isWeekTypeFound = false;

    let res = {
        weekDayColumn: null,
        lectureIndexColumn: null,
        weekTypeCoulumn: null // Числ. Знам. в расписании
    };
    
    for(let row of matrix){
        for(let cid = 0; cid < row.length; cid++){
            if( !row[cid] ) continue;
            if( !isDayFound ) {
                for(let re of weekRegxp) {
                    if( String(row[cid]).match(re) ){
                        res.weekDayColumn = cid;
                        isDayFound = true;
                    }
                }
            }
            if( isDayFound && !isLectureFound ){
                if( Number.isInteger(row[cid]) ){
                    res.lectureIndexColumn = cid;
                    isLectureFound = true;
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
    return null;
}

function chomp( str ) {
    return str.replace(/^[\s,;:|\/]+/g, '').replace(/[\s,;:|\/]+$/g, '');
}


module.exports = function ( matrix, professor ) {

    const state = {
        isGoupDetected: false,
        isSubGroupDetected: false,
        isScheduleDayDetected: false,
        isScheduleLectureDetected: false,
        isScheduleWeekTypeDetected: false
    };
    
    const position = {
        group: null,
        subGroup: null,
        week: null
    };
    //week[0-6]   - 0: Monday ... 6: Sunday
    //    .start  - start row into matrix
    //    .end    - last row of the day into matrix

    position.group = searchGroupRow(matrix);
    position.subGroup = searchSubGroupRow(matrix);
    position.week = searchWeekInfo(matrix);

    let startRow = 0, startColumn = 0;

    if(position.group) {
        state.isGoupDetected = true;
        startRow = position.group + 1;
    }
    if(position.subGroup) {
        state.isSubGroupDetected = true;
        startRow = position.subGroup + 1;
    }
    if(position.week.weekDayColumn) {
        state.isScheduleDayDetected = true;
        startColumn = position.week.weekDayColumn + 1;
    }
    if(position.week.lectureIndexColumn && position.week.lectureIndexColumn >= startColumn){
        state.isScheduleLectureDetected = true;
        startColumn = position.week.lectureIndexColumn + 1;
    }
    if(position.week.weekTypeCoulumn && position.week.weekTypeCoulumn >= startColumn){
        state.isScheduleWeekTypeDetected = true;
        startColumn = position.week.weekTypeCoulumn + 1;
    }

    console.log('POS INFO: ', JSON.stringify(position, '\n', 2));
    console.log(`Start row: ${startRow}\nStart column: ${startColumn}`);

    let pattern = `(${professor.p_alias.replace(/\s+/g, '\\s{0,}').replace(/\./g, '\\.?')})|(${professor.p_name.replace(/\s+/g, '\\s{0,}')})`;
    const pRE = new RegExp(pattern, 'i');

    let results = [];

    for(let i = startRow; i < matrix.length; i++){
        for(let j = startColumn; j < matrix[i].length; j++){
            if( matrix[i][j] && matrix[i][j].match(pRE) ){
                results.push({
                    weekDay: (state.isScheduleDayDetected) ? matrix[i][position.week.weekDayColumn] : null,
                    lectureIndex: (state.isScheduleLectureDetected) ? matrix[i][position.week.lectureIndexColumn] : null,
                    weekType: (state.isScheduleWeekTypeDetected) ? chomp(matrix[i][position.week.weekTypeCoulumn]) : null,
                    group: (state.isGoupDetected) ? chomp(matrix[position.group][j]) : null,
                    subGroup: (state.isSubGroupDetected) ? chomp(matrix[position.subGroup][j]) : null,
                    subject: chomp(matrix[i][j].replace(pRE, '').replace(/\d+\/\d+/, '').replace(/(\(\s{0,}лк\s{0,}\.?\s{0,}\))|(\(\s{0,}лб\s{0,}\.?\s{0,}\))|(\(\s{0,}пр\s{0,}\.?\s{0,}\))/i, '')),
                    lectureHall: ( matrix[i][j].match(/\d+\/\d+/) ) ? matrix[i][j].match(/\d+\/\d+/)[0] : null,
                    lectureType: ( matrix[i][j].match(/(\(\s{0,}лк\s{0,}\.?\s{0,}\))|(\(\s{0,}лб\s{0,}\.?\s{0,}\))|(\(\s{0,}пр\s{0,}\.?\s{0,}\))/i) ) ? matrix[i][j].match(/(\(\s{0,}лк\s{0,}\.?\s{0,}\))|(\(\s{0,}лб\s{0,}\.?\s{0,}\))|(\(\s{0,}пр\s{0,}\.?\s{0,}\))/i)[0] : null,
                });
            }
        }
    }

    return JSON.parse(JSON.stringify(results));
}