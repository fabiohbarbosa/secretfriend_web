app.service('sortitionService', ['$http', function ($http) {
    var ENDPOINT = '/sortition';

    /**
     * Sortition friends
     * @returns $http promisse
     */
    this.sortition = function () {
        return $http.get(Util.URL_BACKEND+ENDPOINT);
    };
}]);