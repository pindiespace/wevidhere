/** 
 * screen-config.js
 * @fileOverview configuration form dialogs for WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
window.WeVidHere.ui.screens['screen-config'] = (function () {
	
	var firstTime = true,
	panel = null,
	ui = WeVidHere.ui,
	dom = ui.dom;
	
	/*
	 * ------------------------------------------
	 * MODEL (database) operations
	 * ------------------------------------------
	 */
	 
	 
	 /** 
	  * @method register 
	  * use user data to create a new account
	  * @return {Boolean} if registered, true, otherwise false
	  */
	 function register () {
		 console.log("in register");
		 //TODO: write this
		 return true;
	 }
	 
	 /** 
	  * @method isRegistered - check local data storage 
	  * (cookie or localStorage) for reg flag
	  */
	 function isRegistered () { 
		console.log("in isRegistered");
		//TODO: write this function
		return true; 
	 }
	 
	 /** 
	  * @method login
	  * log in using user-supplied data
	  * @return {Boolean} if logged in, true, otherwise false
	  */
	 function login () {
		 console.log("in login");
		 //TODO: write the function
		 return true;
	 }
	 
	 /** 
	  * @method isLoggedIn
	  * check to see if the user is currently logged in to the server
	  */
	 function isLoggedIn () {
		 console.log("checking isLoggedIn");
		 //TODO: write this function
		 return true;
	 }	 
	 
	 /** 
	  * @method updatePersonality
	  * change the described features of user's personality
	  */
	 function updatePersonality () {
		 console.log("checking updatePersonality");
		 //TODO: write this function
		 return true;
	 }
	 
	 /** 
	  * @method updateAvatarImage
	  * change the default image for user avatar
	  */
	 function updateAvatarImage () {
		 console.log("in updateAvatarImage");
		 //TODO: write this function
		 return true;
	 }
	 
	 /** 
	  * @method updateAvatarSound
	  * change the default sound for user avatar
	  */
	 function updateAvatarSound () {
		 console.log("in updateAvatarSound");
		 //TODO: write this function
		 return true;		 
	 }
	 
	 /** 
	  * @method toggleWebcam
	  * turn the webcam on and off
	  */
	 function toggleWebcam () {
		 console.log("in toggleWebcam");
		 //TODO: write this function
		 return true;	 
	 }
	 
	 /** 
	  * @method toggleMic
	  * turn the microphone on and off
	  */
	 function toggleMic () {
		 console.log("in toggleMic");
		 //TODO: write this function
		 return true;
	 }
	 
	 /** 
	  * @method update
	  * global update, which also takes up to the game screen
	  */
	 function updateAll () {
		 console.log("in updateAll");
	 }
	 
	 /** 
	  * @method isUpdated
	  * check if we are completely updated
	  */
	 function isUpdated () {
		 //TODO: write this function
		 console.log("checking isUpdated");
		 return true;
	 }
	 
	 
	 
	 
	/* 
	 * VIEW (screen) operations
	 */
	 
	
	/* 
	 * ------------------------------------------
	 * FUNCTIONS SHARED BY ALL OBJECTS
	 * .init(), .run()
	 * ------------------------------------------
	 */
	
	/** 
	 * @method init 
	 * initialize the screen object with its corresponding 
	 * DOM Object from the HTML
	 */
	 function init () {
	 	panel = dom.getElement('screen-config');
	 	console.log("screen-config init("+panel+")");
		firstTime = false;
	 };
	
	 function run () {
	 	console.log("screen-config run()");
		if(firstTime) {
			init();
		}
					
		console.log("making page elements invisible");
			
		//wrapper website
		dom.setVisibility('page-header', dom.userTypeList.NONE);
		dom.setVisibility('page-footer', dom.userTypeList.NONE);
		
		console.log("set reg and login screen visibility");
		
		//reg and login screen
		
		//this needs a default value
		dom.setVisibility('config-first-time', dom.userTypeList.NONE);
		
		//details of config are hidden. They can be updated independently
		
		dom.setVisibility('config-personality', dom.userTypeList.NONE);
		dom.setVisibility('config-image', dom.userTypeList.NONE);
		dom.setVisibility('config-sound', dom.userTypeList.NONE);
		dom.setVisibility('config-webcam', dom.userTypeList.NONE);
		dom.setVisibility('config-microphone', dom.userTypeList.NONE);
		dom.setVisibility('config-update', dom.userTypeList.NONE);
		
		console.log("bind reg-toggle-link");
		
		dom.bind('#reg-toggle-link', 'click', function () {
			console.log("in reg-toggle-link");
			if(dom.checkVisible('config-first-time', dom.userTypeList.ALL)) {
				dom.setVisibility('config-first-time', dom.userTypeList.NONE);
				document.getElementById('reg-login-button').innerHTML = "Login";
				document.getElementById('reg-toggle-link').innerHTML = "Register Instead";

				dom.setVisibility('config-personality', dom.userTypeList.NONE);
				dom.setVisibility('config-image', dom.userTypeList.NONE);
				dom.setVisibility('config-sound', dom.userTypeList.NONE);
				dom.setVisibility('config-webcam', dom.userTypeList.NONE);
				dom.setVisibility('config-microphone', dom.userTypeList.NONE);
				dom.setVisibility('config-update', dom.userTypeList.NONE);	
			}
			else {
				dom.setVisibility('config-first-time', dom.userTypeList.ALL);
				document.getElementById('reg-login-button').innerHTML = "Register";
				document.getElementById('reg-toggle-link').innerHTML = "Login Instead";

				dom.setVisibility('config-personality', dom.userTypeList.ALL);
				dom.setVisibility('config-image', dom.userTypeList.ALL);
				dom.setVisibility('config-sound', dom.userTypeList.ALL);
				dom.setVisibility('config-webcam', dom.userTypeList.ALL);
				dom.setVisibility('config-microphone', dom.userTypeList.ALL);								
				dom.setVisibility('config-update', dom.userTypeList.ALL);
			}
		});
		
		console.log("bind reg-login-button");
		
		dom.bind('#reg-login-button', 'click', function () {
			console.log("in reg-login-button");
			if(dom.checkVisible('config-first-time', dom.userTypeList.ALL)) {
				register();
				
			}
			else {
				//if the detailed config is visible, update
				login();
				//proceed directly to game (menu allows bringing up config later)
			}
			
			//branch on login success
			
			if(isLoggedIn()) {
				ui.setScreen('screen-game', dom.userTypeList.ALL);	
			}
			else {
				
			}
			
		});
		
		
		console.log("personality, avatar image and sound, webcam and mic buttons");
		
		dom.bind('#config-personality-button', 'click', function () {
			updatePersonality();
		});
		
		dom.bind('#config-image-button', 'click', function () {
			updateAvatarImage();
		});
		
		dom.bind('#config-sound-button', 'click', function () {
			updateAvatarSound();
		});
		
		dom.bind('#config-webcam-checkbox', 'click', function () {
			toggleWebcam();
		});
		
		dom.bind('#config-mic-checkbox', 'click', function () {
			toggleMic();
		});

		dom.bind('#config-update-all', 'click', function () {
			updateAll();
			if(isUpdated()) {
				ui.setScreen('screen-game', dom.userTypeList.ALL);
			}
		});

	 };
	return {
		init:init,
		run:run
	};
})();