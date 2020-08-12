const fs = require('fs');
        let rawdata = fs.readFileSync('./app.json', (err, data) => {
            if (err) {
                console.log(err);
            }
        });
        colorList = JSON.parse(rawdata);