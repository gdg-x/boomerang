angular.module('gdgXBoomerang')
.controller('NewsController', function ($http, $timeout, $filter, $log, $sce, Config, NavService) {
    var vm = this;
    NavService.setNavTab(1);
    vm.loading = true;
    vm.chapterName = Config.name;

    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
        '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + Config.googleApi)
        .success(function (response) {
            var entries = [], i;
            var item, actor, object, itemTitle, html;
            var published, actorImage, entry;

            if (!response.items) {
                handleError('Response from server contained no news items.');
                return;
            }

            for (i = 0; i < response.items.length; i++) {
                item = response.items[i];
                actor = item.actor || {};
                object = item.object || {};
                itemTitle = object.content;
                published = $filter('date')(new Date(item.published), 'fullDate');
                html = [];

                html.push(itemTitle.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));
                html = html.join('');
                html = $sce.trustAsHtml(html);

                actorImage = actor.image.url;
                actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

                entry = {
                    via: {
                        name: 'Google+',
                        url: item.url
                    },
                    published: published,
                    body: html,
                    date: item.updated,
                    reshares: (object.resharers || {}).totalItems,
                    plusones: (object.plusoners || {}).totalItems,
                    comments: (object.replies || {}).totalItems,
                    icon: actorImage,
                    item: item,
                    object: object
                };

                entries.push(entry);
            }
            vm.news = $filter('orderBy')(entries, 'date', true);
            $timeout(function () {
                gapi.plusone.go();
            });
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(handleError);

    function handleError(error) {
        vm.desc = 'Sorry, we failed to retrieve the news from the Google+ API.';
        vm.loading = false;
        vm.status = 'ready';
        $log.debug('Sorry, we failed to retrieve the news from the Google+ API: ' + error);
    }
});
