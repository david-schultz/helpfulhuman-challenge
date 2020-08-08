/*
 * Document Variables
 *
 */
    const sideBar = document.querySelector("sidebar-cell");
    const mainContainer = document.querySelector("#mainContainer");
    const colorList = new Array(); //hashmap?
    const cardList = new Array(); //hashmap?
    //const gridContainer = -1;
    //const detailContainer = -1;

/*
 * Basic States
 *
 */
    let initialized = false;
    const itemsPerPage = 12;
    let curPage = -1;


    initialized = true;
    //function initialize() {
        let elementCount = 50;
        populateColorList("random", elementCount);
        populateCardList(colorList);
        const gridContainer = new GridContainer();
        const detailContainer = new DetailContainer();
        
        mainContainer.appendChild(gridContainer.container);
        mainContainer.appendChild(detailContainer.container);
        
        // load page
        gridContainer.load(1);

    function getItemCount() { return colorList.length; }
    function getPageCount() { 
        console.log('itemCount: ' + getItemCount());
        return Math.ceil(getItemCount() / itemsPerPage);
    }

/*
 * Data Population
 *
 */

    // * Populates colorList with Color() objects.
    //  - source determines how the list is populated
    //      - source = "random" fills w/ random hexcodes
    //  - size determines the length of the list
    function populateColorList(source, size) {
        if(source.toLowerCase() === "random") {
            for(let i = 0; i < size; i++) {
                colorList[i] = new Color(getRandomHex());
            }
        } else if (source.toLowerCase() === "database") {
            
        }
        return colorList;
    }

    // Populates cardList from a an array of colors (source)
    function populateCardList(source) {
        for(let i = 0; i < source.length; i++) {
            cardList[i] = newCard(source[i]);
        }
    }
    


/*
    const loadButton = document.querySelector("#loadButton");
    loadButton.addEventListener("click", () => {
       initialize(); 
    });

/*

    function initialize() {
        if(initialized) {
            return;
        }
        initialized = true;
        
        const elementCount = 50;
        populateColorList(elementCount);
        populateCardList(colorList);
        gridContainer = new GridContainer();
        detailContainer = new DetailContainer();
        
        mainContainer.appendChild(gridContainer);
        mainContainer.appendChild(detailContainer);
        
        // load page
        gridContainer.load(1);
    }
*/















    
/*
 * Grid-Detail Containers
 *
 */
    function GridContainer() {
        const container = document.createElement("div");
        const grid = document.createElement("div");
        const nav = document.createElement("div");
       
        container.style.display = "none";
	    grid.className = "grid-container";
  	    grid.id = "gridContainer";
        
        //nav setup
        nav.className = "grid-nav";
        nav.id = "gridNav";
        console.log('creating grid nav');
        console.log(getPageCount());
        for (let i = 0; i < getPageCount(); i++) {
          const navLink = document.createElement("a");
          const pageNo = i + 1;
          navLink.className = "page-link";
          navLink.href = "#page" + pageNo + "/";
          navLink.textContent = pageNo;
          navLink.id = navLink.href;
            console.log(navLink.textContent);
          nav.appendChild(navLink);
        }
        
        container.appendChild(grid);
        container.appendChild(nav);
      
	    this.container = container;
        this.grid = grid;
        this.nav = nav;
        this.isLoaded = false;
        this.curPage = 1;
       
        this.load = function(pageNumber) {
            this.unload(this.curPage);
            this.isLoaded = true;
            this.container.style.display = "block";
            nav.children[this.curPage-1].style.textDecoration = "underline";
            nav.children[this.curPage-1].style.textDecoration = "none";
            nav.children[pageNumber-1].style.textDecoration = "underline";
            
            detailContainer.unload();
            
            this.curPage = pageNumber;
            fillPage(pageNumber);
            
        };
        
        function fillPage(pageNumber) {
            console.log('fillingPage');
            let index = (pageNumber - 1) * itemsPerPage;
            for(let i = 0; i < 3; i++) {
                  for(let j = 0; j < 4; j++) {
                       if(index >= cardList.length) {
                            return;
                       }
                       grid.appendChild(cardList[index]);
                       index++;
                  }
            }
        }
        
        this.unload = function(pageNumber) {
            if(!this.isLoaded) {
                console.log('grid already unloaded');
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
        detail.className = "detail-container";
        detail.id = "detailContainer";
        tintContainer.className = "tint-container";
        backButton.className = "back-button";
        backButton.textContent = "Back";
        container.appendChild(detail);
        container.appendChild(tintContainer);
        container.appendChild(backButton);
        
        this.container = container;
        this.detail = detail;
        this.tintContainer = tintContainer;
        this.backButton = backButton;
        this.isLoaded = false;
        
        this.load = function(color) {
            this.unload();
            this.isLoaded = true;
            this.container.style.display = "block";
            gridContainer.unload();
            
            const card = newDetailCard(color);
            this.detail.appendChild(card);
            container.append(card);
            const tintCards = getTintCards(color.tints);
            for(let i = 0; i < 5; i++) {
                this.tintContainer.appendChild(tintCards[i]);
            }
            
        };
        this.unload = function() {
            if(!this.isLoaded) {
                console.log('detail already unloaded');
                return;
            }
            this.isLoaded = false;
            this.container.style.display = "none";
            this.container.innerHTML = '';
            this.tintContainer.innerHTML = '';
        };
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
        card.className = "detail-card border border-round";
        //card.classList.add(getColorCategory(color.hsl));
        
        // Create the card's visible swatch
        const cardSwatch = document.createElement("div");
        cardSwatch.className = "card-swatch-detail swatch-box";
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

    function getTintCards(tints) {
        const tintCards = new Array();
        for (let i = 0; i < tints.length; i++) {
            const color = tints[i];
            const card = document.createElement("div");
            card.id = color.hexcode;
            card.className = "tint-card border border-round";
            //card.classList.add(getColorCategory(color.hsl));

            // Create the card's visible swatch
            const cardSwatch = document.createElement("div");
            cardSwatch.className = "card-swatch-tint swatch-box";
            cardSwatch.style.backgroundColor = color.hexcode;

            // Create the chip's hexadecimal text
            const cardText = document.createElement("span");
            cardText.textContent = color.hexcode;
            cardText.className = "card-hex-code";

            // Append swatch + text to chip
            card.appendChild(cardSwatch);
            card.appendChild(cardText);

            tintCards[i] = card;
        }
        return tintCards;
    }

/*
 * Grid Event Handling
 *
 */



gridContainer.container.addEventListener("click", (e) => {
    // Swatch Click
        // Pagination Click
    console.log("i detect a CLICC");
    if(e.target.classList.contains("swatch-box")) {
        console.log('you clicked a swatch!');
        const color = getColorFromHex(e.target.parentNode.id);
        detailContainer.load(color);
    } else if (e.target.className === "page-link") {
        const pageNumber = parseInt(e.target.textContent);
        gridContainer.load(pageNumber);
    }
});

detailContainer.container.addEventListener("click", (e) => {
    if(e.target.classList.contains("swatch-box")) {
        const card = e.target.parentNode;
        if(card.classList.contains("detail-card")) {
            gridContainer.load(gridContainer.curPage);
        } else if(card.classList.contains("tint-card")) {
            const tintColor = getColorFromHex(card.id);
            detailContainer.load(tintColor);
        }
    } else if (e.target.className === "back-button") {
        gridContainer.load(gridContainer.curPage);
    }
});

function getColorFromHex(hexcode) {
    for(let i = 0; i < colorList.length; i++) {
        const color = colorList[i];
        if (color.hexcode = hexcode) {
            return color;
        }
    }
    return -1;
}

/*
 * Color Handling
 *
 */
        // * Creates a Color object
        function Color(hexcode) {
            this.hexcode = hexcode;
            this.hsl = hexToHSL(hexcode);
            this.category = getColorCategory(this.hsl);
            this.tints = getTints(this.hsl);
            this.tints.splice(2, 0, hexcode);
        }
        
        // * Returns a random hexcode as a string
        function getRandomHex() {
             // eg: #ffffff or #000000
             let code = "#";
             for (let x = 0; x < 6; x++) {
                  let rand = Math.floor(Math.random()*16);
                  code = code + convertDigitToHex(rand);
             }
             return code;
        }
        
        // * Given an HSL array, returns a color category string.
        function getColorCategory(hsl) {
            const hue = hsl[0];
            const sat = hsl[1];
            const lit = hsl[2];

            if(sat < 15) {
                return 'grey';
            }

            if(hue > 15 && hue <= 50) {
                if(lit < 25) {
                    return 'brown';
                }
                return 'orange';
            } else if (hue > 50 && hue <= 65) {
                return 'yellow';
            } else if (hue > 65 && hue <= 150) {
                return 'green';
            } else if (hue > 150 && hue <= 250) {
                return 'blue';
            } else if (hue > 250 && hue <= 315) {
                return 'purple';
            } else {
                return 'red';
            }
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

            if(max == min){
                h = s = 0; // achromatic
            } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            s = s*100;
            s = Math.round(s);
            l = l*100;
            l = Math.round(l);
            h = Math.round(360*h);

            const hsl = new Array();
            hsl[0] = h;
            hsl[1] = s;
            hsl[2] = l;
            return hsl;
        }
        
        // * HSL -> Hex
        //SOURCE: https://css-tricks.com/converting-color-spaces-in-javascript/
        function HSLToRGB(h,s,l) {
          // Must be fractions of 1
          s /= 100;
          l /= 100;

          let c = (1 - Math.abs(2 * l - 1)) * s,
              x = c * (1 - Math.abs((h / 60) % 2 - 1)),
              m = l - c/2,
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
        function RGBToHex(r,g,b) {
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
              if(x < 0) {
                s = S + (x*lowerDeviation(S));
                l = L + (x*lowerDeviation(L));
              } else {
                s = S + (x*upperDeviation(S));
                l = L + (x*upperDeviation(L));
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
            if(value <= 80) {
            return 10;
          } else {
            let deviation = Math.floor((100-value)/2);
            if (deviation > 5) {
                return Math.floor(deviation / 2);
            }
            return deviation;
          }
        }

        function lowerDeviation(value) {
            if(value >= 20) {
            return 10;
          } else {
            let deviation = Math.floor(value/2);
            if (deviation > 5) {
                return Math.floor(deviation / 2);
            }
            return deviation;
          }
        }

/*
 * Sidebar Handling
 *
 */
        // Load data button
        // Random color button
        // Category Navigation






/*
 *
 *
 *
 */




















/*
 *
 *
 *
 *
 */

















/*
// Color Card Buttons
listViewContainer.addEventListener('click', (e) => {
	if(e.target.tagName === 'BUTTON') {
		const button = e.target;  
	  	const textElement = button.parentNode;
		const card = textElement.parentNode;
		const cardSwatch = card.children[0];
	  	if(button.className === 'edit-button') {
			//span -> input
			const input = document.createElement('input');
			const text = textElement.textContent.toLowerCase;
			input.type = 'text';
			input.value = text;
			card.insertBefore(input, textElement);
			card.removeChild(textElement);
			//editbutton -> savebutton
			button.className = 'save-button';
			button.textContent = String.fromCharCode(10003);
		} else if(button.className === 'save-button') {
			const text = textElement.value.toLowerCase;
			//check input is valid
			if(!isHexValid(text)) {
			   //not valid, then make red outline
			   
			} else {
				//input -> span
				const span = document.createElement('span');
				span.textContent = textElement.value;
				card.insertBefore(span, textElement);
				card.removeChild(textElement);
				
				const hexCode = text;
				if(hexCode.substr(0,1) !== '#') {
					hexCode = "#" + hexCode;
				}
				//swatchColor = input
				cardSwatch.style.backgroundColor = hexCode;
				//savebutton ->editbutton
				button.className = 'edit-button';
				button.textContent = String.fromCharCode(9998);
			}
		}
	}
});

*/



/* Given a hex code, checks whether the hexcode already exists in the data set.
- Returns true if hex is already in set.
- Returns false if hex is not in set.*/
function hexExists(hexCode) {
	return false;
}

function isHexValid(hexCode) {
	let hex = hexCode;
	if (hexCode.substr(0,1) === '#') {
		hex = hexCode.substr(1,hexCode.length);	
	}
	for(let i = 0; i < 6; i++) {
		let char = hex.charAt(i);
		if(isNaN(parseInt(char))) {
			char = char.toLowerCase();
			let charValue = char.charCodeAt(0);
			if(charValue < 97 || charValue > 102) {
				return false;	
			}
		}
	}
	return true;
}





