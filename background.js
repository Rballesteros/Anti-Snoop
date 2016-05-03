var autoLogoutState = false;

//Long-Lived Connection for messages
var port = chrome.runtime.connect();

console.log("working");

//port.postMessage({joke: "Knock knock"});

chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
			console.log("Message Received");
			console.log(msg);
			console.log(msg.autoLogout)
		  if (msg.autologout == "active"){
		  	console.log("Message Received active");
		  	autoLogoutState = true;
		  }else if (msg.autologout== "inactive"){
		  	console.log("Message Received inactive");
		  	autoLogoutState = false;
		  }
	});
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

//Detects when alarm goes off and sends message to auto logout script
chrome.alarms.onAlarm.addListener(function(alarm){
	console.log('Alarm Trigger');
	chrome.tabs.query({}, function(tabs) {
    var message = {logout: "logout"};
    for (var i=0; i<tabs.length; ++i) {
    	console.log(tabs[i].url);
    	var currentTab = tabs[i].url;
    	if(currentTab.search('http') != -1){
        	chrome.tabs.executeScript(tabs[i].id,{file:'autologout.js'});
    	}
    }
	});
	

});

