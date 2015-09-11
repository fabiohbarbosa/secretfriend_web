app.service('personService', ['$http', function ($http) {
    var ENDPOINT = '/person';

    /**
     * Find all people
     * @param page Page
     * @param perPage Registers per page
     * @returns $http promisse
     */
    this.findAll = function (page, perPage) {
        var newPage = page-1;
        return $http.get(Util.URL_BACKEND+ENDPOINT+'?page='+newPage+'&perPage='+perPage);
    };

    this.findByNameOrEmail = function(search) {
        return $http.get(Util.URL_BACKEND+ENDPOINT+'/advanced_search?search='+search);
    };

    /**
     * Save person
     * @param newPerson
     * @returns $http promisse
     */
    this.save = function (newPerson) {
        return $http({
            method: 'POST',
            url: Util.URL_BACKEND+ENDPOINT,
            data: newPerson,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    /**
     * Update person
     * @param person Existing person
     * @returns $http promisse
     */
    this.update = function (person) {
        return $http({
            method: 'PUT',
            url: Util.URL_BACKEND+ENDPOINT,
            data: person,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    /**
     * Delete person by id
     * @param id Person id
     * @returns $http promisse
     */
    this.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: Util.URL_BACKEND+ENDPOINT+'/'+id
        });
    };

}]);