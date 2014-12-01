/** 
 * screen-splash.js
 * @fileOverview configuration form dialogs for WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 */
 window.WeVidHere.ui.screens['screen-splash'] = (function () {
	
	var firstTime = true,
	panel = null,
	ui = WeVidHere.ui,
	dom = ui.dom;
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
		
	 	panel = dom.getElement('screen-splash');
		//dom.bind(panel, "click", function () {alert("hi there");}); //TODO: CORRECT LINKS
	 	//console.log("screen-splash init("+panel+")");
		 console.log("about to bind hyperlinks");
		//link the hyperlinks to open appropriate screens
		
		dom.bind(panel, "click", function (evt) {
			if(evt.target.href) {
				var scr = evt.target.href.split("#")[1];
				console.log("target:" + scr);
				
				//hide everything except the app
				
				
				//display the screen linked to by the hyperlink
				ui.setScreen(scr, dom.userTypeList.ALL);
			}
		});
		
		firstTime = false;
	 };
	/** 
	 * @method run
	 * default script whenever this screen becomes visible
	 */
	function run () {
		if(firstTime) {
			init();
		}
	 	console.log("screen-splash run()");
		
	};
	return {
		init:init,
		run:run
	};
})(); //pass it the top screen DOM element