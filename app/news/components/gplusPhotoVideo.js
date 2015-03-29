boomerang.directive('gplusPhotoVideo', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusPhotoVideo.html'
    };
});
