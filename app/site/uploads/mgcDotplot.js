app.directive('mgcDotplot', function factory(funcGen, settings) {
  // define constants and helpers used for the directive
  // ...
  'use strict';
  
	var dump = function(name, obj) {
		angular.forEach(obj, function(value, key) {
			console.log(name+"."+key+"="+value);
		});
	};

	var fg = funcGen;

	var fillClasses = ["less", "equal", "more"];

	var fill = function(p, f) {
		var x = p[0];
		var y = p[1];
		return fillClasses[fCompare(f, x, y) + 1];
	};

	var fCompare = function(f, x, y) {
			if (Math.abs(y - f(x)) < 1e-4) return 0;
			if (y > f(x)) return 1;
			else return -1;
		};

	var plotWidth = 380;
	var plotHeight = 380;

	var leftOffset = 20;
	var topOffset = 20;

	var toPlot = function(p) {
			return [toX(p[0]), toY(p[1])];
		};
		
	var fromPlot = function(p) {
			return [fromX(p[0]), fromY(p[1])];
		};

	// data to X axis 
	var toX = d3.scale.linear().domain([settings.xMin, settings.xMax]).range([leftOffset, leftOffset + plotWidth]);

	// X axis to data
	var fromX = toX.invert;

	// data to Y axis 
	var toY = d3.scale.linear().domain([settings.yMin, settings.yMax]).range([topOffset + plotHeight, topOffset]);

	// data from Y axis 
	var fromY = toY.invert;

	var redraw = function(dot, element, f) {
		var pot = toPlot(dot); 
		element.addClass("dot");
		element.removeClass("more less equal");
		element.addClass(fill(dot, f));
		element.css({left:pot[0]+"px",top:pot[1]+"px"});
	};

  return {
    restrict: 'E', // the directive can be invoked only by using  tag in the template
    scope: false,
	link: function (scope, element, attrs) {

		var f = fg.define(scope.f);

		scope.$watch('f', function(newVal, oldVal) {
			//console.log("newVal="+f);
			try {
				f = fg.define(scope.f);
				redraw(scope.dot, element, f);
			}
			catch(e) {}
		});

		scope.$watch('x', function (newVal, oldVal) {
				var pot = toPlot(scope.dot); 
				element.addClass("dot");
				element.addClass(fill(scope.dot, f));
				element.css({left:pot[0]+"px",top:pot[1]+"px"});
		});
	}
  };
});