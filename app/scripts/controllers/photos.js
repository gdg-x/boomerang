'use strict';

angular.module('boomerangApp')
  .controller('PhotosCtrl', function ($scope, $http, Config) {
        $scope.config = Config;
        $scope.photos = [];

        var pwa = 'https://picasaweb.google.com/data/feed/api/user/' + $scope.config.id + '/albumid/' + $scope.config.picasa_id +
            '?access=public&alt=json-in-script&kind=photo&max-results=50&fields=entry(link/@href,content/@src)&v=2.0&callback=JSON_CALLBACK';

        $http
            .jsonp(pwa)
            .success(function (response) {
                $scope.photos = response.feed.entry;
            });
  });
