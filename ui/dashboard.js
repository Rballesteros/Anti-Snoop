


// var screenShotsButton = document.getElementById('screenShotsButton');
// screenShotsButton.addEventListener("click", screenShotsLog);

// function screenShotsLog(){
// 	chrome.tabs.create({ url: "screenShots.html" });
// }

var clearLogButton = document.getElementById('clearLog');
clearLogButton.addEventListener("click", clearLog);

function clearLog(){
	chrome.storage.local.clear();
	location.reload();
}



var tableElement = document.getElementById("keyLoggerResults");
var tableBodyElement = document.createElement("TBODY");
tableElement.appendChild(tableBodyElement);

var headingText = ["TimeStamp","Url", "KeyStrokes"];
var headingRow = document.createElement("TR");
tableBodyElement.appendChild(headingRow);

for(i = 0; i < headingText.length; i++){
	var thElement = document.createElement("TH");
	thElement.appendChild(document.createTextNode(headingText[i]));
	headingRow.appendChild(thElement);
}


chrome.storage.local.get(null,function(keyStrokesLog){
	for (var key in keyStrokesLog) {
		if(key != 'monitor' || key != 'autologout'){
			var dataRow = document.createElement("TR");
            var tdTimeStamp = document.createElement('TD');
            var tdUrl = document.createElement('TD');
            var tdKeyStrokes = document.createElement('TD');
            var parsedTimeStamp = key.split(": ");
            tdTimeStamp.appendChild(document.createTextNode(parsedTimeStamp[0]));
            tdUrl.appendChild(document.createTextNode(parsedTimeStamp[1]));
            tdKeyStrokes.appendChild(document.createTextNode(keyStrokesLog[key]));
            dataRow.appendChild(tdTimeStamp);
            dataRow.appendChild(tdUrl);
            dataRow.appendChild(tdKeyStrokes);
           	tableBodyElement.appendChild(dataRow);
        }
	}
		
});

keyLogResultDiv.appendChild(tableElement);




