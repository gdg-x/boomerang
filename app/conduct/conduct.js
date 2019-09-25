angular.module('gdgXBoomerang')
.controller('ConductController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(2);
    vm.chapter = Config.name;
});
