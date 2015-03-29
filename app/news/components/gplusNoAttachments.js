angular.module('gdgXBoomerang')
.directive('gplusNoAttachments', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusNoAttachments.html'
    };
});
