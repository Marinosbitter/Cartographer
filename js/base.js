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
    "mapSettings":{
        "grid":{
            "size":64,
            "offsetX":0,
            "offsetY":0,
            "color":"#000000"
        }
    },
    "paintObjects":{
        "mapImage": {"src": "../images/lmop4.jpg"}
    }
};

//Code for keeping track of canvas state
//Code for mouse events
//Code for drawing the objects as they are made and move around
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Paint map image
var mapImage = new Image;
mapImage.src = canvasObjs.paintObjects.mapImage.src;
ctx.canvas.width  = mapImage.width;
ctx.canvas.height  = mapImage.height;
mapImage.onload = function(){
    ctx.drawImage(mapImage, 0, 0);
    drawGrid();
}

function drawGrid(){
    var yGridPos = 0;
    yGridPos += canvasObjs.mapSettings.grid.offsetY;

    while(yGridPos < ctx.canvas.height) {
        var xGridPos = 0;
        xGridPos += canvasObjs.mapSettings.grid.offsetX;

        while(xGridPos < ctx.canvas.width) {
            ctx.beginPath();
            ctx.lineWidth="2";
            ctx.strokeStyle=canvasObjs.mapSettings.grid.color;
            ctx.rect(xGridPos, yGridPos, canvasObjs.mapSettings.grid.size, canvasObjs.mapSettings.grid.size); 
            ctx.stroke(); 

            xGridPos += canvasObjs.mapSettings.grid.size;
        }
        yGridPos += canvasObjs.mapSettings.grid.size;
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