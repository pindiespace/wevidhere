/** 
 * Tutorial at
 * @link http://code.tutsplus.com/tutorials/testing-your-javascript-with-jasmine--net-21229
 */

describe ('my test suite', function() {

	
	beforeEach(function () {

	});
    
    it('>>>BASIC KARMA TEST', function () {
    var bob = 10;
    expect(bob).toBe(100);
    }); //this should FAIL

    it('>>>COMMON TEST', function () {
    	var phil = common;
    	expect(typeof phil).toBe("object");
    })

    afterEach(function () {
 
     });
});
