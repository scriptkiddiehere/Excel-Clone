for(let i=0; i<allCell.length; i++) {
    // allCell[i].addEventListener("focus", function() {
    //     console.log("focus", allCell[i]);
    // });
    //to saves user entered value, for later use
    allCell[i].addEventListener("blur", function() {
        let value = allCell[i].innerText;
        let rowId = allCell[i].getAttribute("rowId");
        let colId = allCell[i].getAttribute("colId");
        let cellObject = sheetDB[rowId][colId];
        cellObject.value = value;
        updateChildren(cellObject);
    })
}

formulaBar.addEventListener("keydown", function(e) {
    if(e.key == "Enter" &&formulaBar.value) {
        //gets user input value
        let currFormula = formulaBar.value;
        // gets value from formula
        let value = evaluateFormula(currFormula);
        let address = addressInput.value;
        // given cell for which formula is being set, update UI, DB
        setCell(value, currFormula);
        setParentChildrenArray(currFormula, address);
    }
})

//set the UI and DB for cell
function setCell(value, formula, uiCellElement = findUICellElement()) {
    //let uiCellElement = findUICellElement();
    uiCellElement.innerText = value;
   let rowId= uiCellElement.getAttribute("rowId");
   let colId= uiCellElement.getAttribute("colId");
    // DB update
    // let address = addressInput.value;
    // let {rowId, colId} = getRowAndColId(address);
    sheetDB[rowId][colId].value = value;
    sheetDB[rowId][colId].formula = formula;
}

//evaluate and returns the value of formula
function evaluateFormula(formula) {
    //convert ( A1 + A2 ) -> ( 10 + 20 )
    // split with space

    let formulaTokens = formula.split(" ");
    for(let i=0; i<formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90) {
            let {rowId, colId} = getRowAndColId(formulaTokens[i]);
            let value = sheetDB[rowId][colId].value;
            formulaTokens[i] = value;
        }
    }
    formulaTokens = formulaTokens.join(" ");

    return eval(formulaTokens);
}

//register yourself as children of the parent (cell that are appearing in the formula)
function setParentChildrenArray(formula, address) {
    //convert ( A1 + A2 ) -> ( 10 + 20 )
    // split with space

    let formulaTokens = formula.split(" ");
    for(let i=0; i<formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii<=90) {
            let {rowId, colId} = getRowAndColId(formulaTokens[i]);
            let parentObj = sheetDB[rowId][colId];
            parentObj.children.push(address);
        }
    }
}

function updateChildren(cellObject) {
    let children = cellObject.children;
    for(let i=0; i<children.length; i++) {
        let chAddress = children[i];
        let {rowId, colId} = getRowAndColId(chAddress);
        console.log(rowId, colId);
        let childObj = sheetDB[rowId][colId];
        let chFormula = childObj.formula;
        let newValue = evaluateFormula(chFormula);
        let uiCellElement = document.querySelector(
            `.cell[rowId="${rowId}"][colId="${colId}"]`
        );
        setCell(newValue ,chFormula, uiCellElement);
        updateChildren(childObj);
    }
}