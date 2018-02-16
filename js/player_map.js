//========== Tab Sync ==========//
// Connection to a broadcast channel
var bc = new BroadcastChannel('cartographer');
// Example of a simple event handler that only
// logs the event to the console
bc.onmessage = function (ev) { console.log(ev); }