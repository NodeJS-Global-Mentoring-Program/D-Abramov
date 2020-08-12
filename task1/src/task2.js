import csv from 'csvtojson';
import fs from 'fs';

const csvReader = csv({
    delimiter: ';'
});
const readStream = fs.createReadStream('./csv/file.csv');
// запись в новый файл
const writeStream = fs.createWriteStream(`./output/file-${Date.now()}.txt`, {
    encoding: 'utf8',
});

readStream.pipe(csvReader.on('data', (data) => {
    // чтение строка за сторой (визуальное представление)
    console.log(data.toString());
})).on('error', (e) => {
    // логирование ошибок на чтение
    console.log(e);
}).pipe(writeStream).on('error', (e) => {
    // логирование ошибок на запись
    console.log(e);
});