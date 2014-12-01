/** 
 * screen-exit.js
 * @fileOverview quit screen for the WeVidHere app
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
window.WeVidHere.ui.screens['screen-exit'] = (function () {
	
	var panel = null,
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
	 	panel = dom.getElement('screen-exit');
	 	console.log("screen-exit init("+panel+")");
	 };

	 function run () {
	 	console.log("screen-exit run()");
	 };

	return {
		init:init,
		run:run
	};

})();