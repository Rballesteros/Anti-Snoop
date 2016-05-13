
var clearLogButton = document.getElementById('clearLog');
clearLogButton.addEventListener("click", clearLog);

// var screenShotsButton = document.getElementById('screenShotsButton');
// screenShotsButton.addEventListener("click", screenShotsLog);

// function screenShotsLog(){
// 	chrome.tabs.create({ url: "screenShots.html" });
// }


function clearLog(){
	chrome.storage.local.clear();
	location.reload();
}



var keyLogResultDiv = document.getElementById("keyLoggerResults");
var tableElement = document.createElement("TABLE");
var tableBodyElement = document.createElement("TBODY");

tableElement.border = '1'
tableElement.appendChild(tableBodyElement);

var headingText = ["TimeStamp & Url", "KeyStrokes"];
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
            var tdKeyStrokes = document.createElement('TD');
            tdTimeStamp.appendChild(document.createTextNode(key));
            tdKeyStrokes.appendChild(document.createTextNode(keyStrokesLog[key]));
            dataRow.appendChild(tdTimeStamp);
            dataRow.appendChild(tdKeyStrokes);
           	tableBodyElement.appendChild(dataRow);
        }
	}
		
});

keyLogResultDiv.appendChild(tableElement);




