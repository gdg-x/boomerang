boomerang.controller("EventsController", function ($http, Config, NavService) {
    var vm = this;
    vm.chapter_name = Config.name;
    vm.loading = true;
    NavService.setNavTab(2);

    vm.events = {past:[] ,future:[]};
    var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                vm.events.future.push(data.items[i]);
            }
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (response) {
            vm.upcomingError = "Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.";
            vm.loading = false;
            vm.status = 'ready';
        });

    var getPastEventsPage = function(page) {
        var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/past?callback=JSON_CALLBACK&page=' + page;
        var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
        $http.jsonp(url, headers)
            .success(function (data) {
                var i;
                for (i = data.items.length - 1; i >= 0; i--) {
                    data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                    vm.events.past.push(data.items[i]);
                }
                if (data.pages === page) {
                    vm.loading = false;
                    vm.status = 'ready';
                } else {
                    getPastEventsPage(page + 1);
                }
            })
            .error(function (response) {
                vm.pastError = "Sorry, we failed to retrieve the past events from the GDG-X Hub API.";
                vm.loading = false;
                vm.status = 'ready';
            });
    };
    getPastEventsPage(1);
});