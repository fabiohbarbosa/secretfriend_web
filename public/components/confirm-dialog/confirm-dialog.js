app.controller('ConfirmDialogCtrl', ['$scope', '$modalInstance', 'message', 'okFunction', 'cancelFunction', function ($scope, $modalInstance, message, okFunction, cancelFunction) {

    // initialize values
    $scope.message = message;

    /**
     * Confirm function
     */
    $scope.ok = function () {
        if (okFunction) {
            okFunction();
        }
        $modalInstance.close();
    };

    /**
     * Cancel function
     */
    $scope.cancel = function () {
        if (cancelFunction) {
            cancelFunction();
        }
        $modalInstance.dismiss();
    };
}]);