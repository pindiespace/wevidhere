/** 
 * screen-game.js
 * @fileOverview configuration form dialogs for WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
 window.WeVidHere.ui.screens['screen-game'] = (function () {
	
	var firstTime = true, 
	panel = null,
	navMenu = null,              //navigation menu, under the trident in header
	dom = WeVidHere.ui.dom;

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
	 	panel = dom.getElement('screen-game');
		navMenu = dom.getElement('game-nav-menu');
	 	console.log("screen-game init("+panel+")");
		console.log("about to bind hyperlinks");
		
		//deactive return submitting form (or processing)
		dom.bind(document.getElementById('search-form'), "keydown", function (evt) {
			console.log("keydown in search form");
			
			if (event.keyCode == 13) {        
				evt.cancelBubble = true;
				evt.returnValue = false;
			}
	 
		});
		
		dom.bind(panel, "click", function (evt) {
			console.log("evt.target:" + evt.target);
			
			if(evt.target.id == 'game-nav-trident') {
				//TRIDENT MENU
				console.log("TRIDENT CLICKED");
				if(dom.hasClass(navMenu, 'visible-all')) {
					dom.removeClass(navMenu, 'visible-all');
					dom.addClass(navMenu, 'visible-screenreader');
				}
				else {
					dom.removeClass(navMenu, 'visible-screenreader');
					dom.addClass(navMenu, 'visible-all');
				}
			}
			else if(evt.target.id == 'join-leave') {
				console.log("toggling join-leave for game");
			}
			else if(evt.target.id == 'video-on') {
				console.log("toggling video-on:" + evt.target.checked);
			}
			else if(evt.target.it == 'audio-on') {
				console.log("toggling audio-on:" + evt.target.checked);
			}
			else {
				if(evt.target.href) {
					var scr = evt.target.href.split("#")[1];
					console.log("LINK CLICKED, target:" + scr);
				
				/** 
				 * TODO: PROCESS PULLDOWN MENU OPTIONS HERE. We bring 
				 * up individual panels of the config screen in popup 
				 * dialogs here
				 */
				switch(scr) {
					case 'join-leave':
						break;
					case 'config-reg':  //change password
						break;
					case 'config-personality':
						break;
					case 'config-image':
						break;
					case 'config-sound':
						break;
					case 'config-webcam':
						break;
					case 'config-mic':
						break;
					case 'screen-help':
						break;
					default:
						console.log("Unknown link:" + scr);
						break;	
				}
				
				
				}
				//if poppup is open, close it
				if(dom.hasClass(navMenu, 'visible-all')) {
					dom.removeClass(navMenu, 'visible-all');
					dom.addClass(navMenu, 'visible-screenreader');
				}
			}
		}); //end of bind to menu
		firstTime = false;
	 };

	function run () {
		if(firstTime) {
			init();
		}
	 	console.log("WeVidHere::ui['screen-game'] run()");
	 };

	return {
		init:init,
		run:run
	};

})();