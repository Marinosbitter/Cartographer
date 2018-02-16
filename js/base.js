var mapImage = "";

function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
    
    mapImage = preview.src;
}

//=============== Canvas functions ===============//
//Code for keeping track of objects
//Code for keeping track of canvas state
//Code for mouse events
//Code for drawing the objects as they are made and move around