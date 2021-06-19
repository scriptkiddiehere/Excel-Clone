let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");
let rows = 100;
let cols = 26;
let grid = document.querySelector(".grid");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italics");
let underline = document.querySelector(".underline");
let alignLeft = document.querySelector(".fa-align-left");
let alignCenter = document.querySelector(".fa-align-center");
let alignRight = document.querySelector(".fa-align-right");
let backgroundColor = document.querySelector(".bg-color");
let textColor = document.querySelector(".color");
let addressInput = document.querySelector(".address-input");
let fontSize = document.querySelector(".font-size");
let formulaBar = document.querySelector(".formula-input")
let prevCell;
//represents the state of each cell
let sheetDB = [];

// to create row number, and number from 1 to 100
for (let i = 0; i < rows; i++) {
    // a div for each row number
    let rowNum = document.createElement("div");
    rowNum.innerText = i + 1;
    rowNum.setAttribute("class", "box");
    // adding the div to the left column (number col)
    leftCol.appendChild(rowNum);
}

// to create column number from A to Z
for (let i = 0; i < cols; i++) {
    let rowNum = document.createElement("div");
    rowNum.innerText = String.fromCharCode(65 + i);
    rowNum.setAttribute("class", "cell");
    // adding div to first row, (alphabet row)
    topRow.appendChild(rowNum);
}

// creating the whole grid
for (let i = 0; i < rows; i++) {
    // a div named row for the whole row
    let row = document.createElement("div");
    row.setAttribute("class", "row");

    // for all the rows we will divide it into multiple columns
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        //numbering cell as A1, B1, C6, A2 etc.
        cell.setAttribute("class", "cell");
        cell.setAttribute("rowId", `${i}`);
        cell.setAttribute("colId", `${j}`);

        //appending all the cells to the current row
        row.appendChild(cell);
    }
    // at last adding all the rows to the grid
    grid.appendChild(row);
}

//making the sheet database to keep the formatting
for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        let cell = {
            bold: "normal",
            italic: "normal",
            underline: "none",
            hAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "16",
            color: "white",
            bColor: "none",
            value: "",
            formula: "",
            children: []
        };
        row.push(cell);
    }
    sheetDB.push(row);
}

//event listener for cell click
let allCell = grid.querySelectorAll(".cell");
for (let i = 0; i < allCell.length; i++) {
    allCell[i].addEventListener("click", function () {
        // showing that we are on this cell
        allCell[i].style.border = `3px solid rgb(58, 197, 58)`;
        allCell[i].setAttribute("contenteditable", "true");

        //when the cell is clicked, it shows on address bar
        let rowId = Number(allCell[i].getAttribute("rowId"));
        let colId = Number(allCell[i].getAttribute("colId"));
        addressInput.value = `${String.fromCharCode(65 + colId)}${rowId + 1}`;
        
        let cellObject = sheetDB[rowId][colId];
        if(cellObject.bold == "normal") {
            bold.classList.remove("active-btn");
        } else {
            bold.classList.add("active-btn");
        }
        if(cellObject.italic == "normal") {
            italic.classList.remove("active-btn");
        } else {
            italic.classList.add("active-btn");
        }
        if(cellObject.underline == "none") {
            underline.classList.remove("active-btn");
        } else {
            underline.classList.add("active-btn");
        }
        if (prevCell != undefined) {
            prevCell.style.border = `1px solid rgb(165, 170, 163)`;
        }
        prevCell = allCell[i];
    });
}

// so that when we open the page, cell 0,0 is already selected
let cellFirst = document.querySelector(".grid .cell");
cellFirst.click();

//BUI management
bold.addEventListener("click", function () {
    //bold on click
    let uiCellElement = findUICellElement();
    let rowId = uiCellElement.getAttribute("rowId");
    let colId = uiCellElement.getAttribute("colId");
    let cellObject = sheetDB[rowId][colId];

    if(cellObject.bold == "normal") {
        uiCellElement.style.fontWeight = "bold";
        bold.classList.add("active-btn");
        //to store in the database
        cellObject.bold = "bold";
    }
    else {
        uiCellElement.style.fontWeight = "normal";
        bold.classList.remove("active-btn");
        //to store in the database
        cellObject.bold = "normal";
    }
});
italic.addEventListener("click", function () {
    //italics on click
    let uiCellElement = findUICellElement();
    let rowId = uiCellElement.getAttribute("rowId");
    let colId = uiCellElement.getAttribute("colId");
    let cellObject = sheetDB[rowId][colId];

    if(cellObject.italic== "normal") {
        uiCellElement.style.fontStyle = "italic";
        italic.classList.add("active-btn");
        //to store in the database
        cellObject.italic = "italic"
    }
    else {
        uiCellElement.style.fontStyle = "normal";
        italic.classList.remove("avtive-btn");
        //to store in the database
        cellObject.italic = "normal";
    }
});
underline.addEventListener("click", function () {
    //underline on click
    let uiCellElement = findUICellElement();
    let rowId = uiCellElement.getAttribute("rowId");
    let colId = uiCellElement.getAttribute("colId");
    let cellObject = sheetDB[rowId][colId];

    if(cellObject.underline == "none") {
        uiCellElement.style.textDecoration = "underline";
        underline.classList.add("active-btn");
        //to store in the database
        cellObject.underline = "underline";
    }
    else {
        uiCellElement.style.textDecoration = "none";
        underline.classList.add("active-btn");
        //to store in the database
        cellObject.underline = "none";
    }
});

// align left right center
alignLeft.addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.textAlign = "left";
    console.log(uiCellElement.style.textAlign);
});
alignCenter.addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.textAlign = "center";
});
alignRight.addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.textAlign = "right";
});

textColor.addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.color = textColor.value;
});
backgroundColor.addEventListener("click", function () {
    let uiCellElement = findUICellElement();
    uiCellElement.style.backgroundColor = backgroundColor.value;
});

//font-size
fontSize.addEventListener("change", function () {
    let val = fontSize.value;
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontSize = val + "px";
});

//to get the row and column of a cell
function getRowAndColId(address) {
    colId = Number(address.charCodeAt(0)) - 65;
    rowId = Number(address.slice(1)) - 1;
    return { rowId: rowId, colId: colId };
}

//to get the cell whose font we want to change
function findUICellElement() {
    let address = addressInput.value;
    let rowAndColId = getRowAndColId(address);
    let rowId = rowAndColId.rowId;
    let colId = rowAndColId.colId;

    let uiCellElement = document.querySelector(
        `.cell[rowId="${rowId}"][colId="${colId}"]`
    );
    return uiCellElement;
}


