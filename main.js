const innerGridContainer = document.getElementById("innerGrid");
const newColorButton = document.getElementById("newColorButton");
const clearGridButton = document.getElementById("clearGridButton");
const randPageButton = document.getElementById("randPageButton");
const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");

const cardList = new Array();
const itemsPerPage = 12;
let curPage = 1;
let isLoaded = false;

const nav = document.querySelector("#cardNav");

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






function loadPage(pageNumber) {
	 curPage = pageNumber;
	 let index = (pageNumber - 1) * itemsPerPage;
	 while(index < cardList.length) {
		  for(let i = 0; i < 3; i++) {
               for(let j = 0; j < 4; j++) {
                    if(index >= cardList.length) {
                         return;
                    }
                    innerGridContainer.appendChild(cardList[index]);
                    index++;
               }
          }
     return;
  }
}

function clearPage() {
	 while(innerGridContainer.childElementCount > 0) {
		  const node = innerGridContainer.firstElementChild;
		  innerGridContainer.removeChild(node);
	 }
}

function initArray(size) {
     for(let i=0; i<size; i++) {
          //const box = newBox();		  
          //cardList[i] = box;
		  const card = newCard(randomHexCode());
		  cardList[i] = card;
     }
}

function newBox() {
     const box = document.createElement("div");
     box.className = "basic-box";
	 box.style.backgroundColor = randomHexCode();
     return box;
}

function newCard(hexCode) {
	 // Create color card framework
	const card = document.createElement("div");
	card.className = "grid-cell border border-round";
	
	// Create the card's visible swatch
	const cardSwatch = document.createElement("div");
	cardSwatch.className = "card-swatch";
	cardSwatch.style.backgroundColor = hexCode;	
	
	// Create the chip's hexadecimal text
	const cardText = document.createElement("span");
	cardText.id = hexCode;
	cardText.textContent = hexCode;
	cardText.className = "card-hex-code";
	
	// Edit/Save Button
	const editButton = document.createElement("button");
	editButton.className = "edit-button";
	editButton.textContent = String.fromCharCode(9998);
	cardText.appendChild(editButton);
	
	//const saveButton = document.createElement("button");
	
	// Append swatch + text to chip
	card.appendChild(cardSwatch);
	card.appendChild(cardText);
     
     // Color Category
     //colorCard.class = "red";
	
	return card;
}

// Color Card Buttons
innerGridContainer.addEventListener('click', (e) => {
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



/* THINKING:
	Need to create an array containing all color cards--we can add color cards to that array.
	
	Then, when displaying the color cards, we can simply draw from array[0] - [11]; [12] - 
	When adding a new color card, we will want to 
*/

// global JavaScript variables
/*
const cardList = new Array();
const pageList = new Array();
const numberPerPage = 10;
let currentPage = 1;
let numberOfPages = 1;   // calculates the total number of pages

window.addEventListener('load', load);
function load() {
     console.log('loading');
     let count = 100;
     fillArray(count);
     numberOfPages = Math.ceil(count / numberPerPage);
     // fills in the first page
     loadPage(1);
}

function fillArray(count) {
    for (let x = 0; x < count; x++) {
         let hexCode = randomHexCode();
         const colorCard = newColorCard(hexCode);
         cardList[x] = colorCard;
    }
}
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
/*
function newColorCard(hexCode) {
	// Create color card framework
	const colorCard = document.createElement("div");
	colorCard.className = "grid-cell border border-round";
	
	// Create the card's visible swatch
	const cardSwatch = document.createElement("div");
	cardSwatch.className = "card-swatch";
	cardSwatch.style.backgroundColor = hexCode;	
	
	// Create the chip's hexadecimal text
	const cardText = document.createElement("div");
	cardText.id = hexCode;
	cardText.textContent = hexCode;
	cardText.className = "card-hex-code";
	
	// Append swatch + text to chip
	colorCard.appendChild(cardSwatch);
	colorCard.appendChild(cardText);
     
     // Color Category
     //colorCard.class = "red";
	
	return colorCard;
}

function loadPage(pageNumber) {
     clearGrid();
     const firstPageSpot = (pageNumber - 1) * numberPerPage;
     for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 4; j++) {
              const card = cardList[i + firstPageSpot]; 
               appendCardToGrid(card, i, j);
          }
     }
}

function appendCardToGrid(card, row, column) {
     innerGridContainer.appendChild(card);
     card.style.gridRow = row;
     card.style.gridColumn = column;
}

function clearGrid() {
     if (innerGridContainer.children == null) { return; }
     for (let i = 0; i < innerGridContainer.children.length; i++) {
          innerGridContainer.removeChild(innerGridContainer.childNodes[i]);
     }
}

*/

















/* Given a hex code, checks whether the hexcode already exists in the data set.
- Returns true if hex is already in set.
- Returns false if hex is not in set.*/
function hexExists(hexCode) {
	return false;
}
