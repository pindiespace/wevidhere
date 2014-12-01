/** 
 * screen-help.js
 * @fileOverview user help documents for WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
 window.WeVidHere.ui.screens['screen-help'] = (function () {
	
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
	 	panel = dom.getElement('screen-help');
	 	console.log("screen-help init("+panel+")");

	 };

	 function run () {
	 	console.log("screen-help run()");
	 };

	return {
		init:init,
		run:run
	};

})();