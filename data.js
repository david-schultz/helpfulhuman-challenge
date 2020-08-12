// file system
const fs = require('fs');

let rawdata = fs.readFileSync('./app.json', (err, data) => {
            if (err) {
                console.log(err);
            }
        });
let colorList = JSON.parse(rawdata);