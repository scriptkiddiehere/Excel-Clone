let save = document.querySelector(".save");
let open = document.querySelector(".open");
save.addEventListener("click", function () {
    // save 2D array in file
    let data = JSON.stringify(sheetDB);
    // convert it into Blob
    // mime type -> application/json
    let blob = new Blob([data], {type: 'application/json'});
    // convert it into URL
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "file.json";
    a.href = url;
    a.click();
    a.remove();
})
open.addEventListener("change", function(e) {
    // files array -> file accept
    let filesArray = open.files;
    let filesObj = filesArray[0];
    // file reader
    let fr = new FileReader(filesObj);
    fr.readAsText(filesObj);
    fr.onload = function () {
        console.log(fr.result);
    }
})