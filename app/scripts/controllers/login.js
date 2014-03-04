'use strict';

angular.module('imageRepositoryApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $http, $location) {
        $scope.user = {};

        $scope.login = function(){
            console.log($scope.user);

            $http.post('/users/session', $scope.user)
                .success (function(){
                    $rootScope.message = 'Login successful!';
                    $location.url('/upload');
                })
                .error(function(){
                    $rootScope.message = 'Login failed.';
                    $location.url('/login');
                });
        };
    });
