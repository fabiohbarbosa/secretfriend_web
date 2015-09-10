app.service('peopleService', ['$http', function ($http) {
    var ENDPOINT = '/people';

    this.findAll = function () {
        return $http.get(Util.URL_BACKEND+ENDPOINT);
    };

    this.save = function (newPeople) {

        return $http({
            method: 'POST',
            url: Util.URL_BACKEND+ENDPOINT,
            data: newPeople,
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });

    };
}]);