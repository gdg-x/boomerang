angular.module('gdgXBoomerang')
.controller('COCController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(6);
    vm.chapter = Config.name;
    vm.lead = Config.lead;  
});
