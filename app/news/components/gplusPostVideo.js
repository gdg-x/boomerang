angular.module('gdgXBoomerang')
.directive('gplusPostVideo', function ($sce) {
    return {
        link: function (scope, element) {
            scope.videoUrl = $sce.trustAsResourceUrl(scope.attachment.embed.url);
            scope.getDynamicHeight = function () {
                return (element.prop('clientWidth') * 0.6) + 'px';
            };
        },
        templateUrl: '/app/news/components/gplusPostVideo.html'
    };
});
