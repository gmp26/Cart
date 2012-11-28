var app = angular.module('app', ['config', 'getpath', 'functionGenerator']);

app.controller("PlotCtrl", function($scope, settings, contentPath) {
 
	var plotWidth=380;
	var plotHeight=380;

	var leftOffset=20;
	var topOffset=20;

	console.log("contentPath = " + contentPath);

	var fCompare = function(f,x,y) {
	  if(Math.abs(y-f(x)) < 1e-4) return 0;
	if(y > f(x)) return 1;
	else return -1;
	};
	
  // data to X axis 
	var toX = d3.scale.linear()
		.domain([settings.xMin, settings.xMax])
		.range([leftOffset, leftOffset+plotWidth]);
	
	// X axis to data
	var fromX = toX.invert;
	
  // data to Y axis 
	var toY = d3.scale.linear()
		.domain([settings.yMin, settings.yMax])
		.range([topOffset+plotHeight, topOffset]);

	// data from Y axis 
	var fromY = toY.invert;

  var toPlot = function(p) {
		return[toX(p[0]), toY(p[1])];
	};

  var fromPlot = function(p) {
	  return[fromX(p[0]), fromY(p[1])];
  };

	$scope.dots = settings.initialSquare();

	$scope.screenDots = $scope.dots.map(toPlot);

	var fillClasses = ["less", "equal", "more"];

	$scope.fill = function(p) {
	//var m = toModel(p);
	var m = fromPlot(p);
	var x = m[0];
	var y = m[1];
	  return fillClasses[fCompare(settings.f, x, y) + 1];
	};

	//console.debug($scope.dots);
});
 
