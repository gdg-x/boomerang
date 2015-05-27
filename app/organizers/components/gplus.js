'use strict';

angular.module('gdgXBoomerang')
.directive('gplusPerson', function ($http, $filter, Config) {
    return {
        restrict: 'EA',
        templateUrl: 'app/organizers/components/gplus_person.html',
        scope: {
            gplusId: '='
        },
        link: function (scope) {
            scope.$watch('gplusId', function (oldVal, newVal) {
                if (newVal) {
                    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + newVal +
                        '?callback=JSON_CALLBACK&fields=aboutMe%2CdisplayName%2Cimage&key=' + Config.googleApi)
                        .success(function (data) {
                            if (data && data.image && data.image.url) {
                                data.image.url = data.image.url.replace('sz=50', 'sz=170');
                            }
                            scope.person = data;
                        });
                }
            });
        }
    };
});
