/**
 * Unit tests for Home Controller
 * Created by fabio on 10/09/15.
 */
describe('TestHomeCtrl', function () {

    var scope, modal;
    var controller, personService;

    beforeEach(function () {
        module('secretfriend');
    });

    beforeEach(inject(function ($controller, $rootScope, $modal, PersonService) {
        scope = $rootScope.$new();
        modal = $modal;
        personService = PersonService;

        controller = $controller('HomeCtrl', {
            $scope: scope,
            $modal: modal,
            personService: personService
        });
    }));

    describe('Initialize functions call and variables', function () {
        it('initialize page', function () {
            expect(scope.page).toBeDefined();
        });

        it('initialize perPage', function () {
            expect(scope.perPage).toBeDefined();
        });

    });

    describe('Scope functions', function () {

        describe('Test findByNameOrEmail', function () {
            beforeEach(function () {
                spyOn(personService, 'findByNameOrEmail').and.callThrough();
            });

            it('call findByNameOrEmail when search is not empty', function () {
                var search = 'Filter';
                var page = 1;
                var perPage = 5;
                scope.findByNameOrEmail(search, page, perPage);
                expect(personService.findByNameOrEmail).toHaveBeenCalledWith(search, page, perPage);
            });

            it('not call findByNameOrEmail when search is null, but call findAll', function () {
                var search = null;
                var page = 1;
                var perPage = 5;
                scope.findByNameOrEmail(search, page, perPage);
                expect(personService.findByNameOrEmail).not.toHaveBeenCalled();
            });

            it('not call findByNameOrEmail when search is empty, but call findAll', function () {
                var search = '';
                var page = 1;
                var perPage = 5;
                scope.findByNameOrEmail(search, page, perPage);
                expect(personService.findByNameOrEmail).not.toHaveBeenCalled();
            });

            it('not call findByNameOrEmail when search is undefined, but call findAll', function () {
                var page = 1;
                var perPage = 5;
                scope.findByNameOrEmail(undefined, page, perPage);
                expect(personService.findByNameOrEmail).not.toHaveBeenCalled();
            });
        });

        describe('Test createPerson', function () {
            beforeEach(function () {
                spyOn(controller, 'createModal').and.callThrough();
            });

            it('clear message of success', function () {
                scope.createPerson();
                expect(scope.successMessage).toBeUndefined();
            });
            it('call createModal function', function () {
                scope.createPerson();
                expect(controller.createModal).toHaveBeenCalledWith(true);
            });
        });

        describe('Test editPerson', function () {
            beforeEach(function () {
                spyOn(controller, 'createModal').and.callThrough();
            });

            it('clear message of success', function () {
                var person = { id: 1 };
                scope.editPerson(person);
                expect(scope.successMessage).toBeUndefined();
            });
            it('call createModal function', function () {
                var person = { id: 1 };
                scope.editPerson(person);
                expect(controller.createModal).toHaveBeenCalledWith(false, person);
            });
        });

        describe('Test removePerson', function () {
            beforeEach(function () {
                spyOn(controller, 'confirmDialog').and.callThrough();
            });

            it('clear message of success', function () {
                var person = { id: 1 };
                scope.removePerson(person);
                expect(scope.successMessage).toBeUndefined();
            });
            it('call confirmDialog function', function () {
                var person = { id: 1 };
                scope.removePerson(person);
                expect(controller.confirmDialog).toHaveBeenCalledWith(person);
            });
        });

        describe('Test changePage', function () {
            beforeEach(function () {
                spyOn(scope, 'findByNameOrEmail').and.callThrough();
            });

            it('call findByNameOrEmail when search is not empty', function () {
                var search = 'Filter';
                var page = 1;
                var perPage = 5;
                scope.changePage(search, page, perPage);
                expect(scope.findByNameOrEmail).toHaveBeenCalledWith(search, page, perPage);
            });

            it('not call findByNameOrEmail when search is null, but call findAll', function () {
                var search = null;
                var page = 1;
                var perPage = 5;
                scope.changePage(search, page, perPage);
                expect(scope.findByNameOrEmail).not.toHaveBeenCalled();
            });

            it('not call findByNameOrEmail when search is empty, but call findAll', function () {
                var search = '';
                var page = 1;
                var perPage = 5;
                scope.changePage(search, page, perPage);
                expect(scope.findByNameOrEmail).not.toHaveBeenCalled();
            });
            it('not call findByNameOrEmail when search is undefined, but call findAll', function () {
                var page = 1;
                var perPage = 5;
                scope.changePage(undefined, page, perPage);
                expect(scope.findByNameOrEmail).not.toHaveBeenCalled();
            });

        });

    });

});