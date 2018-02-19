var canvasObjs = {};
var mapImage;
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
//========== SVG Functions ==========//
$('#svgMap').attr('viewBox', '0,0,' + 1920 + ',' + 1338);
$('#mapImagePatt image').attr("xlink:href", "/images/lmop4.jpg");

// Set map background


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