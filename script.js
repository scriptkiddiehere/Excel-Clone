let addBtn = document.querySelector(".add-sheet-btn-container");
//let sheetList = addBtn.parentNode;
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");
firstSheet.addEventListener("click", makeMeActive);

// to add new sheets
addBtn.addEventListener("click", function() {
    //extract last sheet number
    let sheets =  document.querySelectorAll(".sheet");
    let lastIndex = sheets[sheets.length-1];
    let lastIdx = lastIndex.getAttribute("idx");
    lastIdx = Number(lastIdx);

    //create new sheet
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("idx", `${lastIdx+1}`);
    newSheet.textContent = `Sheet ${lastIdx+2}`;

    //adding new sheet to sheet list
    sheetList.appendChild(newSheet);

    // all previous sheet will be inactive
    for(let i=0; i<sheets.length; i++)
        sheets[i].classList.remove("active");
    //new sheet will be the active one
    newSheet.classList.add("active");

    //add event listener to the sheet, so that when we click it
    // it becomes active
    newSheet.addEventListener("click", makeMeActive);
})
function makeMeActive(e) {
    //this is the object to which eventt listener is applied
    let sheet = e.currentTarget;

    // all previous sheet will be inactive
    let allSheet = document.querySelectorAll(".sheet");
    for(let i=0; i<allSheet.length; i++)
        allSheet[i].classList.remove("active");
    // current sheet will be active
    sheet.classList.add("active");
}
