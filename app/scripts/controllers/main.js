'use strict';

angular.module('boomerangApp')
  .controller('MainCtrl', function ($scope, $http, $sce, Config) {

        $scope.config = Config;

        $http.jsonp('https://www.googleapis.com/plus/v1/people/' + $scope.config.id +
            '?callback=JSON_CALLBACK&key=' + $scope.config.google_api).
            success(function (response) {
                console.log(response)

                $scope.chapter = response;

                $scope.chapter.image.url = $scope.chapter.image.url + '&sz=100';

                $sce.trustAsHtml($scope.chapter.aboutMe);

            });
  });
