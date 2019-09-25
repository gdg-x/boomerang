angular.module('gdgXBoomerang')
.controller('AboutController', function ($http, $sce, Config, NavService) {
    var vm = this;
    NavService.setNavTab(0);
    vm.config = Config;
});
