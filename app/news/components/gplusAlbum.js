angular.module('gdgXBoomerang')
.directive('gplusAlbum', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusAlbum.html'
    };
});
