const outerContainer = document.getElementById('outerContainer');
const mainContainer = document.getElementById('mainContainer');
const nav = document.querySelector("#cardNav");
const newColorButton = document.getElementById("newColorButton");
const clearGridButton = document.getElementById("clearGridButton");
const randPageButton = document.getElementById("randPageButton");

const cardList = new Array();
const itemsPerPage = 12;
let curPage = 1;
let isLoaded = false;

// View Switching
let overallView = "list";
let curCard = null;
const listViewContainer = createListViewContainer();		// change name to listViewContainer
const detailViewContainer = createDetailViewContainer();
mainContainer.insertBefore(listViewContainer, nav);

let cardListPosition = -1;

function createListViewContainer() {
	const container = document.createElement("div");
	container.className = "list-view-container"; 	// "list-view-container"
	container.id = "listContainer";	
	return container;
}

function createDetailViewContainer() {
	const container = document.createElement("div");
	container.className = "detail-view-container";
	container.id = "detailContainer";
	//append back button
	const backButton = document.createElement('button');
	backButton.id = "backButton";
	container.appendChild(backButton);
	return container;
}





/* Swatch view change */
listViewContainer.addEventListener('click', (e) => {
    const swatch = e.target;
	if(swatch.className === 'card-swatch-detail') {
		console.log("Fatal error! Detail class within list view.");
	}
	if(swatch.className === 'card-swatch-list') {
		switchViews(swatch.parentElement);
	}
});

detailViewContainer.addEventListener("click", (e) => {
	const targetName = e.target.className;
	if(e.target.id === "backButton") {
		switchViews(e.target.parentElement.children[0]);
	} else if (targetName === "card-swatch-detail") {
		switchViews(e.target.parentElement);
	} else if  (targetName === "card-swatch-tint") {
		switchViews(e.target.parentElement);
	}
});


function switchViews(card) {
	if (overallView === "list") {
		overallView = "detail";
		curCard = card;
		cardListPosition = getCardListPosition(card);
		switchViewClass(curCard);
		loadDetailView(curCard);
        
        nav.style.display = "none";
	} else {
		// need to replace the previous card in list view
        

		if(card.id === curCard.id) {
			overallView = "list";
			switchViewClass(curCard);
			//curCard = null; //TODO: double check this is correct.
			loadListView(curCard);
            
            nav.style.display = "block";
		} else {
			switchViewClass(curCard);
            replaceListCard();
			//curCard = card;
			//switchViewClass(curCard);
			//loadDetailView(curCard);
            switchViewClass(card);
            loadDetailView(card);
		}
	}
	//console.log('swapped to ' + overallView + ' view');
	//console.log('current card: ' + curCard.id);
}

function replaceListCard() {
    const children = listViewContainer.children;
    if (!listViewContainer.contains(curCard)) {
        if(cardListPosition === children.length) {
            listViewContainer.appendChild(curCard);
        } else {
            const refNode = children[cardListPosition];
            listViewContainer.insertBefore(curCard, refNode);    
        }
    }
}

function switchViewClass(card) {
	if (curCard.classList.contains("list")) {
		curCard.classList.remove("list");
		curCard.classList.add("detail");
        
        curCard.classList.remove("grid-cell");
        curCard.classList.add("detail-card");
		//console.log("replaced w/ detail");
	} else if (curCard.classList.contains("detail")) {
		curCard.classList.remove("detail");
		curCard.classList.add("list");
        
        curCard.classList.add("grid-cell");
        curCard.classList.remove("detail-card");
		//console.log("replaced w/ list");
	} else if (curCard.classList.contains("tint")) {
		curCard.classList.remove("tint");
		curCard.classList.add("detail");
	}
}

function loadListView(card) {
	//todo: load list view to specific page of color from detail view
	//remove cards from detailViewContainer
    
	card.children[0].className = "card-swatch-list";
    replaceListCard();
	
	
	
	mainContainer.removeChild(detailViewContainer);
	mainContainer.insertBefore(listViewContainer, nav);
	
	
}

function loadDetailView(card) {
	const backButton = detailViewContainer.children[0];
	
	card.children[0].className = "card-swatch-detail";
	detailViewContainer.insertBefore(card, backButton);
	
	/*
	const tintContainer = document.createElement("div");
	tintContainer.className = "tint-container";
	//define hexCode in relation to curCard.id
	const curHexCode = card.id;
	//configure tint cards
	for(let i = 0; i < 4; i++) {
		//involve HSL -- change only saturation and light
		// first two tints should be decreased S&L
		// last two tints should be increased S&L
		const tintHexCode = curHexCode;
		const tintCard = newCard(tintHexCode);
		tintCard.className = "card-swatch-tint";
		tintContainer.appendChild(tintCard);
	}
	//if there is room
	// creates a new card (of main card), and adds to middle
	tintContainer.insertBefore(newCard(curHexCode), tintContainer.children[2]);
	*/
	
	//detailViewContainer.insertBefore(tintContainer, backButton);
	
	
	mainContainer.removeChild(listViewContainer);
	mainContainer.insertBefore(detailViewContainer, nav);
	
}

function getCardListPosition(card) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			const index = (i*4) + j;
			const indexedCard = listViewContainer.children[index];
			if (card.id === indexedCard.id) {
				return index;
			}
		}
	}
	return -1;
}









function getItemCount() {
	 return cardList.length;
}

function getPageCount() {
	 return Math.ceil(getItemCount() / itemsPerPage);
}

newColorButton.addEventListener("click", () => {
	 console.log('loading...');
     load();
});

randPageButton.addEventListener("click", () => {
	 console.log('generating random page...');
	 loadPage(1);
});

clearGridButton.addEventListener("click", () => {
	 console.log('clearing grid...');
	 clearPage();
	 curPage = 1;
});

function load() {
	 if(isLoaded === true) {
		  return;
	 }
	 isLoaded = true;
     initArray(50);
	 initNavigation();
	 loadPage(1);
	nav.children[0].style.textDecoration = "underline";
}

function initArray(size) {
     for(let i=0; i<size; i++) {
          //const box = newBox();		  
          //cardList[i] = box;
		  const card = newCard(randomHexCode());
		  cardList[i] = card;
     }
}

function loadPage(pageNumber) {
	overallView = "list";
	curPage = pageNumber;
	let index = (pageNumber - 1) * itemsPerPage;
	while(index < cardList.length) {
	  	for(let i = 0; i < 3; i++) {
              for(let j = 0; j < 4; j++) {
                   if(index >= cardList.length) {
                        return;
                   }
                   listViewContainer.appendChild(cardList[index]);
                   index++;
              }
      	}
    	return;
  	}
}

function clearPage() {
	 while(listViewContainer.childElementCount > 0) {
		  const node = listViewContainer.firstElementChild;
		  listViewContainer.removeChild(node);
	 }
}



function initNavigation() {
	 console.log("initializing navigation links");
	 console.log(nav.textContent);
	 for (let i = 0; i < getPageCount(); i++) {
		  const navLink = document.createElement("a");
		  const pageNo = i + 1;
		  navLink.className = "page-link";
		  navLink.href = "#page" + pageNo + "/";
		  navLink.textContent = pageNo;
		  navLink.id = navLink.href;
		  
		  navLink.addEventListener("click", () => {
			   const pageNumber = parseInt(navLink.textContent);
			   removeNavDecoration();
			   navLink.style.textDecoration = "underline";
			   clearPage();
			   loadPage(pageNumber);
			   console.log(curPage);
		  });
		  nav.appendChild(navLink);
	 }
}

function removeNavDecoration() {
	 const children = nav.children;
	 for (let i = 0; i < children.length; i++) {
		  const navLink = children[i];
		  navLink.style.textDecoration = "none";
	 }
}

function newCard(hexCode) {
	 // Create color card framework
	const card = document.createElement("div");
	card.id = hexCode;
	card.className = "grid-cell border border-round list";
	
	// Create the card's visible swatch
	const cardSwatch = document.createElement("div");
	cardSwatch.className = "card-swatch-list";
	cardSwatch.style.backgroundColor = hexCode;
	
	// Create the chip's hexadecimal text
	const cardText = document.createElement("span");
	cardText.textContent = hexCode;
	cardText.className = "card-hex-code";
	
	/*
	// Edit/Save Button
	const editButton = document.createElement("button");
	editButton.className = "edit-button";
	editButton.textContent = String.fromCharCode(9998);
	cardText.appendChild(editButton);
	
	//const saveButton = document.createElement("button");
	*/
	// Append swatch + text to chip
	card.appendChild(cardSwatch);
	card.appendChild(cardText);
     
     // Color Category
     //colorCard.class = "red";
	
	return card;
}



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



function randomHexCode() {
     // eg: #ffffff or #000000
     let code = "#";
     for (let x = 0; x < 6; x++) {
          let rand = Math.floor(Math.random()*16);
          code = code + convertDigitToHex(rand);
     }
     return code;
}

function convertDigitToHex(digit) {
     if (digit < 10) {
          return String(digit);
     }
     let unicodeDigit = 87 + digit;
     return String.fromCharCode(unicodeDigit);
}


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



function colorClassification(hexCode) {
    const hsl = hexToHSL(hexCode);
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

function getTints(sourceHex) {    
    const HSL = hexToHSL(sourceHex);
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














