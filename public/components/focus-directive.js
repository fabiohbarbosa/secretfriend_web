/**
 * Focus directive
 */

app.directive('focusMe', [function($timeout, $parse) {
    return {
        link: ['scope', 'element', 'attrs', function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    }, 200);
                }
            });
        }
    ]};
}]);