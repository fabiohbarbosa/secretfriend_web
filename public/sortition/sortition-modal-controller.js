app.controller('SortitionModalCtrl', ['$scope', '$modalInstance', '$modal', 'sortition', 'sortitionService', function ($scope, $modalInstance, $modal, sortition, sortitionService) {
    $scope.sortition = sortition;

    $controller = this;

    /**
     * Send e-mail after sortition
     * @param sortition
     */
    $scope.sendEmail = function() {
        $controller.confirmDialog();
    };

    /**
     * Confirm dialog for send e-mail
     */
    this.confirmDialog = function() {
        var message = 'Tem certeza que deseja enviar os e-mails?';

        var okFunction = function () {
            sortitionService.sendEmail(sortition).success(function() {
                $scope.successMessage = 'E-mail enviado com sucesso';
            }, function(err) {
                $scope.errorMessage = 'Erro ao enviar e-mail';
                console.error(err);
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
     * Close modal
     */
    $scope.close = function() {
        $modalInstance.dismiss();
    };
}]);