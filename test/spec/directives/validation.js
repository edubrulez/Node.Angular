'use strict';

describe('Directive: sameAs', function() {
    var $scope, form;

    beforeEach(module('imageRepositoryApp.directives'));

    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
                '<input ng-model="model.something" name="something" />' +
                '<input ng-model="model.otherthing" name="otherthing" same-as="model.something" />' +
            '</form>'
        );
        $scope.model = { something: null, otherthing: null }
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;
    }));

    describe('sameAs', function() {
        it('should pass since things are the same', function() {
            form.something.$setViewValue('123abc');
            form.otherthing.$setViewValue('123abc');
            $scope.$digest();

            expect(form.otherthing.$valid).toBe(true);
        });

        it('should not pass when things are different', function() {
            form.something.$setViewValue('123abc');
            form.otherthing.$setViewValue('789xyz');
            $scope.$digest();

            expect(form.otherthing.$valid).toBe(false);
        });
    });
});