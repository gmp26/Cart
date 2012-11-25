'use strict';

angular.module('config', [], function($provide) {
    $provide.factory('settings', function() {
	    var xMin = -10;
	    var xMax = 10;
	    var yMin = -10;
	    var yMax = 10;
		
		var f = function(x) {
	      return x*x*x/100;
	    };

		var initialCount = 255; 
		
		/* rework this when you want to change the initial pettern of dots */
		function initialSquare() {
            var along = Math.round(Math.sqrt(initialCount));

            var dots = [];
            for (var i = 0; i < along; i++) {
                for (var j = 0; j < along; j++) {
                    dots.push([xMin + i * (xMax - xMin) / (along - 1), yMin + j * (yMax - yMin) / (along - 1)]);
                }
            }
            return dots;
        }
        
		function randomSquare() {
            var along = Math.sqrt(initialCount);

            var dots = [];
				
            return dots;
        }
        
        return {
			xMin: xMin,
			xMax: xMax,
			yMin: yMin,
			yMax: xMax,
			f: f,
			initialCount: initialCount,
            initialSquare: initialSquare,
			fills: {
				less: '#ECC',
				equal: '#444',
				more: '#CCE' 
			}
        };
    });
});