/**
 * Unit tests for Create Person Controller
 * Created by fabio on 11/09/15.
 */
describe('TestCreatePersonCtrl', function () {
    var scope, modalInstance;
    var controller, personService;
    var person;

    beforeEach(function () {
        module('secretfriend');
    });

    beforeEach(inject(function ($controller, $rootScope, PersonService) {
        scope = $rootScope.$new();
        modalInstance = {};
        personService = PersonService;

        var person = {id: 1, name: 'Test Person', email: 'test_person@test.com'};

        controller = $controller('CreatePersonCtrl', {
            $scope: scope,
            $modalInstance: modalInstance,
            personService: personService,
            isNew: true,
            person: person
        });
    }));


    describe('Initialize functions call and variables', function () {
        it('undefined errorMessage', function () {
            expect(scope.errorMessage).toBeUndefined();
        });

        it('initialize newPerson', function () {
            expect(scope.newPerson).toBeDefined();
        });

        it('initialize title', function () {
            expect(scope.title).toBeDefined();
        });
    });

    describe('Private functions', function () {
        describe('fctErr Test', function () {
            it('scope errorMessage equals err message when err message is defined', function () {
                var err = { message: 'Error message'};
                controller.fctErr(err);
                expect(scope.errorMessage).toEqual(err.message);
            });

            it('set default message in scope errMessage when err is undefined', function () {
                controller.fctErr(null);
                expect(scope.errorMessage).toBeDefined();
                expect(scope.errorMessage).not.toBeNull();
            });

            it('set default message in scope errMessage when err message is undefined', function () {
                var err = {code: 500};
                controller.fctErr(err);
                expect(scope.errorMessage).toBeDefined();
                expect(scope.errorMessage).not.toBeNull();
            });
        });

        describe('ok Test', function () {
            beforeEach(function () {
                spyOn(personService, 'save').and.callThrough();
                spyOn(personService, 'update').and.callThrough();
            });

            it('call person save when person is new', function () {
                var isNew = true;
                scope.ok(isNew, person);

                expect(personService.save).toHaveBeenCalledWith(person);
                expect(personService.update).not.toHaveBeenCalledWith(person);
            });

            it('call person update when person is not new', function () {
                var isNew = false;
                scope.ok(isNew, person);

                expect(personService.save).not.toHaveBeenCalledWith(person);
                expect(personService.update).toHaveBeenCalledWith(person);
            });

        });

        describe('cleanError Test', function () {
            it('clean error message', function () {
                scope.cleanError();
                expect(scope.errorMessage).toBeUndefined();
            });
        });

    });

});