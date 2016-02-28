angular.module('gdgXBoomerang')
.controller('ConductController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(6);
    vm.chapter = Config.name;
});
