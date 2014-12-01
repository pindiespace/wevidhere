(function() {
	var oConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
	var sType;
	var aCallbacks = [];

	/** 
	 * @link http://mattsnider.com/network-information-api-polyfill/
	 * bluetooth
	 * cellular – connected via mobile network (edge, 3G, 4G, etc.)
	 * ethernet
	 * none – no internet connection
	 * wifi
	 * other – not unknown, but not one of the above either
	 * unknown – couldn’t determine connection type
	 */
	function guessType(bandwidth) {
		if (bandwidth > .5) {
			return 'ethernet';
		} 
		else if (bandwidth > .1) {
			return 'wifi';
		}
		else if(bandwidth > 0.05) {
			return 'cellular'
		}
		else if (bandwidth === 0) {
			return 'none';
    	} 
   		else {
			return 'cellular';
		}
	}
 
	// Simple function to iterate over the callbacks.
	function fnCallbackIter(fn) {
		for (var i = aCallbacks.length - 1; 0 <= i; i--) {
			fn(aCallbacks[i]);
		}
	}
 
	if (oConnection) {
		// API is available.
		if ('metered' in oConnection) {
			// Legacy API, create obfuscation polyfill.
			sType = guessType(oConnection.bandwidth);
 
			// If the bandwidth changes drastically, execute callbacks.
			oConnection.addEventListener('change', function(event) {
				var sNewType = guessType(oConnection.bandwidth);
				if (sType !== sNewType) {
					sType = sNewType;
					fnCallbackIter(function(fnCallback) {
						fnCallback.call(navigator.connection, event);
					});
				}
			});
 
			navigator.connection = {
				addEventListener: function(sName, fnCallback) {
					var bFoundCallback = false;
					if (sName === 'typechange') {
					// Assert the callback doesn't exist before appending.
					fnCallbackIter(function(fnCallbackInner) {
						if (fnCallback === fnCallbackInner) {
						bFoundCallback = true;
						}
					});

					if (!bFoundCallback) {
						console.log('1');
						aCallbacks.push(fnCallback);
					}
					} 
					else {
						// Some other event... pass through.
						oConnection.addEventListener.apply(this, arguments);
					}
				},
			
				removeEventListener: function(sName, fnCallback) {
					var aNewCallbacks = [];
					if (sName === 'typechange') {
						if (fnCallback) {
						// Create a new list of callbacks without the provided one.
							aNewCallbacks = [];
							fnCallbackIter(function(fnCallbackInner) {
								if (fnCallback !== fnCallbackInner) {
									aNewCallbacks.push(fnCallbackInner);
								}
							});
						}
						aCallbacks = aNewCallbacks;
						console.log(aCallbacks);
					} 
					else {
					// Some other event... pass through.
						oConnection.addEventListener.apply(this, arguments);
					}
				},
				type: 'unknown'
			};
		}
 
	// Don’t change the connection object.
	} 
	else {
    	//API doesn't exist, so just fill in type
		navigator.connection = {
			addEventListener: function() {},
			removeEventListener: function() {},
			checkSpeed: (function () {

				var numTests = 0, averageSpeed = 0;

				function loadTest () {
					numTests++;
					var conn = navigator.connection, 
					imgURL = "img/test2600.gif" + '?r=' + (new Date()).getTime(),
					testImage = new Image();	
					size = 2600,
					startTime = (new Date()).getTime(),
					testImage.onload = function () {
						var runTime = (new Date()).getTime() - startTime;
						conn.checkSpeed.calcSpeed(size, runTime);
						testImage = null;
					}
					testImage.src = imgURL;
				}

				function calcSpeed (size, runTime) {
					var speed = (size * 8) / (runTime * 1000);
				 	if(numTests) {
				 		averageSpeed =+ ((speed - averageSpeed) / numTests);
					}
					else {
						averageSpeed = speed;
					}
					console.log("average speed is:" + averageSpeed + " size:" + size + " runTime:" + runTime);
					navigator.connection.type = guessType(averageSpeed)
				}

				return {
					loadTest:loadTest,
					numTests:numTests,
					averageSpeed:averageSpeed,
					calcSpeed:calcSpeed
				};
			})(),
  			type: 'none'
		};

		navigator.connection.checkSpeed.loadTest();
	}

}());