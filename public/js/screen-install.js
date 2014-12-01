/** 
 * screen-install.js
 * @fileOverview install screen for iOS (install app to desktop and 
 * use the splash screen image during loading)
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
 window.WeVidHere.ui.screens['screen-install'] = (function () {
	
	var firstTime = true,
	panel = null,
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
	 	panel = dom.getElement('screen-install');
	 	console.log("screen-install init("+panel+")");
		firstTime = false;
	 };
	 
	 /** 
	  * @method run
	  * default script whenever this screen becomes visible
	  */
	 function run (elem) {
		if(firstTime) init();
	 	console.log("screen-install run()");
	 };

	return {
		init:init,
		run:run
	};

})(); //pass it the top screen DOM element