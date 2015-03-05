boomerang.controller("EventsControl", function ($scope, $http, Config) {
    $scope.loading = true;
    $scope.$parent.navTab = 2;

    $scope.events = {past:[] ,future:[]};
    var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                $scope.events.future.push(data.items[i]);
            }
            $scope.loading = false;
            $scope.status = 'ready';
        })
        .error(function (response) {
            $scope.upcomingError = "Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.";
            $scope.loading = false;
            $scope.status = 'ready';
        });

    var getPastEventsPage = function(page) {
        var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/past?callback=JSON_CALLBACK&page=' + page;
        var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
        $http.jsonp(url, headers)
            .success(function (data) {
                var i;
                for (i = data.items.length - 1; i >= 0; i--) {
                    data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                    $scope.events.past.push(data.items[i]);
                }
                if (data.pages === page) {
                    $scope.loading = false;
                    $scope.status = 'ready';
                } else {
                    getPastEventsPage(page + 1);
                }
            })
            .error(function (response) {
                $scope.pastError = "Sorry, we failed to retrieve the past events from the GDG-X Hub API.";
                $scope.loading = false;
                $scope.status = 'ready';
            });
    };
    getPastEventsPage(1);
});