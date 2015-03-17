boomerang.directive('gplusPostVideo', function ($sce) {
    return {
        link: function (scope, element) {
            scope.videoUrl = $sce.trustAsResourceUrl(scope.attachment.embed.url);
            scope.getDynamicHeight = function () {
                return (element.prop('clientWidth') * 0.6) + 'px';
            }
        },
        template: '<iframe ng-style="{ height: getDynamicHeight() }" layout layout-fill ng-src="{{ videoUrl }}" frameborder="0" allowfullscreen></iframe>'
    }
});
