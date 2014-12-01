/** 
 * WeVidHere.js
 * @fileOverview WeVidHere - main game object for the WeVidHere interactive application.
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 *
 * JSDoc (closure compiler reference)
 * @link https://developers.google.com/closure/compiler/docs/js-for-compiler
 * 
 * JSDoc after absolventa
 * http://devnull.absolventa.de/2014/03/25/jsdoc-and-the-revealing-module-pattern/
 * 
 * NOTE: We don't use prototypes in this app
 * 
 * 1. define WeVidHere
 * 2. define and run browser tests
 * 3. load WeVidHere objects, load() function
 * 4. Trap DOMReady event
 * 5. Trap page complete event
 * 6. run WeVidHere
 * 
 */
/**
 * @namespace WeVidHere
 */
window.WeVidHere = (window.WeVidHere || (function () {
	/** 
	 * fast lookup of document object
	 * @type Document
	 * @access public
	 * @type HTMLDocument
	 */
	var doc = window.document;
	/** 
	 @enum config
	 */
	var constants = {
		TRUE:"true",
		FALSE:"false"
	};
	/** 
	 * @enum features
	 * keeps track of loaded components of the 
	 * overall app, some may take several seconds to load
	 */
	var features = {
		app:false,
		screens:false,
		polyfills:false,
		fonts:false,
		num:0 //number of polyfills loaded
	};
	
	/* 
	 * ------------------------------------------
	 * OBJECT-SPECIFIC FUNCTIONS AND PROPERTIES
	 * ------------------------------------------
	 */
	/** 
	 *
	 */
	function isStandalone () {
		if(window.navigator.standalone === undefined) {
			console.log("standalone operation");
			return true; //trap desktops as standalone
		}
		else {
			console.log("not standalone, add install screen");
			return(!!window.navigator.standalone); //true or false for iOS
		}
	};
    
    
	/**
	 * @method DOMReady
	 * fires a callback function after the HTML is parsed, but before 
	 * images and other assets are downloaded
	 * @link http://dustindiaz.com/smallest-domready-ever
	 * other examples
	 * @link https://jonlabelle.com/snippets/view/javascript/cross-browser-document-ready
	 * @link https://gist.github.com/esfand/10058175
	 * @link https://gist.github.com/dciccale/4087856
	 * @param {Function} fn function to call when DOM is loaded
	 * @returns {Boolean} if dom is ready, return true, else false
	 */
	function DOMReady (callbackFn) {
		
		//@link http://snipplr.com/view/6029/domreadyjs/
		console.log("in WeVidHere.ready, readyState:" + document.readyState + 
			    " features.app:" + features.app + " features.screens:" + 
			    features.screens + " features.polyfills:" + features.polyfills + 
			    " features.fonts:" + features.fonts);
				
		if(document.readyState) {	
			/in/.test(document.readyState)?setTimeout(function(){DOMReady(callbackFn)}, 9):callbackFn();	
		}
		else if (window.addEventListener) {
			addEventListener('DOMContentLoaded', callbackFn, false);			
		}
		else {
			window.onload = callbackFn;
		}
	};
	
	
	/** 
	 * @method appComplete
	 * fires a callback after all assets (including fonts) have been 
	 * loaded by the application. 
	 */
	function appComplete (callbackFn) {
		console.log("Entering appComplete");
		
		//KLUDGE: so we can use it independently of DOMReady()
		if(!callbackFn) callbackFn = run;
		
		//catch old IE, which didn't report complet properly
		var oldie = !!(window.attachEvent && !window.opera);
		if(oldie) {
			try {
			 	doc.documentElement.doScroll('left');
			} catch(e) {
				setTimeout(function(){appComplete(callbackFn)}, 30)
			}
		}
		console.log("features.app:" + " features.screens:" + 
			features.screens + " features.polyfills:" + features.polyfills + 
			" features.fonts:" + features.fonts);
		
		if(!WebFont) {WebFont = {}; WebFont.done = true;}
		
		//check our all our features assigned as loaded by Modernizr.load()
		!(features.app && 
		    features.screens && 
		    features.polyfills && 
		    (WebFont && WebFont.done))?setTimeout(function(){appComplete(callbackFn)}, 30):callbackFn();
			
	}
	/** 
	 * @method load
	 * load one or more files in sequence. Different loaders can be substititued
	 * into this function as necessary
	 * @param {Array} loadArr the array of file paths to load
	 * @param {Function} the callback function to execute after load
	 */
	function load(loadArr, callback) {
		head.load(loadArr, callback);
	}
	
	/* 
	 * ------------------------------------------
	 * FUNCTIONS SHARED BY ALL OBJECTS
	 * .init(), .run()
	 * ------------------------------------------
	 */
	function init () {
		console.log("in init");
		var that = this; //refers to WeVidHere
		load([
				'js/NetCommon.js'
			], 
			function () {
				console.log("WeVidHere::load() utility libraries loaded");
				that.features.app = true;
							
			});
	
		//PART 2: load screen objects, features.screens
		load(
			[
			'js/ui.js',
			'js/screen-install.js',
			'js/screen-splash.js',
			'js/screen-config.js',
			'js/screen-game.js',
			'js/screen-help.js',
			'js/screen-exit.js',
			'js/screen-reviews.js'				
			],
			function () {
				console.log("WeVidHere::Load() screen objects loaded");
				that.features.screens = true;
			}
		);
		
		var loadPaths = [];
	
		/** 
		 * PART 3: Load additional polyfills, features.polyfills
		 * late tests (for polyfills loaded in the <head> of our index.html)
		 * - CSS Media Queries
		 * - HTML5 video polyfill (IE 8 requires it in the head)
		 * Since we loaded video in the head (before WeVidHere existed, do our test here)
		 * Modernizr test key
		 * @link https://www.browserleaks.com/modernizr
		*/
		/** 
		 * polyfills that don't need to be loaded in <head>
		 * @link http://html5polyfill.com/
		 * of our document
		 * - all CSS3
		 * - all HTML5 except database
		 * - 
		 * - touch
		 * - getusermedia
		 * - HTML5 canvas
		 * - HTML5 audio and video
		 * - JSON
		 * - HTML5 localStorage
		 * - Battery API
		 * - event-deviceorientation-motion
		 * - fullscreen API
		 * - gamepad API
		 * - network-connection
		 * - performance
		 * - requestanimationframe
		 * - vibration
		 */
		if(!Modernizr.touch) {
			features.touch = false;
			console.log("no touch events");
			features.num++;
		}
		if(!Modernizr.vibrate) {
			console.log("no vibration API");
		}
		/** 
		 * the Modernizr network connection test is wrong, so do our own, 
		 * and load a connection speed polyfill
		 * @link https://github.com/Modernizr/Modernizr/issues/1051
		 */ 
		if(!navigator.connection || (navigator.connection && navigator.connection.metered)) {
			console.log("loading connection speed polyfill");
			loadPaths.push('js/lib/networkConnectionSpeed.js');
		}
	
		if(!window.performance) {
			console.log("Performance API not supported");
		}
		
		if(!this.addEventListener) {
			console.log("loading addEventListener polyfill");
			loadPaths.push('js/lib/addEventListener.js');
			//@link https://gist.github.com/2864711/946225eb3822c203e8d6218095d888aac5e1748e
		}
		
		if(typeof document.querySelector == "undefined") {
			console.log("loading querySelector polyfill");
			loadPaths.push('js/lib/queryselector.js');
			features.queryselector = true;
			//@link http://codereview.stackexchange.com/questions/12444/queryselectorall-shim-for-non-ie-browsers
		}
		if(!Modernizr.getusermedia) {
			console.log("loading getusermedia polyfill");
			loadPaths.push('js/lib/getusermedia/getUserMedia.min.js'); 
			//@link https://github.com/addyosmani/getUserMedia.js
			features.getusermedia = true;
			features.num++;
		}
		
		if(!Modernizr.canvas) {
			console.log("loading flashcanvas polyfill");
			loadPaths.push('js/lib/flashcanvas/flashcanvas.js'); 
			//@link http://code.google.com/p/flashcanvas/
			features.canvas = true;
			features.num++;
		}
		
		if(!Modernizr.json) {
			console.log("loading JSON polyfill");
			loadPaths.push('js/lib/json3.min.js');
			//@link http://bestiejs.github.io/json3/
			features.JSON = true;
			features.num++;
		}
		
		if(!Modernizr.localstorage) {
			console.log("loading localstorage polyfill");
			loadPaths.push('js/lib/localstorage.js');
			//@link https://gist.github.com/remy/350433);
			features.localstorage = true;
			features.num++;
		}
				
		//load all polyfills
		load(
			loadPaths,
			function () {
				
				console.log("WeVidHere::load() polyfill libraries load complete");
				console.log("typeof run:" + typeof run);
				that.features.polyfills = true;
				/* 
				 * confirm our polyfills are ready before trying to run. Pass in 
				 * the features array to sidestep scope problems with setTimeout
				 */
				that.DOMReady(that.appComplete);
				//that.appComplete(that.run);
				
				} //end of part 3
			); //part 3 load
	} //end of init
	/** 
	 * @method run
	 * run our app, after initialization, and loading all libraries, and 
	 * after WeVidHere.ui.dom.domReady() is done
	 * called from Modernizr.load() outside of this object (see below)
	 */
	function run () {
		
		console.log("inWeVidHere.run");
		
		var ui = WeVidHere.ui;
		var dom = WeVidHere.ui.dom;
		
		/** 
		 * classList shims don't seem to work for old IE
		 * add a classList object to individual DOM elements manually
		 * document.documentElement
		 */
		dom.classListMap(document.documentElement);
		
		/** 
		 * all screens are loaded invisibly, so show the first screen
		 */
		if(isStandalone()) {
			ui.setScreen('screen-splash', dom.userTypeList.ALL);
		}
		else {
			ui.setScreen('screen-install', dom.userTypeList.ALL);
		}
		//NOTE: FOR OLD IE
		if(console.logshow) console.logshow();
		
	};
	//return our completed object
	return {
		constants:constants,  //shorthand for common constants
		features:features,    //what we support onthis client
		DOMReady:DOMReady,
		appComplete:appComplete,
		init:init,
		run:run               //start WeVidHere
	}; 
})());
/** 
 * LOAD OUR APP 
 */
WeVidHere.init();