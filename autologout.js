
//Message Listener 
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//    //if (request.greeting == "hello")
//       //sendResponse({farewell: "goodbye"});
//     if(request.logout == "logout")
//   		logoutAll();
//   });


// function logoutAll(){

	var currentURL = document.URL;
	var logoutElement;

	if(currentURL.search('facebook') != -1){
		document.getElementById('userNavigationLabel').click();
		document.getElementsByClassName('_w0d')[0].submit();		
	}

	if(currentURL.search('twitter') != -1){
		logoutElement = document.getElementById('signout-button');
		if(logoutElement !== undefined){
			logoutElement.click();
		}
	}

	if(currentURL.search('google') != -1 || currentURL.search('youtube') != -1){
		window.open("https://accounts.google.com/Logout?hl=en", "_self");
	}

	if(currentURL.search('linkedin') != -1){
		logoutElement = document.getElementsByClassName('act-set-action')[0];
		if(logoutElement !== undefined){
			var logout = logoutElement.getElementsByTagName('a')[0];
			logout.click();
		}
	}

	if(currentURL.search('reddit') != -1){
		logoutElement = document.getElementsByClassName("logout hover")[0];
		if(logoutElement !== undefined){
			var redditLogout = logoutElement.getElementsByTagName("a")[0];
			redditLogout.click();
		}
	}

	if(currentURL.search('piazza') != -1){
		logoutElement = document.getElementById('log_out');
		if(logoutElement !== undefined){
			logoutElement.click();
		}
	}

	if(currentURL.search('amazon') != -1){
		logoutElement = document.getElementById('nav-item-signout');
		if(logoutElement !== undefined){
			logoutElement.click();	
		}
	}

