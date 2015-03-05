boomerang.controller('AboutControl', function ($scope, $http, $location, $sce, Config) {
    $scope.loading = true;
    $scope.$parent.navTab = 0;
    $scope.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.google_api).
        success(function (data) {
            $scope.desc = data.aboutMe;
            $sce.trustAsHtml($scope.desc);

            if (data.cover && data.cover.coverPhoto.url) {
                $scope.cover.url = data.cover.coverPhoto.url;
            }
            $scope.loading = false;
        })
        .error(function (response) {
            $scope.desc = "Sorry, we failed to retrieve the About text from the Google+ API.";
            $scope.loading = false;
            $scope.status = 'ready';
        });
});
