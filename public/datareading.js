
const fs = require('fs');
let rawdata =  fs.readFileSync('./data.json', (err, data) => {
    if (err) {
        console.log(err);
    }
});
console.log(rawdata);
let colorList = JSON.parse(rawdata);
console.log(colorList);
console.log(colorList[100]);
console.log(colorList[100].hexcode);