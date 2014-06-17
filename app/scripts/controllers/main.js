'use strict';

angular.module('boomerangApp')
  .controller('MainCtrl', function ($scope, $http, $sce, $timeout, Config) {

        $scope.config = Config;

        $http.jsonp('https://www.googleapis.com/plus/v1/people/' + $scope.config.id +
            '?callback=JSON_CALLBACK&key=' + $scope.config.google_api).
            success(function (response) {
                console.log(response)

                $scope.chapter = response;

                $sce.trustAsHtml($scope.chapter.aboutMe);

            });

        $http
            .jsonp('https://hub.gdgx.io/api/v1/chapters/114769570436363155784?fields=organizers&callback=JSON_CALLBACK')
            .success(function(response){
                $scope.organizers = response.organizers;
                $timeout(function () {
                    gapi.person.go();
                });
            });
  });
