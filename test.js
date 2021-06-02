
const fs = require('fs');

const docx = require('./modules/docx-creator/.');

const rData = [
    {
        weekDay: "Понеділок",
        lectureIndex: 2,
        weekType: "Чис.",
        group: "ПА-16-2",
        subGroup: "1 підгрупа",
        subject: "Мат.та комп.мод.  до 25.11",
        lectureHall: "3/47",
        lectureType: "(лб.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 2,
        weekType: "Знам.",
        group: "ПА-16-2",
        subGroup: "1 підгрупа",
        subject: "Мат.та комп.мод.  до 25.11",
        lectureHall: "3/47",
        lectureType: "(лб.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 3,
        weekType: "Чис.",
        group: "ПА-16-2",
        subGroup: "1 підгрупа",
        subject: "Математичне та компютерне моделювання",
        lectureHall: "3/30",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 3,
        weekType: "Чис.",
        group: "ПА-16-2",
        subGroup: "2 підгрупа",
        subject: "Математичне та компютерне моделювання",
        lectureHall: "3/30",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 3,
        weekType: "Знам.",
        group: "ПА-16-2",
        subGroup: "1 підгрупа",
        subject: "Математичне та компютерне моделювання",
        lectureHall: "3/30",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 3,
        weekType: "Знам.",
        group: "ПА-16-2",
        subGroup: "2 підгрупа",
        subject: "Математичне та компютерне моделювання",
        lectureHall: "3/30",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 4,
        weekType: "Чис.",
        group: "ПА-18у-1",
        subGroup: "1 підгрупа",
        subject: "Компьютерне моделювання систем та процесів",
        lectureHall: "3/46",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 4,
        weekType: "Чис.",
        group: "ПА-18у-1",
        subGroup: "2 підгрупа",
        subject: "Компьютерне моделювання систем та процесів",
        lectureHall: "3/46",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 4,
        weekType: "Знам.",
        group: "ПА-18у-1",
        subGroup: "1 підгрупа",
        subject: "Компьютерне моделювання систем та процесів",
        lectureHall: "3/46",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Понеділок",
        lectureIndex: 4,
        weekType: "Знам.",
        group: "ПА-18у-1",
        subGroup: "2 підгрупа",
        subject: "Компьютерне моделювання систем та процесів",
        lectureHall: "3/46",
        lectureType: "(лк.)"
    },
    {
        weekDay: "Вівторок",
        lectureIndex: 2,
        weekType: "Чис.",
        group: "ПА-18у-1",
        subGroup: "1 підгрупа",
        subject: "Компьютерне моделювання систем та процесів  до 12.11",
        lectureHall: "3/61",
        lectureType: "(пр.)"
    },
    {
        weekDay: "Вівторок",
        lectureIndex: 2,
        weekType: "Чис.",
        group: "ПА-18у-1",
        subGroup: "2 підгрупа",
        subject: "Компьютерне моделювання систем та процесів  до 12.11",
        lectureHall: "3/61",
        lectureType: "(пр.)"
    },
    {
        weekDay: "Вівторок",
        lectureIndex: 2,
        weekType: "Знам.",
        group: "ПА-18у-1",
        subGroup: "1 підгрупа",
        subject: "Компьютерне моделювання систем та процесів  до 12.11",
        lectureHall: "3/61",
        lectureType: "(пр.)"
    },
    {
        weekDay: "Вівторок",
        lectureIndex: 2,
        weekType: "Знам.",
        group: "ПА-18у-1",
        subGroup: "2 підгрупа",
        subject: "Компьютерне моделювання систем та процесів  до 12.11",
        lectureHall: "3/61",
        lectureType: "(пр.)"
    },
    {
        weekDay: "Вівторок",
        lectureIndex: 2,
        weekType: "Знам.",
        group: "ПА-18у-2",
        subGroup: "2 підгрупа",
        subject: "Компьютерне моделювання систем та процесів  до 12.11",
        lectureHall: "3/62",
        lectureType: "(пр.)"
    }
];

const professor = {
    p_id: 6,
    p_name: "Зайцева Тетяна Анатоліївна",
    p_alias: "Зайцева Т. А.",
    d_id: null
  };

const filePath = 'C:\\Univer_5\\_Diplom\\Regulations\\test.docx';



function main() {
    docx( professor, rData ).then((data) => {
        fs.writeFileSync(filePath, data);
        process.exit(0);
    }).catch((err) => {
        console.log( err.message );
        process.exit(1);
    });
}

main();