const listViewDiv = document.getElementById("listView");
const chipButton = document.getElementById("newChipButton");
chipButton.addEventListener("click", () => {
	console.log('clicked!');
	// Prepend = add node to front of parent
	listViewDiv.prepend(createChip("#fcd303"));
});

function createChip(colorId) {
	// Create the outer color chip
	const colorChip = document.createElement("div");
	colorChip.className = "flex-item box";
	
	// Create the chip's color square
	const swatchColor = document.createElement("div");
	swatchColor.className = "swatch-color";
	swatchColor.style.backgroundColor = colorId;	
	
	// Create the chip's hexadecimal text
	const swatchName = document.createElement("p");
	swatchName.id = colorId;
	swatchName.textContent = colorId;
	swatchName.className = "swatch-name";
	
	// Append square + text to chip
	colorChip.appendChild(swatchColor);
	colorChip.appendChild(swatchName);
	
	return colorChip;
}

/*
// Given a hexadecimal color, returns a general color category (e.g. 'Blue', 'Red')
function defineColor(colorId) {
	
	
}
*/