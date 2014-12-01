/** 
 * ui.js
 * @fileOverview user interface (Controller) functions for WeVidHere
 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>
 * @version 1.0.0
 * @copyright 2014 Pete Markiewicz
 *
 * JSDoc after absolventa
 * @link http://devnull.absolventa.de/2014/03/25/jsdoc-and-the-revealing-module-pattern/
 */
/**
 * @namespace ui
 * @memberof WeVidHere
 * Note: this file MUST load after WeVidHere
 */
window.WeVidHere.ui = (function () {
	/* 
	 * ------------------------------------------
	 * OBJECT-SPECIFIC FUNCTIONS AND PROPERTIES
	 * ------------------------------------------
	 */
	/**
	 * @type {object}
	 * @access private
	 */	
	var doc = window.document;
	
	/** 
	 * @type {object}
	 * from main program
	 */
	var constants = WeVidHere.config;
	
	/** 
	 * @type {Object}
	 * links to JS objects associated with 
	 * each Ui screen
	 */
	var screens = [];
		
	/**
	 * @namespace dom
	 * @memberof WeVidHer.ui
	 */
	this.dom = (function () {
		/** 
		 * @enum {string}
		 */
		var userTypeList = {
			ALL: "ALL",
			ONLY_SCREENREADER: "SCREENREADER",
			ONLY_VISUAL: "VISUAL",
			NONE: "NONE"
		};
	/**
	 * @method getElement
	 * get an element, allowing id string to be passed, or the element itself
	 * simplifies DOM access.
	 * NOTE: requires that Object.toType() be defined!
	 * @param {String|Object} elem the parameter to have its type tests
	 * @returnm {Object|false} a DOMElement, or 'false' if not found
	 */
	function getElement(elem) {
		if (typeof elem == "string") {
			var e = document.getElementById(elem);
			if(!e) {
				console.log("ERROR: WeVidHere::ui::dom::getElement() - invalid element id")
				e = false; //convert null and undefined
			}
			else {
				return e; //DOM element		
			}
		
		}
		else {
			if(elem && 'nodeType' in elem) { //test if a DOM object
				return elem; //DOM Element
			}
			else {
				console.log("ERROR: getElement() unknown element:"+elem);
			}
			
		}
		return false;
	}
	
	/** 
	 * @method setVisiblity
	 * show an element, visual, visual+screenreader, botsonly, 
	 * adjust element CSS and ARIA values
	 * @param {HTMLElement|Id(string)} elem the DOM element with the class, or the id of the element
	 * @param {userTypeList} users from the enum list of user types
	 */
	 function setVisibility(elem, userType) {
		//handle either a DOM object, or the associated className string
		 elem = getElement(elem);
		 //show our user
		 switch(userType) {
		 	case userTypeList.ALL:
		 		removeClass(elem, 'visible-none');
		 		removeClass(elem, 'visible-screenreader');
		 		addClass(elem, 'visible-all');
		 		elem.setAttribute('aria-hidden', "false");
		 		elem.removeAttribute('hidden');
		 		break;
		 	case userTypeList.ONLY_SCREENREADER:
		 		removeClass(elem, 'visible-none');
		 		removeClass(elem, 'visible-all');
		 		addClass(elem, 'visible-screenreader');
		 		elem.setAttribute('aria-hidden', "false");
		 		elem.removeAttribute('hidden');
		 		break;
		 	case userTypeList.ONLY_VISUAL:
		 		removeClass(elem, 'visible-none');
		 		removeClass(elem, 'visible-screenreader');
		 		addClass(elem, 'visible-all');
		 		elem.removeAttribute('hidden');
		 		break;
		 	case userTypeList.NONE:
		 		removeClass(elem, 'visible-all');
		 		removeClass(elem, 'visible-screenreader');
		 		addClass(elem, 'visible-none');
		 		elem.setAttribute('hidden', 'hidden');
		 		break;
		 	default:
		 		console.log("unrecognized userType:" + userType);
		 		break;
		 	}
		 };
		
		/** 
		 * @method checkVisible
		 * check status of element visibility
		 * @param {HTMLElement} elem the DOM element with the class
		 * @param {Array[userType]} userType from the enum list of user types
		 * @returns {userTypeList} enumeration of possible user types
		 */
		function checkVisible(elem, userType) {
			elem = getElement(elem);
			switch(userType) {
				case userTypeList.ALL:
					if(hasClass(elem, 'visible-all')) return true; 
					break;
				case userTypeList.ONLY_SCREENREADER:
					if(elem['aria-visible'] == "true" && 
						hasClass(elem, 'visible-screenreader')) return true;
					break;
				case userTypeList.ONLY_VISUAL:
					if(elem['aria-visible'] == "false" && 
						hasClass(elem, 'visible-all')) return true; //always visible to bots
					break;
				case userTypeList.NONE:
					if(hasClass(elem, 'visible-none')) return true;
					break;
				default:
					console.log("ERROR: unknown userType:" + user);
					break;
			};
			return false;
		};
		/** 
		 * class manipulation
		 * @link http://www.openjs.com/scripts/dom/class_manipulation.php
		 */
		/** 
		 * @method addClass
		 * add a class to an element
		 * @param {HTMLElement} elem the DOM element with the class
		 * @param {String} cName CSS class name
		 */
		function addClass(elem, cName) {
			if (!hasClass(elem, cName)) elem.className += " " + cName;
			elem.className.replace(/^\s|\s$/,'')  //remove leading and trailing spaces
		};
		/** 
		 * @method removeClass
		 * remove a class from an element
		 * @param {HTMLElement} elem the DOM element with the class
		 * @param {String} cName CSS class name
		 */
		function removeClass(elem, cName) {
			if (hasClass(elem, cName)) {
				var reg = new RegExp('(\\s|^)'+cName+'(\\s|$)');
				elem.className = elem.className
				.replace(reg,' ')       //replace classname with a space
				.replace(/^\s|\s$/,'')  //remove leading and trailing spaces
				.replace(/\s+/g,' ');   //remove extra multi spaces
				}
		};
		/** 
		 * @method hasClass
		 * check if an element has a class
		 * @param {HTMLElement} elem the DOM element with the class
		 * @param {String} cName CSS class name
		 * @returns {Boolean} if element has class true, else false
		 */
		function hasClass(elem, cName) {
			elem = getElement(elem);
			if(!elem.className) return false;
			return elem.className.match(new RegExp('(\\s|^)'+cName+'(\\s|$)'));
		};
		/** 
		 * @method toggle
		 * toggle a class on and off
		 * @param {HTMLElement} elem the DOM element with the class
		 * @param {String} cName CSS class name
		 */
		function toggle(elem, cName) {
			if(hasClass(elem, cName)) {
				removeClass(elem, cName);
			}
			else {
				addClass(elem, cName);
			}
		}

		
		/** 
		 * @method classListMap 
		 * add a classList polyfill to specific DOM elements on older browsers. 
		 */
		function classListMap (elem) {
			
			if(!elem.classList) {
				elem.classList = {
					el:elem,
					remove: function (cName) {
						removeClass(el, cName);
					},
					add: function (cName) {
						addClass(el, cName);
					},
					contains: function (cName) {
						removeClass(el, cName);
					},
					toggle: function (cName) {
						toggle(elem, cName);
					}
				}
			}
		};
		
		/** 
		 * @method $
		 * querySelector wrapper
		 * assumes querySelectorAll is present
		 * @param {string} query the CSS-style query
		 * @param {HTMLElement} parent the parent HTML element we start our query with
		 * @returns {NodeList} list (array-like) of DOM elements matching css query
		 * ALTERNATE:
		 * @link https://bitbucket.org/grauw/grauw-lib/raw/default/src/selector.js
		 */
		function $(query, parent) {
			parent = parent || document;
			//console.log("parent:" + parent + " query:" + query);
			return parent.querySelectorAll(query);
		};
		
		/** 
		 * @method bind
		 * regularized bind method for binding events to DOM objects
		 * @param {DOMObject} elem dom object
		 * @param {String} event type (with no "on")
		 * @param {Function} callback the callback function
		 */
		function bind(elem, evt, callback) {
			if(typeof elem == "string") {
				//elem = getElement(elem);
				elem = $(elem)[0];
			}
			elem.addEventListener(evt, callback, false);
		};
		return {
			userTypeList:userTypeList,
			getElement:getElement,
			setVisibility:setVisibility,
			checkVisible:checkVisible,
			addClass:addClass,
			removeClass:removeClass,
			hasClass:hasClass,
			toggle:toggle,
			classListMap:classListMap,
			$:$,
			bind:bind
		};
	})(); //end of .ui.dom
	/** 
	 * .ui.snd
	 * audio style equivalents of visual DOM manipulations
	 */
	var snd = (function () {
	})();
	/** 
	 * ------------------------------------------
	 * HIGH-LEVEL UI (audio/video)
	 * ------------------------------------------
	 */
	/** 
	 * @method setScreen
	 * switch the visible screen, and run the default script for that screen
	 * @param {String|HTMLDOMElement} screenId id of a DOM Element, or the DOM 
	 * element itself
	 * @param {userType} userType the type of user (see list above in this object)
	 */
	function setScreen(screenId, userType) {
				
		//hide all screens except the one we are setting (assuming app is fully loaded)
		for(var i in screens) {
			//console.log("screenId:" + screenId + " i:" + i + " screen[i]:" + screens[i]);
			if(i !== screenId) {
				dom.setVisibility(i, dom.userTypeList.NONE);
			}
		}
		
		//handle either a DOM object, or the associated className string
		console.log("screenId:" + screenId);
		
		//run before making visible
		screens[screenId].run();
		
		//make our chosen screen visible
		dom.setVisibility(screenId, userType);
	};
	

	/** 
	 * @method waitSpinner
	 * put up a blocking spinner screen until a task is 
	 * complete, then run the callback
	 * @param {Function} testFn function to test if we're done
	 * @paran {Function} callbackFn function to call when we're finished
	 */
	function waitSpinner(testFn, callbackFn) {
	}
	/* 
	 * ------------------------------------------
	 * FUNCTIONS SHARED BY ALL OBJECTS
	 * .init(), .run()
	 * ------------------------------------------
	 */
	 function init () {
	 };
	 function run () {
	 };
	//return an object 
	return {
		dom:dom,
		snd:snd,
		screens:screens,
		setScreen:setScreen,
		init:init,
		run:run
	};
})();