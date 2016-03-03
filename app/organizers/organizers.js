angular.module('gdgXBoomerang')
.controller('OrganizersController', function ($http, Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(4);

    var url = Config.HUB_IP + '/api/v1/chapters/' + Config.id + '?callback=JSON_CALLBACK';
    var headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 };
    $http.jsonp(url, headers).success(function (data) {
        if (data.organizers) {
            vm.organizers = data.organizers;
        }
    });
});
