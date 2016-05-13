# Anti-Snoop Chrome extension
The purpose of this chrome extension is to monitor your computer while you are away.

Instructions for installing Chrome extension 
- In Chrome go to menu-> more tools -> Extensions
- Turn on Developer Mode
- Drag folder with Chrome extension contents into Extensions

Using Ant-Snoop Chrome extension
- Click on Shield icon
- Monitor button starts keylogger
- To view Keylogs right click on shield icon and go to options

- AutoLogout button starts autologout
- For demo purposes autologout is set to 20 seconds idle time and then 5 seconds till script inject Javascript to log out of websites
- So don't touch your computer for 25 seconds and it should log out of support websites

Features 
- Auto Logout
	- Detects when Chrome is idle after a certain amount of time then sets an alarm to inject autologout script
	- When alarm goes off autologout script is injected into all tabs
	- Due to how website's logout sequences are different, I have to add support to have websites logout
	- Current supported websites Github, Amazon, Piazza, Reddit, Linkedin, Google services , Twitter, Facebook

- KeyStroke Logger 
	- When activated keylogger Javascript is injected into every frame in a tab
	- It records any KeyStrokes and logs them with a timestamps and website url
	- If website is refreshed Javascript is re-injected
	- Does not work sometimes when some inputs fields on websites are dynamically created or changed with Javascript 

- Due limitation of Chrome extensions
	- I was not able to access the web cam through the chrome extension which I was planning to use to take a picture of Snooper