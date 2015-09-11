app.controller('SortitionModalCtrl', ['$scope', '$modalInstance', 'sortition', function ($scope, $modalInstance, sortition) {
    $scope.sortition = sortition;
    $scope.close = function() {
        $modalInstance.dismiss();
    };
}]);