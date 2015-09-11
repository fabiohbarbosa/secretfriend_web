/**
 * Config angular routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    var route = function (url, templateUrl, controller) {
        $routeProvider.when(url, { templateUrl: templateUrl, controller: controller });
    };

    $routeProvider.otherwise({
        redirectTo: '/not_found',
        controller: function ($scope) {
            console.warn('404 Not Found');
        }
    });

    route('/', 'home/home.html');
    route('/not_found', '404.html');
}]);