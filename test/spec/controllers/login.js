'use strict';

describe('Controller: LoginCtrl', function () {

    beforeEach(module('imageRepositoryApp'));

    var LoginCtrl,
        scope,
        httpBackend,
        location,
        url = '/api/login'

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($httpBackend, $controller, $rootScope, $location) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope
        });
        location = $location;
    }));

    it('should set success message for good login and redirect to the upload page',
        function() {
            httpBackend.expectPOST(url).respond(200, 'mock data');

            scope.login();

            httpBackend.flush();

            expect(scope.message).toBe('Login successful!');
            expect(location.path()).toBe('/upload');
        });

    it('should set failure message for error and stay on the login page',
        function() {
            httpBackend.expectPOST(url).respond(500, '');

            scope.login();

            httpBackend.flush();

            expect(scope.message).toBe('Login failed.');
            expect(location.path()).toBe('/login')
        });

});