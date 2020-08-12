/*
 * Document Variables
 *
 */
// file system
//const fs = require('fs');
const sideBar = document.querySelector("#sidebarCell");
const mainContainer = document.querySelector("#mainContainer");
let colorList = new Array(); //hashmap?
const cardList = new Array(); //hashmap?
let initialized = false;
const itemsPerPage = 12;
let curPage = -1;

/*
 * Initialization
 *      // Ideally I wanted to do this in a function,
 *      // but ran into declaration issues w/ the grid/detailContainer.
 */


initialized = true;
//function initialize() {
let elementCount = 100;
populateColorList("database", elementCount);
populateCardList(colorList);
const gridContainer = new GridContainer();
const detailContainer = new DetailContainer();
const categoryContainer = new CategoryContainer();

mainContainer.appendChild(gridContainer.container);
mainContainer.appendChild(detailContainer.container);
mainContainer.appendChild(categoryContainer.container);

// load page
gridContainer.load(1);

/*
 * Data Population
 *
 */

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
        /*
        const fs = require('fs');
        let rawdata = fs.readFileSync('./data.json', (err, data) => {
            if (err) {
                console.log(err);
            }
        });
        */
       let xmlhttp = new XMLHttpRequest();
       let url = "https://api.jsonbin.io/b/5f337ca11823333f8f2227f8/4";
       xmlhttp.onreadystatechange = function () {
           if(this.readyState == 4 && this.status == 200) {
               let parsedJSON = JSON.parse(this.responseText);
               for(let i = 0; i< parsedJSON.length; i++) {
                   colorList[i] = parsedJSON[i];
               }
           }
       };
       xmlhttp.open("GET", url, false);
       xmlhttp.setRequestHeader("secret-key", "$2b$10$4Xk3G.7pdYGmKfnyzDEdeuDVMoO5B7jlPmH16vXCy8LR2PBxPkr9u");
       xmlhttp.send();
        //colorList = JSON.parse(data);
        //console.log(colorList);
        //console.log(colorList[0]);
    }
}

// Populates cardList from a an array of colors (source)
function populateCardList(source) {
    for (let i = 0; i < source.length; i++) {
        cardList[i] = newCard(source[i]);
    }
}

function getItemCount() { return colorList.length; }
function getPageCount() {
    return Math.ceil(getItemCount() / itemsPerPage);
}

/*
 * Grid-Detail Containers
 *
 */
function GridContainer() {
    const container = document.createElement("div");
    const grid = document.createElement("div");
    const nav = document.createElement("div");

    container.style.display = "none";
    container.className = "inner-container";
    grid.className = "grid-container";
    grid.id = "gridContainer";

    //nav setup
    nav.className = "grid-nav";
    nav.id = "gridNav";
    for (let i = 0; i < getPageCount(); i++) {
        const navLink = document.createElement("a");
        const pageNo = i + 1;
        navLink.className = "page-link";
        navLink.href = "#page" + pageNo + "/";
        navLink.textContent = pageNo;
        navLink.id = navLink.href;
        nav.appendChild(navLink);
    }

    container.appendChild(grid);
    container.appendChild(nav);

    this.container = container;
    this.grid = grid;
    this.nav = nav;
    this.isLoaded = false;
    this.curPage = 1;

    this.load = function (pageNumber) {
        this.unload(this.curPage);
        this.isLoaded = true;
        this.container.style.display = "block";

        nav.children[this.curPage - 1].style.textDecoration = "none";
        nav.children[this.curPage - 1].classList.add("light-font");
        nav.children[this.curPage - 1].classList.remove("bold-font");
        nav.children[pageNumber - 1].style.textDecoration = "underline";
        nav.children[pageNumber - 1].classList.add("bold-font");
        nav.children[pageNumber - 1].classList.remove("light-font");

        detailContainer.unload();

        this.curPage = pageNumber;
        fillPage(pageNumber);

    };

    function fillPage(pageNumber) {
        let index = (pageNumber - 1) * itemsPerPage;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (index >= cardList.length) {
                    return;
                }
                grid.appendChild(cardList[index]);
                index++;
            }
        }
    }

    this.unload = function (pageNumber) {
        if (!this.isLoaded) {
            return;
        }
        this.isLoaded = false;
        this.container.style.display = "none";
        this.grid.innerHTML = '';
    };
}

function DetailContainer() {
    const container = document.createElement("div");
    const detail = document.createElement("div");
    const tintContainer = document.createElement("div");
    const backButton = document.createElement("button");

    container.style.display = "none";
    container.className = "detail-view-container";
    detail.className = "detail-container";
    detail.id = "detailContainer";
    tintContainer.className = "tint-container";
    backButton.className = "button back-button";
    backButton.textContent = "Clear";
    container.appendChild(detail);
    container.appendChild(tintContainer);
    container.appendChild(backButton);

    this.container = container;
    this.detail = detail;
    this.tintContainer = tintContainer;
    this.backButton = backButton;
    this.isLoaded = false;
    this.prevView = "grid";

    this.load = function (color) {
        this.unload();
        this.isLoaded = true;
        this.container.style.display = "block";
        gridContainer.unload();

        const card = newDetailCard(color);
        detail.appendChild(card);
        const tintCards = getTintCards(color.tints);
        for (let i = 0; i < 5; i++) {
            this.tintContainer.appendChild(tintCards[i]);
        }

    };
    this.unload = function () {
        if (!this.isLoaded) {
            return;
        }
        this.isLoaded = false;
        this.container.style.display = "none";
        this.detail.innerHTML = '';
        this.tintContainer.innerHTML = '';
    };
}

function CategoryContainer() {
    const container = document.createElement("div");
    const grid = document.createElement("div");
    const nav = document.createElement("div");
    nav.className = "page-nav";
    nav.id = "categoryNav";

    container.style.display = "none";
    grid.className = "grid-container";
    grid.id = "gridContainer";

    container.appendChild(grid);
    container.appendChild(nav);

    this.container = container;
    this.grid = grid;
    this.nav = nav;
    this.isLoaded = false;
    this.curCategory = 'red';
    this.curArray = getCategoryCards('red');
    this.curPage = 1;

    this.loadCategory = function (category) {
        this.unloadPage();
        this.curCategory = category;
        if (category === "All Colors") {
            this.unload();
            gridContainer.load(1);
            detailContainer.prevView = "grid";
            return;
        }
        const array = getCategoryCards(category);
        this.curArray = array;
        this.isLoaded = true;
        this.container.style.display = "block";
        nav.style.display = "flex";


        if (this.curArray.length == 0) {
            const span = document.createElement("span");
            span.textContent = "Sorry, there is no " + category + " in this color base.";
            span.className = "empty-category-span";
            container.insertBefore(span, nav);
            nav.style.display = "none";
            return;
        }

        const pageCount = Math.ceil(this.curArray.length / itemsPerPage);
        navSetup(pageCount);

        this.curPage = 1;
        this.loadPage(1);

    };

    this.reload = function () {
        this.isLoaded = true;
        this.container.style.display = "block";
    };

    this.unload = function () {
        this.isLoaded = false;
        this.container.style.display = "none";
    };

    this.loadPage = function (pageNumber) {
        this.unloadPage();
        this.isLoaded = true;
        this.container.style.display = "block";

        nav.children[this.curPage - 1].style.textDecoration = "none";
        nav.children[this.curPage - 1].classList.add("light-font");
        nav.children[this.curPage - 1].classList.remove("bold-font");
        nav.children[pageNumber - 1].style.textDecoration = "underline";
        nav.children[pageNumber - 1].classList.add("bold-font");
        nav.children[pageNumber - 1].classList.remove("light-font");

        this.curPage = pageNumber;
        fillPage(pageNumber, this.curArray);
    };

    function fillPage(pageNumber, cards) {
        let index = (pageNumber - 1) * itemsPerPage;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (index >= cards.length) {
                    return;
                }
                grid.appendChild(cards[index]);
                index++;
            }
        }
    }

    this.unloadPage = function () {
        if (!this.isLoaded) {
            return;
        }
        this.isLoaded = false;
        this.container.style.display = "none";

        for (let i = 0; i < this.container.children.length; i++) {
            const span = this.container.children[i];
            if (span.className === "empty-category-span") {
                this.container.removeChild(span);
            }
        }

        this.grid.innerHTML = '';
    };

    function navSetup(pageCount) {
        nav.innerHTML = '';
        for (let i = 0; i < pageCount; i++) {
            const navLink = document.createElement("a");
            const pageNo = i + 1;
            navLink.className = "page-link";
            navLink.href = "#page" + pageNo + "/";
            navLink.textContent = pageNo;
            navLink.id = navLink.href;
            nav.appendChild(navLink);
        }

        if (pageCount === 1) {
            nav.style.display = "none";
        }
    }

    function getCategoryCards(category) {
        const cardArray = new Array();
        let index = 0;

        for (let i = 0; i < colorList.length; i++) {
            const color = colorList[i];
            if (color.category.toLowerCase() === category.toLowerCase()) {
                cardArray[index] = newCard(color);
                index++;
            }
        }
        return cardArray;
    }
}
/*
 * Card Creation
 *
 */

function newCard(color) {
    // Create color card framework
    const card = document.createElement("div");
    card.id = color.hexcode;
    card.className = "grid-cell border border-round";
    card.classList.add(getColorCategory(color.hsl));

    // Create the card's visible swatch
    const cardSwatch = document.createElement("div");
    cardSwatch.className = "card-swatch-list swatch-box";
    cardSwatch.style.backgroundColor = color.hexcode;

    // Create the chip's hexadecimal text
    const cardText = document.createElement("span");
    cardText.textContent = color.hexcode;
    cardText.className = "card-hex-code";

    // Append swatch + text to chip
    card.appendChild(cardSwatch);
    card.appendChild(cardText);

    return card;
}

function newDetailCard(color) {
    // Create color card framework
    const card = document.createElement("div");
    card.id = color.hexcode;
    card.className = "detail-card detail-border border-round";
    //card.classList.add(getColorCategory(color.hsl));

    // Create the card's visible swatch
    const cardSwatch = document.createElement("div");
    cardSwatch.className = "card-swatch-detail swatch-box";
    cardSwatch.style.backgroundColor = color.hexcode;

    // Create the chip's hexadecimal text
    const cardText = document.createElement("span");
    cardText.textContent = color.hexcode;
    cardText.className = "detail-hex-code";

    // Append swatch + text to chip
    card.appendChild(cardSwatch);
    card.appendChild(cardText);

    return card;
}

function getTintCards(tints) {
    const tintCards = new Array();
    for (let i = 0; i < tints.length; i++) {
        const tint = tints[i];
        const card = document.createElement("div");
        card.id = tint;
        card.className = "tint-card border border-round";
        //card.classList.add(getColorCategory(color.hsl));

        // Create the card's visible swatch
        const cardSwatch = document.createElement("div");
        cardSwatch.className = "card-swatch-tint swatch-box";
        cardSwatch.style.backgroundColor = tint;

        // Create the chip's hexadecimal text
        const cardText = document.createElement("span");
        cardText.textContent = tint;
        cardText.className = "card-hex-code";

        // Append swatch + text to chip
        card.appendChild(cardSwatch);
        card.appendChild(cardText);

        tintCards[i] = card;
    }
    return tintCards;
}

/*
 * Swatch Event Handling
 *
 */

gridContainer.container.addEventListener("click", (e) => {
    if (e.target.classList.contains("swatch-box")) {
        console.log('you clicked a swatch!');
        console.log('swatch id: ' + e.target.parentNode.id);
        const color = getColorFromHex(e.target.parentNode.id);
        detailContainer.load(color);
    } else if (e.target.classList.contains("page-link")) {
        const pageNumber = parseInt(e.target.textContent);
        gridContainer.load(pageNumber);
    }
});

detailContainer.container.addEventListener("click", (e) => {
    if (detailContainer.prevView === "category") {
        const card = e.target.parentNode;
        if (card.classList.contains("tint-card")) {
            const tintColor = createColor(card.id);
            detailContainer.load(tintColor);
        } else if (card.classList.contains("detail-card") || e.target.classList.contains("back-button")) {
            categoryContainer.reload();
            detailContainer.unload();
        }
    } else if (e.target.classList.contains("swatch-box")) {
        const card = e.target.parentNode;
        if (card.classList.contains("detail-card")) {
            gridContainer.load(gridContainer.curPage);
        } else if (card.classList.contains("tint-card")) {
            const tintColor = createColor(card.id);
            detailContainer.load(tintColor);
        }
    } else if (e.target.classList.contains("back-button")) {
        gridContainer.load(gridContainer.curPage);
    }
});

categoryContainer.container.addEventListener("click", (e) => {
    if (e.target.classList.contains("swatch-box")) {
        console.log('you clicked a swatch!');
        console.log('swatch id: ' + e.target.parentNode.id);
        const color = getColorFromHex(e.target.parentNode.id);
        categoryContainer.unload();
        detailContainer.prevView = "category";
        detailContainer.load(color);
    } else if (e.target.classList.contains("page-link")) {
        const pageNumber = parseInt(e.target.textContent);
        categoryContainer.loadPage(pageNumber);
    }
});

function getColorFromHex(hexcode) {
    for (let i = 0; i < colorList.length; i++) {
        const color = colorList[i];
        if (color.hexcode == hexcode) {
            return color;
        }
    }
    return -1;
}



const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        let val = e.target.value;
        searchBar.value = "";
        if (val.charAt(0) !== "#") {
            val = "#" + val;
        }
        if (val.length === 7) {
            gridContainer.unload();
            detailContainer.unload();
            categoryContainer.unload();
            for (let i = 0; i < colorList.length; i++) {
                let color = colorList[i];
                if (color.hexcode === val.toLowerCase()) {
                    detailContainer.load(color);
                    return;
                }
            }
        }
        const color = createColor(val);
        colorList[colorList.length] = color;
        cardList[cardList.length] = newCard(color);
        detailContainer.load(color);

    }
});

/*
 * Sidebar Handling
 *
 */
// Load data button
// Random color button
// Category Navigation


//nav setup
const sideNav = document.querySelector("#sidebarNav");
sideNav.addEventListener("click", (e) => {
    const category = e.target.textContent;
    gridContainer.unload();
    detailContainer.unload();
    categoryContainer.loadCategory(category);
});

sideBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("button")) {
        const rand = Math.floor(Math.random() * colorList.length);
        const color = colorList[rand];
        gridContainer.unload();
        detailContainer.unload();
        detailContainer.load(color);
        categoryContainer.unload();
    }
});

/*
 * Color Handling
 *
 */
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
function HSLToRGB(h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

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
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

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
    } else {
        let deviation = Math.floor((100 - value) / 2);
        if (deviation > 5) {
            return Math.floor(deviation / 2);
        }
        return deviation;
    }
}

function lowerDeviation(value) {
    if (value >= 20) {
        return 10;
    } else {
        let deviation = Math.floor(value / 2);
        if (deviation > 5) {
            return Math.floor(deviation / 2);
        }
        return deviation;
    }
}

