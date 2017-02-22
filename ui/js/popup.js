console.log("Started");

var monitorButton = document.getElementById('monitor');
var autologoutButton = document.getElementById('autoLogout');
//var screenShotButton = document.getElementById('screenShot');
monitorButton.addEventListener("click", monitor);
autologoutButton.addEventListener("click", autoLogout);
// screenShotButton.addEventListener("click", screenShotSetting);

document.addEventListener("DOMContentLoaded", onLoad, false);

//Creates Long-lived Connection for messages
var port = chrome.runtime.connect();

console.log("message sent");



port.onMessage.addListener(function(msg) {
});


//---------------Set default values of popup.html onload-----------------/
function onLoad(){
	console.log('Setting Default Values');
	chrome.storage.sync.get('monitor', function(value){
		var currentStatus = value['monitor'];
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			monitorButton.value = 'Monitor';
		}else{
			monitorButton.value ='Monitor Enabled';
		}
	});

	chrome.storage.sync.get('autologout', function(value){
		var currentStatus = value['autologout'];
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			autologoutButton.value = 'Auto Logout';
		}else{
			autologoutButton.value ='Auto Logout Enabled';
		}
	});
} 


//------------monitor front-end implementation------------------------//
function monitor(){
	console.log("ButtonClicked");
	chrome.storage.sync.get('monitor',function(value){
		var currentStatus = value['monitor'];
		//console.log(currentStatus);
		if(currentStatus === undefined || currentStatus == 'inactive' ){

			chrome.storage.sync.set({"monitor" : 'active'});
			monitorButton.value= "Monitor Enabled";
			port.postMessage({keylogger: "active"});	

		}else{
			chrome.storage.sync.set({"monitor" : 'inactive'});
			monitorButton.value = 'Monitor';
			port.postMessage({keylogger: "inactive"});

		}	
	}); 

}

//----------------autoLogout front-end implementation---------------------//
function autoLogout(){
	chrome.storage.sync.get('autologout',function(value){
		var currentStatus = value['autologout'];
		//console.log(currentStatus);
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			
			autologoutButton.value= "AutoLogout Enabled";
			port.postMessage({autologout: "active"});
			chrome.storage.sync.set({"autologout" : 'active'});

		}else{
			autologoutButton.value = 'Auto Logout';
			port.postMessage({autologout: "inactive"});
			chrome.storage.sync.set({"autologout" : 'inactive'});

		}	
	}); 

}

/*
function screenShotSetting(){
	chrome.storage.sync.get('screenShot',function(value){
		var currentStatus = value['screenShot'];
		//console.log(currentStatus);
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			
			screenShotButton.value= "SCEnabled";
			port.postMessage({screenShot: "active"});
			chrome.storage.sync.set({"screenShot" : 'active'});

		}else{
			screenShotButton.value = 'screenShot';
			port.postMessage({screenShot: "inactive"});
			chrome.storage.sync.set({screenShot : 'inactive'});

		}	
	}); 
}*/

