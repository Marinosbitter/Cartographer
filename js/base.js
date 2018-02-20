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

//========== Map settings ==========//
// Upload new map image
$('#mapImageSetting').change(function(){
    var input = this;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var mapImage = new Image(); 
            mapImage.onload = function(){
                $('#mapImagePatt image').attr("xlink:href", mapImage.src);
                $('#svgMap').attr('viewBox', '0,0,' + mapImage.width + ',' + mapImage.height);
                setGridSizeX();
                setGridSizeY();
            };
            mapImage.src = e.target.result; 
        }
        reader.readAsDataURL(input.files[0]);
    }    
});
$('#gridSizeXSetting').change(function(){
    setGridSizeX();
});
$('#gridSizeYSetting').change(function(){
    setGridSizeY();
});
// Adjust Grid X
function setGridSizeX(){
    var gridSizeX = $('#gridSizeXSetting').val();
    if(gridSizeX < 1){gridSizeX = 1;}
    var viewBoxSize = $('#svgMap').attr('viewBox');
    viewBoxSize = viewBoxSize.split(",");
    $('#mapGridPatt').attr('width', viewBoxSize[2] / gridSizeX);
}
// Adjust Grid Y
function setGridSizeY(){
    var gridSizeY = $('#gridSizeYSetting').val();
    if(gridSizeY < 1){gridSizeY = 1;}
    var viewBoxSize = $('#svgMap').attr('viewBox');
    viewBoxSize = viewBoxSize.split(",");
    $('#mapGridPatt').attr('height', viewBoxSize[3] / gridSizeY);
}
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