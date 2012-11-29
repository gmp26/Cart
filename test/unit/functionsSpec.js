/* jasmine specs for controllers go here */

describe('functionsSpec', 
function() {

    beforeEach(module('functionGenerator'));

    var functions;

    beforeEach(function() {

        inject(function($injector) {
            functions = $injector.get('functions');
        });
    });

    it('should make polynomials', function() {
				expect(functions.poly(1,2,3)(1)).toBe(6);
				expect(functions.poly(1,2,3)(2)).toBe(11);
				expect(functions.poly(1,2,3,4)(1)).toBe(10);
				expect(functions.poly(1,2,3,4)(-1)).toBe(2);
				expect(functions.poly(1,2,3,4)(-2)).toBe(-2);
				expect(functions.poly(1,2,3,4)(2)).toBe(26);
				expect(functions.poly(1,0,0,0,0)(3)).toBe(81);
    });

    it('should make a linear functions', function() {
        expect(functions.poly(0, 0)(100)).toBe(100*0);
        expect(functions.poly(0,1)(-100)).toBe(-100*0+1);
        expect(functions.poly(1,0)(-100)).toBe(-100*1 + 0);
				expect(functions.poly(2,3)(1)).toBe(2*1+3);
    });

		it('should make quadratics', function() {
				expect(functions.poly(1,6,-25)(5)).toBe(30);
		});

		it('should make rational functions', function() {
			expect(functions.rational(3,2)(2,3)(4)).toBe((3*4+2)/(2*4+3));
			expect(functions.rational(3,2)(2,3)(1)).toBe((3*1+2)/(2*1+3));
		});

		xit('could make chainable functions', function() {
			// but it doesn't!
			console.log(typeof(Math.sin));
			var f = functions.poly(Math.sin); 
			expect(f(0)(Math.PI/2)).toBe(1);
		});
		
		it('should create functions from js definitions', function() {
			expect(functions.define('x,y -> x*y')(3,4)).toBe(12);
			expect(functions.define('a,b,x -> a*x+b')(3,4,5)).toBe(19);
			expect(functions.define('(a,b,x) -> a*x+b')(3,4,5)).toBe(19);
			
			expect(
				Math.abs(
					functions.define('x -> Math.sin(x)')(Math.PI/6) - 0.5
				) < 1e-6
			).toBe(true);
		});
		
		it('should insert \'Math.\' before maths functions', function() {
			var rf = functions.define('x -> sin(x)*cos(x)');
			expect(rf.f.toString()).toBe('Math.sin(x)*Math.cos(x)');
		});

		it('should replace repeated functions and PI', function() {
			var rf = functions.define('x -> sin(x)*sin(PI)');
			expect(rf.f.toString()).toBe('Math.sin(x)*Math.sin(Math.PI)');
		});
/*
		.replace(/LOG2E/g, 'Math.LOG2E')
		.replace(/LOG10E/g, 'Math.LOG10E')
		.replace(/SQRT1_2/g, 'Math.SQRT1_2')
		.replace(/SQRT2/g, 'Math.SQRT2')
		.replace(/E/g, 'Math.E')
	*/	
		it('should cover these Math functions', function() {
			expect(functions.define('x -> asin(x)').f).toBe('Math.asin(x)');
			expect(functions.define('x -> acos(x)').f).toBe('Math.acos(x)');
			expect(functions.define('x -> atan(x)').f).toBe('Math.atan(x)');
			expect(functions.define('x -> sin(x)').f).toBe('Math.sin(x)');
			expect(functions.define('x -> cos(x)').f).toBe('Math.cos(x)');
			expect(functions.define('x -> tan(x)').f).toBe('Math.tan(x)');
			expect(functions.define('x -> sinh(x)').f).toBe('Math.sinh(x)');
			expect(functions.define('x -> cosh(x)').f).toBe('Math.cosh(x)');
			expect(functions.define('x -> tanh(x)').f).toBe('Math.tanh(x)');
			expect(functions.define('x -> exp(x)').f).toBe('Math.exp(x)');
			expect(functions.define('x -> log(x)').f).toBe('Math.log(x)');
			expect(functions.define('x -> ceil(x)').f).toBe('Math.ceil(x)');
			expect(functions.define('x -> floor(x)').f).toBe('Math.floor(x)');
			expect(functions.define('x -> round(x)').f).toBe('Math.round(x)');
			expect(functions.define('x -> sqrt(x)').f).toBe('Math.sqrt(x)');
			expect(functions.define('x -> abs(x)').f).toBe('Math.abs(x)');
			expect(functions.define('x -> atan2(x)').f).toBe('Math.atan2(x)');
			expect(functions.define('x -> PI').f).toBe('Math.PI');
			expect(functions.define('x -> LN2').f).toBe('Math.LN2');
			expect(functions.define('x -> LN10').f).toBe('Math.LN10');
			expect(functions.define('x -> LOG2E').f).toBe('Math.LOG2E');
			expect(functions.define('x -> LOG10E').f).toBe('Math.LOG10E');
			expect(functions.define('x -> SQRT1_2').f).toBe('Math.SQRT1_2');
			expect(functions.define('x -> SQRT2').f).toBe('Math.SQRT2');
		});
		
});