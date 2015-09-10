app.controller('CreatePeopleCtrl', ['$scope', '$modalInstance', 'peopleService', function ($scope, $modalInstance, peopleService) {
    $scope.newPeople = {};
    $scope.ok = function (newPeople) {
        peopleService.save(newPeople).success(function(id) {
            console.log(id);
        }).error(function(err) {
            console.error(err);
        });

    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);