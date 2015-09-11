app.controller('HomeCtrl', ['$scope', '$modal', 'personService', function ($scope, $modal, personService) {
    /**
     * ------------------------------------------------------------------
     * PRIVATE FUNCTIONS
     * ------------------------------------------------------------------
     */
    var $controller = this; // using to unit test

    /**
     * Modal to create person
     * @param isNew Verify if is create or update
     * @param person Person object
     */
    this.createModal = function(isNew, person) {
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
    };

    /**
     * Confirm dialog for remove person
     * @param person Person object
     */
    this.confirmDialog = function(person) {
        var message = 'Tem certeza que deseja remover '+person.name+' ?';

        var okFunction = function () {
            personService.delete(person.id).success(function () {
                $controller.findAll(1, perPage); // keeping on the same page listing
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
    };

    /**
     * Find all people
     */
    this.findAll = function(page, perPage) {
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
    };

    /**
     * ------------------------------------------------------------------
     * SCOPE FUNCTIONS
     * ------------------------------------------------------------------
     */

    /**
     * Find people by name or email
     * @param search Name or email
     * @param page Page
     * @param perPage Register per page
     */
    $scope.findByNameOrEmail = function(search, page, perPage) {
        if (search) {
            personService.findByNameOrEmail(search, page, perPage).success(function(data) {
                $scope.allPeople = data.people; // using to show sortition button
                $scope.people = data.people;
                $scope.totalRegister = data.totalRegister;
            }, function(err) {
                console.log(err);
            });
        } else {
            $controller.findAll(page, perPage); // if search is null or empty, find all
        }
    };

    /**
     * Open modal to create person
     */
    $scope.createPerson = function() {
        $scope.successMessage = '';
        $controller.createModal(true).result.then(function() {
            $controller.findAll(1, perPage); // go to the first page beause have a new person
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
        $controller.createModal(false, person).result.then(function() {
            $controller.findAll($scope.page, perPage); // keeping on the same page listing
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
        $controller.confirmDialog(person).result.then(function() {
            $scope.successMessage = 'Usuário removido com sucesso';
        }, function(err) {
            console.log(err);
        });
    };

    // Pageable
    var perPage = 5;
    $scope.perPage = perPage;
    /**
     * Page changed
     */
    $scope.pageChanged = function(currentPage, search) {
        $scope.page = currentPage;
        if (search) {
            $scope.findByNameOrEmail(search, $scope.page, perPage);
        } else {
            $controller.findAll($scope.page, perPage);    
        }
    };

    $scope.test = function(test) {
        return test;
    };

    // init function
    $controller.findAll(1, perPage);
}]);