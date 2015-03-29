angular.module('gdgXBoomerang')
.directive('gplusEvent', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusEvent.html'
    };
});
