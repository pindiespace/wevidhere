/** 
 * Brownian.js
 * adapted from HTML5 animation examples
 * 
 * @link http://lamberta.github.io/html5-animation/
 * @link https://github.com/lamberta/html5-animation/blob/master/examples/ch19/01-brownian-1.html#L18
 */

var Brownian = (function () {
	
	friction = 0.95;

	/** 
	 * randomPosition
	 * generate a random position for an object in 2d space
	 */
	function randomPosition(positions, box) {
		var len = positions.length;
		if(len) {
			for(var i = 0; i < len; i++) {
				var dot = positions[i];
				dot.x = Math.random() * box.width;
        		dot.y = Math.random() * box.height;
        		dot.dx = 0;
        		dot.dy = 0;
			}; //end of for loop
		}; //end of position is valid array
	}; //end of randomPosition

	function randomMove(positions, box) {
		var len = positions.length;
		if(len) {
			for(var i = 0; i < len; i++) {
				dot.dx += Math.random() * 0.2 - 0.1;				
        		dot.dy += Math.random() * 0.2 - 0.1;
				dot.x += dot.dx;
				dot.y += dot.vy;
				dot.dx *= friction;
				dot.dy *= friction;

				//bounds for movement along x
				if (dot.x > box.width) {
					dot.x = 0;
				} 
				else if (dot.x < 0) {
					dot.x = box.width;
				}

				//bounds for movement along y
				if (dot.y > box.height) {
					dot.y = 0;
				} 
				else if (dot.y < 0) {
					dot.y = box.height;
				}

     		}; //end of for loop
    	} //end of position is valid array
	} //end of randomMove

    return {
     	randomPosition:randomPosition,
     	randomMove:randomMove
     }; //end of returned object

})();