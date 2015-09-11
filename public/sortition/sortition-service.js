app.service('SortitionService', ['$http', function ($http) {
    var ENDPOINT = '/sortition';

    /**
     * Sortition friends
     * @returns $http promisse
     */
    this.sortition = function () {
        return $http.get(Util.URL_BACKEND+ENDPOINT);
    };

    /**
     * Send e-mail after sortition
     * @param sortition Sortition people
     * @returns $http promisse
     */
    this.sendEmail = function (sortition) {
        return $http({
            method: 'PUT',
            url: Util.URL_BACKEND+ENDPOINT+'',
            data: sortition,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };


}]);