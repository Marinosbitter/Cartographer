//========== Tab Sync ==========//
// Connection to a broadcast channel
var bc = new BroadcastChannel('cartographer');
// Player map
function launcPlayerMap(){
    window.open('/player_map.html','_blank');
}
function updatePlayerMap(){
    // Example of sending of a very simple message
    bc.postMessage('This is a test message.');
}