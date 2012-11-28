/* jasmine specs for controllers go here */

describe('functionsSpec', 
function() {

    beforeEach(module('functionGenerator'));

    var functions;
    var zero;
    var one;
    var identity1;
    var f2xPlus3;
		var poly;
		var quad;
		var cube;

    beforeEach(function() {

        inject(function($injector) {
            functions = $injector.get('functions');
            zero = functions.linear(0, 0);
            one = functions.linear(1, 0);
            identity1 = functions.linear(0,1);
            f2xPlus3 = functions.linear(2, 3);
						poly = functions.polynomial([3,2]);
						quad = functions.quadratic(-25,0,1);
        });
    });


    it('should make polynomials', function() {
				expect(functions.polynomial([3,2,1])(1)).toBe(6);
				expect(functions.polynomial([3,2,1])(2)).toBe(11);
				expect(functions.polynomial([4,3,2,1])(1)).toBe(10);
				expect(functions.polynomial([4,3,2,1])(-1)).toBe(2);
				expect(functions.polynomial([4,3,2,1])(-2)).toBe(-2);
				expect(functions.polynomial([4,3,2,1])(2)).toBe(26);
				expect(functions.polynomial([0,0,0,0,1])(3)).toBe(81);
    });

    it('should make a linear functions', function() {
        expect(zero(100)).toBe(0);
        expect(one(-100)).toBe(1);
        expect(identity1(-100)).toBe(-100);
        expect(f2xPlus3(1)).toBe(5);
				expect(poly(1)).toBe(5);
    });

		it('should make quadratics', function() {
				expect(quad(5)).toBe(0);
		});

});