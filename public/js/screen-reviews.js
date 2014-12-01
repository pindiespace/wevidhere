/** 
 * screen-reviews.js
 * @fileOverview reviews page for user reviews in WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
 window.WeVidHere.ui.screens['screen-reviews'] = (function () {
	
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
	 	panel = dom.getElement('screen-reviews');
	 	console.log("screen-reviews init("+panel+")");

	 };

	 function run () {
	 	console.log("screen-reviews run()");
	 };

	return {
		init:init,
		run:run
	};

})();