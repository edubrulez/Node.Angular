'use strict';

angular.module('imageRepositoryApp')
    .controller('UploadCtrl', function ($scope, $http) {
        $scope.image = {};

        $scope.upload = function(){
            $http.post('/api/images/upload', {image: $scope.image}).success (function(images){
                    $scope.image = images;
                });
        };
    });
