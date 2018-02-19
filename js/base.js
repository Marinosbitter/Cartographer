var canvasObjs = {};
//========== Basic page JS ==========//
$(document).ready(function() {
    // DM Menu
    $("#leftMenu").mmenu({
        "extensions": [
            "fx-panels-zoom",
            "pagedim-black"
        ],
        "navbars": [
            {
                "position": "top",
                "content": [
                    "searchfield"
                ]
            }
        ]
    },{
        "offCanvas": {
            "pageNodetype": "section",
            "pageSelector": "#page-content"
        }
    });
    $("#rightMenu").mmenu({
        "extensions": [
            "fx-panels-zoom",
            "pagedim-black",
            "position-right"
        ],
        "navbars": [
            {
                "position": "top",
                "content": [
                    "searchfield"
                ]
            }
        ]
    },{
        "offCanvas": {
            "pageNodetype": "section",
            "pageSelector": "#page-content"
        }
    });
});

//========== Uploading a map image ==========/


//=============== Canvas functions ===============//
//Code for keeping track of objects
canvasObjs = {
    "mapSettings":{},
    "paintObjects":{
        "mapImage": {"src": "../images/lmop4.jpg"}
    }
};

//Code for keeping track of canvas state
//Code for mouse events
//Code for drawing the objects as they are made and move around
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// resize the canvas to fill browser window dynamically
//window.addEventListener('resize', resizeCanvas, false);
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
    var mapImage = new Image;
    mapImage.src = canvasObjs.paintObjects.mapImage.src;
    mapImage.onload = function(){
        ctx.drawImage(mapImage, 0, 0);
    }
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