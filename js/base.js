var mapImage = "";
var canvasObjs = {};

// Event listeners
var dropZone = document.getElementById('map_image_drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

//========== Uploading a map image ==========/
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//=============== Canvas functions ===============//
//Code for keeping track of objects
canvasObjs = {
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
    //    ctx.drawImage(mapImage, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2 );
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