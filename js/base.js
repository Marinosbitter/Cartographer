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

//    canvasObjs.background.src = preview.src;
    mapImage = preview.src;
}

//=============== Canvas functions ===============//
//Code for keeping track of objects
var canvasObjs = {
    "background": {"src": mapImage}
};
//Code for keeping track of canvas state
//Code for mouse events
//Code for drawing the objects as they are made and move around
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
    drawStuff(); 
}
resizeCanvas();

function drawStuff() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    // Paint map image
    ctx.drawImage(mapImage, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2 );
}

//========== Tab Sync ==========//
// Connection to a broadcast channel
var bc = new BroadcastChannel('cartographer');
// Player map
function launcPlayerMap(){
    window.open('player_map.html','_blank');
}
function updatePlayerMap(){
    // Example of sending of a very simple message
    bc.postMessage(canvasObjs);
}