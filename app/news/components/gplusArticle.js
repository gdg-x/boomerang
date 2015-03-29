boomerang.directive('gplusArticle', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusArticle.html'
    };
});
