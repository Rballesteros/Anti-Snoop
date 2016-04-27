console.log("Started");

var monitorButton = document.getElementById('monitor');
monitorButton.addEventListener("click", monitor);
document.addEventListener("DOMContentLoaded", onLoad, false);


//Set default values of popup.html onload
function onLoad(){
	console.log('hello');
	chrome.storage.sync.get('monitor', function(value){
		var currentStatus = value['monitor'];
		if(currentStatus == undefined || currentStatus == 'inactive' ){
			monitorButton.value = 'Monitor';
		}else{
			monitorButton.value ='Active';
		}
	});
}


//Injects Javascript file in webpage to start keylogging
function monitor(){
	console.log("ButtonClicked");
	chrome.storage.sync.get('monitor',function(value){
		var currentStatus = value['monitor'];
		//console.log(currentStatus);
		if(currentStatus == undefined || currentStatus == 'inactive' ){

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

