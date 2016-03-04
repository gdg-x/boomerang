angular.module('gdgXBoomerang')
.controller('EventsController', function ($http, $log, $filter, Config, NavService) {
    var vm = this;
    NavService.setNavTab(2);
    vm.chapterName = Config.name;
    vm.loading = true;
    vm.dateFormat = Config.dateFormat;
    vm.events = { past:[], future:[] };

    var url = Config.HUB_IP + '/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                if (data.items[i].about) {
                    data.items[i].about =
                        data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                } else {
                    data.items[i].about = '';
                }
                vm.events.future.push(data.items[i]);
            }
            vm.events.future = $filter('orderBy')(vm.events.future, 'start', false);
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (response) {
            vm.upcomingError = 'Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.';
            vm.loading = false;
            vm.status = 'ready';
            $log.debug('Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API: ' + response);
        });

    var getPastEventsPage = function(page) {
        var url = Config.HUB_IP + '/api/v1/chapters/' + Config.id +
            '/events/past?callback=JSON_CALLBACK&page=' + page;
        var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 10000 };
        $http.jsonp(url, headers)
            .success(function (data) {
                var i;
                for (i = data.items.length - 1; i >= 0; i--) {
                    if (data.items[i].about) {
                        data.items[i].about =
                            data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                    } else {
                        data.items[i].about = '';
                    }
                    vm.events.past.push(data.items[i]);
                }
                if (data.pages === page) {
                    vm.events.past = $filter('orderBy')(vm.events.past, 'start', true);
                    vm.loading = false;
                    vm.status = 'ready';
                } else {
                    getPastEventsPage(page + 1);
                }
            })
            .error(function (response) {
                vm.pastError = 'Sorry, we failed to retrieve the past events from the GDG-X Hub API.';
                vm.loading = false;
                vm.status = 'ready';
                $log.debug('Sorry, we failed to retrieve the past events from the GDG-X Hub API: ' + response);
            });
    };
    getPastEventsPage(1);
});
