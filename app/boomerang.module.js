var boomerang = angular.module('gdgXBoomerang', ['ngRoute', 'ngSanitize', 'ngAria', 'ngAnimate', 'ngMaterial']);

boomerang.controller('MainController', function ($rootScope, Config, NavService) {
    var mc = this;
    mc.chapter_name = Config.name;
    mc.google_plus_link = 'https://plus.google.com/' + Config.id;
    mc.gdg_link = 'https://developers.google.com/groups/chapter/' + Config.id + '/';
    mc.twitter_link = Config.twitter ? 'https://twitter.com/' + Config.twitter: null;
    mc.facebook_link = Config.facebook ? 'https://www.facebook.com/' + Config.facebook: null;
    mc.meetup_link = Config.meetup ? 'http://www.meetup.com/' + Config.meetup: null;
    $rootScope.canonical = Config.domain;

    NavService.registerNavListener(function (tab) {
        mc.navTab = tab;
    });
});
