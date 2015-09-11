app.controller('CreatePersonCtrl', ['$scope', '$modalInstance', 'PersonService', 'isNew', 'person', function ($scope, $modalInstance, personService, isNew, person) {

    var $controller = this;

    /**
     * Initialize received variables and scope variables
     * @param isNew
     * @param person
     */
    this.initializeVariables = function(isNew, person) {
        $scope.errorMessage = undefined;
        $scope.newPerson = person;
        $scope.isNew = isNew;

        // define title
        if (isNew) {
            $scope.title = 'Cadastrar';
        } else {
            $scope.title = 'Alterar';
        }
    };

    /**
     * Manipulate errors
     * @param err
     */
    this.fctErr = function(err) {
        if (err && err.message) {
            $scope.errorMessage = err.message;
        } else {
            $scope.errorMessage = 'Erro ao comunicar com o servidor';
        }
    };

    /**
     * Confirm function to create person
     * @param _isNew Verify if person is new
     * @param newPerson New person will be added
     */
    $scope.ok = function (_isNew, newPerson) {
        // Create
        if (_isNew) {
            personService.save(newPerson).success(function() {
                $modalInstance.close();
            }).error(function(err) {
                $controller.fctErr(err);
            });
        } else { // Update
            personService.update(newPerson).success(function() {
                $modalInstance.close();
            }).error(function(err) {
                $controller.fctErr(err);
            });
        }
    };

    /**
     * Cancel function
     */
    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    /**
     * Clean error menssage
     */
    $scope.cleanError = function() {
        $scope.errorMessage = undefined;
    };

    $controller.initializeVariables(isNew, person);

}]);