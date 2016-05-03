console.log("Started");

var monitorButton = document.getElementById('monitor');
var autologoutButton = document.getElementById('autoLogout');
monitorButton.addEventListener("click", monitor);
autologoutButton.addEventListener("click", autoLogout);

document.addEventListener("DOMContentLoaded", onLoad, false);

//Long-lived Connection for messages
var port = chrome.runtime.connect();

console.log("message sent");




port.onMessage.addListener(function(msg) {
});


//---------------Set default values of popup.html onload-----------------//
function onLoad(){
	console.log('Setting Default Values');
	chrome.storage.sync.get('monitor', function(value){
		var currentStatus = value['monitor'];
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			monitorButton.value = 'Monitor';
		}else{
			monitorButton.value ='Active';
		}
	});

	chrome.storage.sync.get('autologout', function(value){
		var currentStatus = value['autologout'];
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			autologoutButton.value = 'Auto Logout';
		}else{
			autologoutButton.value ='AutoLOEnabled';
		}
	});
}


//------------monitor front-	end implemenation------------------------//
function monitor(){


	console.log("ButtonClicked");
	chrome.storage.sync.get('monitor',function(value){
		var currentStatus = value['monitor'];
		//console.log(currentStatus);
		if(currentStatus === undefined || currentStatus == 'inactive' ){

			chrome.storage.sync.set({"monitor" : 'active'});
			monitorButton.value= "Active";
	    	chrome.tabs.executeScript({
	        file:'monitor.js',
	        allFrames: true});

		}else{
			chrome.storage.sync.set({"monitor" : 'inactive'});
			monitorButton.value = 'Monitor';
		}	
	}); 

}

//----------------autoLogout front-end implementation---------------------//
function autoLogout(){
	chrome.storage.sync.get('autologout',function(value){
		var currentStatus = value['autologout'];
		//console.log(currentStatus);
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			
			autologoutButton.value= "AutoLOEnabled";
			port.postMessage({autologout: "active"});
			chrome.storage.sync.set({"autologout" : 'active'});

			//For testing 
			// chrome.tabs.executeScript({
			// 	file:'autologout.js'
			// });

		}else{
			autologoutButton.value = 'Auto Logout';
			port.postMessage({autologout: "inactive"});
			chrome.storage.sync.set({"autologout" : 'inactive'});

		}	
	}); 

}

