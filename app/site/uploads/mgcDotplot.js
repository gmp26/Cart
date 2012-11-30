app.directive('mgcDotplot', function factory(funcGen) {
  // define constants and helpers used for the directive
  // ...

	var dump = function(name, obj) {
		angular.forEach(obj, function(value, key) {
			console.log(name+"."+key+"="+value);
		});
	};

	var fg = funcGen;

	var link = function (scope, element, attrs) {
    // initialization, done once per my-directive tag in template. If my-directive is within an
    // ng-repeat-ed template then it will be called every time ngRepeat creates a new copy of the template.

		var f = fg.define(attrs.f);

    dump("scope", scope);
		dump("element", element);
		dump("attrs", attrs);
		console.log(fg.define(attrs.f).f);
		
		console.log(element.html());
		//element.html("foo");
		
    // whenever the bound 'exp' expression changes, execute this 
    scope.$watch('x', function (newVal, oldVal) {
      // ...
			console.log("f(x) = "+f(scope.x));
			element.html("f(x) = "+f(scope.x));
			
    });
  };

  var dirdef = {
    restrict: 'E', // the directive can be invoked only by using  tag in the template
    scope: false,
		/*{
			f: '@'
		},*/
		compile: function(tElement, tAttrs, transclude) {
			//dump("tElement", tElement);
			//dump("tAttrs", tAttrs);
			//dump("transclude", transclude);
			//tElement.html(fg.define(tAttrs.f).f);
			return link;
		}
		
    //link: link
  };

	return dirdef;
});