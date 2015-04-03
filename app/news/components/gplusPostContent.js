angular.module('gdgXBoomerang')
.directive('gplusPostContent', function () {
    return {
        transclude: true,
        templateUrl: '/app/news/components/gplusPostContent.html'
    };
});
