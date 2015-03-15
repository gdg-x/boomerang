var boomerang = angular.module('gdgBoomerang', ['ngRoute', 'ngSanitize', 'ngAria', 'ngAnimate', 'ngMaterial']);

boomerang.controller('MainController', function ($rootScope, Config, NavService) {
    var mc = this;
    mc.chapter_name = Config.name;
    mc.google_plus_link = 'https://plus.google.com/' + Config.id;
    mc.isNavCollapsed = true;
    $rootScope.canonical = Config.domain;

    NavService.registerNavListener(function (tab) {
        mc.navTab = tab;
    });
});
