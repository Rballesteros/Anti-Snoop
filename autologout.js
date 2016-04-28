
//Dectects when computer is idle 
chrome.idle.setDetectionInterval(120);

//When Computer is idle alarm is set to logout accounts
chrome.idle.onStateChanged.addListener(
	function(currentState){
		if(currentState == "idle"){
			chrome.alarms.create("logoutAlarm",{when: Date.now() + 600000} );
		}else if(currentState == "active"){
			chrome.alarms.clear("logoutAlarm");
		}

	});


//Dectects when alarm goes off and logouts out websites
chrome.alarms.onAlarm.addListener(function(alarm){

	chrome.tabs.query({},function(){
		var currentURL = document.URL;

		if(currentURL.search('facebook') != -1){
			document.getElementById('userNavigationLabel').click();
			document.getElementsByClassName('_w0d')[0].submit();		
		}


		if(currentURL.search('twitter') != -1){
			var logoutElement = document.getElementById('signout-button');
			if(logoutElement != undefined){
				logoutElement.click();
			}
		}


	});


});

