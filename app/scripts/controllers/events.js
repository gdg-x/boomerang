'use strict';

angular.module('boomerangApp')
  .controller('EventsCtrl', function ($scope, $http, Config) {
    $scope.config = Config

    $scope.events = {};
        $http
            .jsonp("http://hub.gdgx.io/api/v1/chapters/"+$scope.config.id+"/events/upcoming?callback=JSON_CALLBACK")
            .success(function (response) {

                $scope.events.upcoming = response.items;

            });

        $http
            .jsonp("http://hub.gdgx.io/api/v1/chapters/"+$scope.config.id+"/events/past?callback=JSON_CALLBACK")
            .success(function (response) {

                $scope.events.past = response.items;

            });
  });
