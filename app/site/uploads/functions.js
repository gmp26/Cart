angular.module('functionGenerator', [], function($provide) {
    $provide.factory('functions', function() {
	
		// takes an array of coefficients a, returning the polynomial [Sum of (a[i]*x^i) for i=0 to a.length-1]
		var polynomial = function(a) {
			return function(x) {
				return a.reduceRight(function(y0, y1) {
					console.log(y0, y1, x);
					return y0*x + y1;
				});
			};
		};

		return {
			linear: function(a,b) {return polynomial([a,b]);},
			quadratic: function(a,b,c) {return polynomial([a,b,c]);},
	
			quadratic: function(a, b, c) {
				return function(x) {
					return a*x*x + b*x + c;
				};
			},
	
			cubic: function(a, b, c, d) {
				return function(x) {
					return ((a*x + b)*x + c)*x + d;
				};
			},
			
			polynomial: polynomial
			
		};
	});
}); 