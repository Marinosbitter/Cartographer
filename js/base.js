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
                setFogOfWar(mapImage.width, mapImage.height);
            };
            mapImage.src = e.target.result; 
        }
        reader.readAsDataURL(input.files[0]);
    }    
});// Upload new map image
$('#gridSizeXSetting').change(function(){
    setGridSizeX();
});
$('#gridSizeYSetting').change(function(){
    setGridSizeY();
});
$('#gridColorSetting').change(function(){
    setGridColor($('#gridColorSetting').val());
});
$('#gridThicknessSetting').change(function(){
    setGridThickness($('#gridThicknessSetting').val());
});

function setGridSizeX(){
    var gridSizeX = $('#gridSizeXSetting').val();
    if(gridSizeX < 1){gridSizeX = 1;}
    var viewBoxSize = $('#svgMap').attr('viewBox');
    viewBoxSize = viewBoxSize.split(",");
    $('#mapGridPatt').attr('width', viewBoxSize[2] / gridSizeX);
}// Adjust Grid X
function setGridSizeY(){
    var gridSizeY = $('#gridSizeYSetting').val();
    if(gridSizeY < 1){gridSizeY = 1;}
    var viewBoxSize = $('#svgMap').attr('viewBox');
    viewBoxSize = viewBoxSize.split(",");
    $('#mapGridPatt').attr('height', viewBoxSize[3] / gridSizeY);
}// Adjust Grid Y
function setGridColor(color){
    $('#mapGridPatt rect').attr('stroke', color);
}// Set grid color
function setGridThickness(thickness){
    $('#mapGridPatt rect').attr('stroke-width', thickness);
}// Set grid thickness
function setFogOfWar(fogCanvasWidth, fogCanvasHeight){
    var c = document.getElementById('fogCanvas');
    var ctx = c.getContext('2d');
    $(c).attr('width', fogCanvasWidth);
    $(c).attr('height', fogCanvasHeight);

    var my_gradient=ctx.createLinearGradient(0,0,0,fogCanvasHeight);
    my_gradient.addColorStop(0,"black");
    my_gradient.addColorStop(1,"white");
    ctx.fillStyle=my_gradient;
    ctx.fillRect(0,0,fogCanvasWidth,fogCanvasHeight);

    //Save canvas as image for use in mask
    var fogImageData = c.toDataURL("image/png");
    var fogImage = new Image();
    fogImage.onload = function(){
        $('#fogMask image').attr("xlink:href", fogImage.src);
    }
    fogImage.src = fogImageData;

}// Set fog of war

//========== Tab Sync ==========//
// Connection to a broadcast channel
var bc = new BroadcastChannel('cartographer');
// Player map
function launcPlayerMap(){
    window.open('player_map.html','_blank');
}// Launch player map in new tab
function updatePlayerMap(){
    // Example of sending of a very simple message
    bc.postMessage($('#mapContainer').html());
}// Update external player maps
var targetNodes         = $("#svgMap");
var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
var myObserver          = new MutationObserver (mutationHandler);
var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };
//--- Add a target node to the observer. Can only add one node at a time.
targetNodes.each ( function () {
    myObserver.observe (this, obsConfig);
} );
function mutationHandler (mutationRecords) {
    //    console.info ("mutationHandler:");

    mutationRecords.forEach ( function (mutation) {
        //        console.log (mutation.type);

        if (typeof mutation.removedNodes == "object") {
            var jq = $(mutation.removedNodes);
            //            console.log (jq);
            //            console.log (jq.is("span.myclass2"));
            //            console.log (jq.find("span") );
        }
    } );

    updatePlayerMap();
}