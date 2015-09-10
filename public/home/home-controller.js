app.controller('HomeCtrl', ['$scope', '$modal', 'peopleService', function ($scope, $modal, peopleService) {

    $scope.createModal = function() {
        return $modal.open({
            animation: true,
            templateUrl: 'people/create-people.html',
            controller: 'CreatePeopleCtrl',
            size: 'sm'
        });
    };

    function loadController() {
        peopleService.findAll().success(function (peoples) {
            console.log(peoples);
        }).error(function (err) {
            console.error(err);
        });
    }

    loadController();
}]);