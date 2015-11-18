/** 
 * Tutorial at
 * @link http://code.tutsplus.com/tutorials/testing-your-javascript-with-jasmine--net-21229
 */

describe ('my test suite', function() {

	
	beforeEach(function () {

	});
    
    it('>>>BASIC KARMA TEST', function () {
    var bob = 10;
    expect(bob).toBe(10);
    }); //this should FAIL

    it('>>>COMMON TEST', function () {
    	expect(typeof common).toBe("object");
    });
    
    
    it('>>>COMMON EXPORT', function () {
        var phil = common;
        expect( typeof phil.init ).toBe("function");
    });

    afterEach(function () {
 
     });
});
