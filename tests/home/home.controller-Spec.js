/**
 * Created by fabio on 10/09/15.
 */
describe('TestHomeCtrl', function () {

    var scope, modal;
    var controller;

    beforeEach(function () {
        module('secretfriend');
    });

    beforeEach(inject(function ($controller, $rootScope, $modal, personService) {
        scope = $rootScope.$new();
        modal = $modal;

        spyOn(modal, 'open').and.callThrough();

        controller = $controller('HomeCtrl', {
            $scope: scope,
            $modal: modal,
            personService: personService
        });
    }));

    //~--------------------------------------
    //~-- SCOPE FUNCTIONS
    //~--------------------------------------
    describe('Scope functions', function () {
        it('expect return the same value', function () {
            var test = true;

            scope.test(test);
            console.log(controller);
            expect(test).toBe(scope.test(test));
        });
    });

});