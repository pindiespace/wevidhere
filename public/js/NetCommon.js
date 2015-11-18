/** 

 * NetCommon.js

 * @fileOverview common constants, variables, properties, objects shared 

 * between client and server

 * @author <a href="mailto:pindiespace@gmail.com">Pete Markiewicz</a>

 * @version 1.0.0

 * @copyright 2014 Pete Markiewicz

 * 

 * NOTE: the function is 'wrapped' in an 'exports' object whose 

 * configuration is compatible with what NodeJS needs, and can 

 * also be used by your client. On the browser, the 'common' object

 * is created. On the server, it already exists. Format follows 

 * CommonJS format.

 * 

 * @link http://caolanmcmahon.com/posts/writing_for_node_and_the_browser/

 */



/** @module common */

(function(exports){

    //test variable
    exports.debug = true;
    
    //test function
    exports.init = function () {
        console.log("in common.init function");
    }


	//the line below is required to export for the web browser


}(typeof exports === 'undefined' ? this.common = {} : exports));