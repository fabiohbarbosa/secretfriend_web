app.controller('HomeCtrl', ['$scope', '$modal', 'personService', function ($scope, $modal, personService) {

    /**
     * ------------------------------------------------------------------
     * PRIVATE FUNCTIONS
     * ------------------------------------------------------------------
     */

    /**
     * Modal to create person
     * @param isNew Verify if is create or update
     * @param person Person object
     */
    function createModal(isNew, person) {
        return $modal.open({
            animation: true,
            templateUrl: 'person/create-person.html',
            controller: 'CreatePersonCtrl',
            size: 'sm',
            resolve: {
                isNew: function() {
                    return isNew;
                },
                person: function () {
                    return person;
                }
            }
        });
    }

    /**
     * Confirm dialog for remove person
     * @param person Person object
     */
    function confirmDialog(person) {
        var message = 'Tem certeza que deseja remover '+person.name+' ?';

        var okFunction = function () {
            personService.delete(person.id).success(function () {
                findAll(1, itensPerPage); // keeping on the same page listing
            }, function (err) {
                console.log(err);
            });
        };

        var cancelFunction;

        return $modal.open({
            animation: true,
            templateUrl: 'components/confirm-dialog/confirm-dialog.html',
            controller: 'ConfirmDialogCtrl',
            size: 'sm',
            resolve: {
                message: function () {
                    return message;
                },
                okFunction: function () {
                    return okFunction;
                },
                cancelFunction: function () {
                    return cancelFunction;
                }
            }
        });
    }

    /**
     * Find all people
     */
    function findAll(page, perPage) {
        personService.findAll(page, perPage).success(function (data) {
            $scope.allPeople = data.people; // using to show sortition button
            $scope.people = data.people;
            $scope.totalRegister = data.totalRegister;
        }).error(function (err) {
            if (err && err.message) {
                $scope.errorMessage = err.message;
                console.error(err);
            } else {
                $scope.errorMessage = 'Error ao comunicar com o servidor';
                console.error($scope.errorMessage);
            }
        });
    }

    /**
     * ------------------------------------------------------------------
     * SCOPE FUNCTIONS
     * ------------------------------------------------------------------
     */

    /**
     * Find people by name or email
     * @param search Name or email
     */
    $scope.findByNameOrEmail = function(search) {
        personService.findByNameOrEmail(search).success(function(people) {
            $scope.people = people;
        }, function(err) {
            console.log(err);
        });
    };

    /**
     * Open modal to create person
     */
    $scope.createPerson = function() {
        $scope.successMessage = '';
        createModal(true).result.then(function() {
            findAll(1, itensPerPage); // go to the first page beause have a new person
            $scope.successMessage = 'Usuário criado com sucesso';
        }, function(err) {
            console.log(err);
        });
    };

    /**
     * Open confirm modal to delete person
     * @param person Person object
     */
    $scope.editPerson = function(person) {
        $scope.successMessage = '';
        createModal(false, person).result.then(function() {
            findAll($scope.page, itensPerPage); // keeping on the same page listing
            $scope.successMessage = 'Usuário alterado com sucesso';
        }, function(err) {
            console.log(err);
        });
    };

    /**
     * Remove person function
     * @param person Person object
     */
    $scope.removePerson = function(person) {
        $scope.successMessage = '';
        confirmDialog(person).result.then(function() {
            $scope.successMessage = 'Usuário removido com sucesso';
        }, function(err) {
            console.log(err);
        });
    };

    // Pageable
    var itensPerPage = 5;
    $scope.itensPerPage = itensPerPage;
    /**
     * Page changed
     */
    $scope.pageChanged = function(currentPage) {
        $scope.page = currentPage;
        findAll($scope.page, itensPerPage);
    };

    // init function
    findAll(1, itensPerPage);
}]);