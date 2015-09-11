app.controller('SortitionCtrl', ['$scope', '$modal', 'sortitionService', function ($scope, $modal, sortitionService) {
    $scope.sortition = function() {
        sortitionService.sortition().success(function(sortition) {
            createModal(sortition);
        }, function(err) {
            console.log(err);
        });
    };

    /**
     * Modal to show sortition
     * @param sortition Secret friends sortition :-)
     */
    function createModal(sortition) {
        return $modal.open({
            animation: true,
            templateUrl: 'sortition/sortition-modal.html',
            controller: 'SortitionModalCtrl',
            size: 'md',
            resolve: {
                sortition: function () {
                    return sortition;
                }
            }
        });
    }
}]);