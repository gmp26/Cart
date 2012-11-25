'use strict';
/**
 * @see <a href="http://stackoverflow.com/questions/2161159/get-script-path">This Stack Overflow Question</a>
 */
angular.module('getpath', [], function($provide) {
    $provide.factory('contentPath', 
    function() {
        var scripts = document.getElementsByTagName('script'),
        script,
        src;

        for (var i = scripts.length - 1; i > 0; i--) {
            script = scripts[i];
            if (script.getAttribute.length !== undefined) {
                src = script.src;


            }
            else {
                src = script.getAttribute('src', -1);


            }
            if (src.indexOf('getpath') >= 0)
            return "/" + src.split('/').slice(3, -1).join('/');


        }
        throw new Error("contentPath unresolved");
    });
});