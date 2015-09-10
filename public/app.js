var app = angular.module('secretfriend', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    var route = function (url, templateUrl, controller) {
        $routeProvider.when(url,
            {
                templateUrl: templateUrl,
                controller: controller
            });
    };

    $routeProvider.otherwise({
        redirectTo: '/404.html',
        controller: function ($scope) {
            console.warn('404 Not Found');
        }
    });

    route('/', 'home/home.html');
}]);