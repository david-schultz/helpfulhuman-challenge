

// file system
const fs = require('fs');

// writing files
const colorList = new Array(); //hashmap?
let elementCount = 101;
populateColorList("random", elementCount);
const obj = JSON.stringify(colorList);
console.log(obj);
fs.writeFile('./data.json', obj, () => {
    console.log('file was succesfully writ');
});



// * Populates colorList with Color() objects.
//  - source determines how the list is populated
//      - source = "random" fills w/ random hexcodes
//  - size determines the length of the list
function populateColorList(source, size) {
    if (source.toLowerCase() === "random") {
        for (let i = 0; i < size; i++) {
            colorList[i] = createColor(getRandomHex());
        }
    } else if (source.toLowerCase() === "database") {

    }
    return colorList;
}

// * Returns a random hexcode as a string
function getRandomHex() {
    // eg: #ffffff or #000000
    let code = "#";
    for (let x = 0; x < 6; x++) {
        let rand = Math.floor(Math.random() * 16);
        code = code + convertDigitToHex(rand);
    }
    return code;
}

function createColor(hexcode) {
    const hsl = hexToHSL(hexcode);
    const category = getColorCategory(hsl);
    const tints = getTints(hsl);
    tints.splice(2, 0, hexcode);

    return new Color(hexcode, hsl, category, tints);
}

// * Creates a Color object
function Color(hexcode, hsl, category, tints) {
    this.hexcode = hexcode;
    this.hsl = hsl;
    this.category = category;
    this.tints = tints;


    //this.hsl = hexToHSL(hexcode);
    //this.category = getColorCategory(this.hsl);
    //this.tints = getTints(this.hsl);
    //this.tints.splice(2, 0, hexcode);
}

// * Given an HSL array, returns a color category string.
function getColorCategory(hsl) {
    const hue = hsl[0];
    const sat = hsl[1];
    const lit = hsl[2];

    if (sat < 9) {
        return 'grey';
    }

    if (hue > 15 && hue <= 50) {
        if ((sat < 50 && lit < 50) || lit < 25) {
            return 'brown';
        }
        return 'orange';
    } else if (hue > 50 && hue <= 60) {
        return 'yellow';
    } else if (hue > 60 && hue <= 170) {
        return 'green';
    } else if (hue > 170 && hue <= 250) {
        return 'blue';
    } else if (hue > 250 && hue <= 315) {
        return 'purple';
    }
    if (lit < 15) {
        return 'brown';
    }
    return 'red';
}
/*
 * Color Computing
 *
 */
// * Converts a single digit to hexcode;
function convertDigitToHex(digit) {
    if (digit < 10) {
        return String(digit);
    }
    let unicodeDigit = 87 + digit;
    return String.fromCharCode(unicodeDigit);
}

// * Hex -> HSL
// SOURCE: https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
function hexToHSL(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    const hsl = new Array();
    hsl[0] = h;
    hsl[1] = s;
    hsl[2] = l;
    return hsl;
}

// * HSL -> Hex
//SOURCE: https://css-tricks.com/converting-color-spaces-in-javascript/
function HSLToRGB(h, S, L) {
    // Must be fractions of 1
    let s = S / 100;
    let l = L / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    const rgbArray = new Array();
    rgbArray[0] = Math.round((r + m) * 255);
    rgbArray[1] = Math.round((g + m) * 255);
    rgbArray[2] = Math.round((b + m) * 255);

    return rgbArray;
}
function RGBToHex(R, G, B) {
    let r = R.toString(16);
    let g = G.toString(16);
    let b = B.toString(16);

    if (r.length == 1) {
        r = "0" + r;

    }
    if (g.length == 1) {
        g = "0" + g;

    }
    if (b.length == 1) {
        b = "0" + b;

    }

    return "#" + r + g + b;
}

// * Given an HSL array, returns an array(4) of tints.
//   - tint[0] and [1] will be lower s&l
//   - tint[2] and [3] will be higher s&l
function getTints(HSL) {
    const H = HSL[0];
    const S = HSL[1];
    const L = HSL[2];

    const tints = new Array();
    let x = -2;
    for (let i = 0; i < 4; i++) {
        let s, l;
        if (x < 0) {
            s = S + (x * lowerDeviation(S));
            l = L + (x * lowerDeviation(L));
        } else {
            s = S + (x * upperDeviation(S));
            l = L + (x * upperDeviation(L));
        }
        const tint = HSLToRGB(H, s, l);
        tints[i] = RGBToHex(tint[0], tint[1], tint[2]);
        x++;
        if (x == 0) {
            x++;
        }
    }
    return tints;
}

function upperDeviation(value) {
    if (value <= 80) {
        return 10;
    }
    let deviation = Math.floor((100 - value) / 2);
    if (deviation > 5) {
        return Math.floor(deviation / 2);
    }
    return deviation;
}

function lowerDeviation(value) {
    if (value >= 20) {
        return 10;
    }
    let deviation = Math.floor(value / 2);
    if (deviation > 5) {
        return Math.floor(deviation / 2);
    }
    return deviation;
}