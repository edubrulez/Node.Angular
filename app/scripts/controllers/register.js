'use strict';

angular.module('imageRepositoryApp')
    .controller('RegisterCtrl', function ($scope, $rootScope, $http, $location) {
        $scope.user = {};

        $scope.register = function(){
            $http.post('/api/register', {user: $scope.user})
                .success (function(){
                    $rootScope.message = 'Registration successful!';
                    $location.url('/login');
                })
                .error(function(){
                    $rootScope.message = 'Registration failed.';
                    $location.url('/register');
                });
        };
    });

angular.module('imageRepositoryApp')
    .directive('sameAs', function($parse){
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var me = attrs.ngModel;
                var matchTo = attrs.sameAs;

                scope.$watch(me, function() {
                    ctrl.$setValidity('sameAs', $parse(me)(scope) === $parse(matchTo)(scope));
                });
                scope.$watch(matchTo, function() {
                    ctrl.$setValidity('sameAs', $parse(me)(scope) === $parse(matchTo)(scope));
                });
            }
        };

    });
