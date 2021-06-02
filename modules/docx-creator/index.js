
const {
    Packer,
    Document,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    VerticalAlign,
    WidthType
} = require('docx');

const fs = require('fs'); // test

const db            = require('../db/.');
const scheduleInfo  = db.getScheduleInfo();

module.exports = function( professor, rData ) {

    const weekPatterns = ['понеділок', 'вівторок', 'середа', 'четверг', 'п\s{0,}.?\s{0,}ятниця', 'субота'];
    const weekRegxp = weekPatterns.map(str => { return new RegExp(str, 'i') });

    let table = { rows: [
        new TableRow({
            children: [
                new TableCell({
                    rowSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Викладач (ПІБ) та його посада',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 18,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'ДНІ ТИЖНЯ',
                                    bold: true
                                })
                            ]
                        })
                    ]
                })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Понеділок',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Вівторок',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Середа',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Четверг',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'П’ятниця',
                                    bold: true
                                })
                            ]
                        })
                    ]
                }),
                new TableCell({
                    columnSpan: 3,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Субота',
                                    bold: true
                                })
                            ]
                        })
                    ]
                })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Час' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Вид роботи' }) ] 
                }),
                new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                   children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: 'Місце роботи' }) ] 
                })
            ]
        })
    ]};

    for(let tIndx = 0; tIndx < scheduleInfo.lectures.length; tIndx++){

        let timeTMP = rData.filter((el) => { return ((el.lectureIndex - 1) === tIndx) });

        for(let wType = 0; wType < 2; wType++){

            let re = null;
            let childrenCells = [];

            if( wType === 0 ) re = new RegExp(/Ч/ig);
            if( wType === 1 ) re = new RegExp(/З/ig);

            timeTMP = timeTMP.filter((el) => { return (el.weekType.match(re)) });
            //fs.appendFileSync('./out.txt', '\n\n' + JSON.stringify(timeTMP, '\n', 1));

            for(let wIndx = 0; wIndx < weekRegxp.length; wIndx++) {
                let weekTMP = timeTMP.filter((el) => { return (el.weekDay && el.weekDay.match(weekRegxp[wIndx])) });
                
                if( weekTMP.length ) {
                    childrenCells.push(
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({
                               alignment: AlignmentType.CENTER,
                               text: `${scheduleInfo.lectures[tIndx]}
                               ${(wType === 0) ? 'Чис.' : 'Знам.'}`
                            })]
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({
                                alignment: AlignmentType.CENTER,
                                text: `${weekTMP[0].subject} ${weekTMP[0].lectureType}
                                ${ [...new Set(weekTMP.map((el) => { return el.group }))].join(', ') }`
                            })] 
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({
                                alignment: AlignmentType.CENTER,
                                text: `${ Array.from(new Set(weekTMP.map((el) => { return el.lectureHall }))).join(', ') }`
                            })] 
                        })
                    );
                } else {
                    childrenCells.push(
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({
                               alignment: AlignmentType.CENTER,
                               text: `${scheduleInfo.lectures[tIndx]}
                               ${(wType === 0) ? 'Чис.' : 'Знам.'}`
                            })]
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: '' }) ] 
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [ new Paragraph({ alignment: AlignmentType.CENTER, text: '' }) ] 
                        })
                    );
                }
            }
            if(tIndx === 0 && wType === 0) {
                childrenCells.unshift( new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    rowSpan: 36,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: `${professor.p_name},
                                    ${ (professor.d_id) ? db.getData().degree[professor.d_id] : '(БЕЗ ПОСАДИ)'}`
                                })
                            ]
                        })
                    ]
                }));
            }
            table.rows.push( new TableRow({ children: [...childrenCells]}));
        }
    }

    const doc = new Document({
        sections: [
            {
                children: [
                    new Table({
                        rows: table.rows,
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        }
                    })
                ]
            }
        ],
        creator: 'FedirM',
        description: 'Powered by "Regulation" utility created by Fedir M.',
        title: 'Regulation'
    });

    return Packer.toBuffer( doc );
}