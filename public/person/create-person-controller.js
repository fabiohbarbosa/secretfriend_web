app.controller('CreatePersonCtrl', ['$scope', '$modalInstance', 'personService', 'isNew', 'person', function ($scope, $modalInstance, personService, isNew, person) {

    // initialize variables
    $scope.errorMessage = '';
    $scope.newPerson = person;

    // define title
    if (isNew) {
        $scope.title = 'Cadastrar';
    } else {
        $scope.title = 'Alterar';
    }

    /**
     * Manipulate errors
     * @param err
     */
    function fctErr(err) {
        if (err && err.message) {
            $scope.errorMessage = err.message;
            console.error(err);
        } else {
            $scope.errorMessage = 'Error ao comunicar com o servidor';
            console.error($scope.errorMessage);
        }
    }

    /**
     * Confirm function to create person
     * @param newPerson New person will be added
     */
    $scope.ok = function (newPerson) {
        // Create
        if (isNew) {
            personService.save(newPerson).success(function() {
                $modalInstance.close();
            }).error(function(err) {
                fctErr(err);
            });
        } else { // Update
            personService.update(newPerson).success(function() {
                $modalInstance.close();
            }).error(function(err) {
                fctErr(err);
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

}]);