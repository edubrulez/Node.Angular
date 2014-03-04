'use strict';

angular.module('imageRepositoryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'imageRepositoryApp.directives'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/users/session').success(function(user){
            if (user !== '0') {
                $timeout(deferred.resolve, 0);
            }
            else {
                $rootScope.message = 'You need to log in.';
                $timeout(function(){deferred.reject;}, 0);
                $location.url('/login');
            }
        });
    };

    $routeProvider
        .when('/', {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        })
        .when('/upload', {
            templateUrl: 'partials/upload',
            controller: 'UploadCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/register', {
            templateUrl: 'partials/register',
            controller: 'RegisterCtrl'
        })
        .otherwise({
            redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    $httpProvider.responseInterceptors.push(function($q, $location) {
        return function(promise) {
            return promise.then(
                function(response) {
                    return response;
                },
                function (response) {
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            );
        };
    });
  })
  .run(function($rootScope, $http) {
    $rootScope.message = '';

    $rootScope.logout = function() {
        $rootScope.message = 'Logged out.';
        $http.post('/logout');
    };
});
