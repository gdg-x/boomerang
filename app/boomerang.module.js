angular.module('gdgXBoomerang', ['ngRoute', 'ngSanitize', 'ngAria', 'ngAnimate', 'ngMaterial'])
.controller('MainController', function ($rootScope, $mdMedia, $mdSidenav, Config, NavService) {
    var mc = this;
    mc.chapterName = Config.name;
    mc.googlePlusLink = 'https://plus.google.com/' + Config.id;
    mc.gdgLink = 'https://developers.google.com/groups/chapter/' + Config.id + '/';
    mc.twitterLink = Config.twitter ? 'https://twitter.com/' + Config.twitter : null;
    mc.facebookLink = Config.facebook ? 'https://www.facebook.com/' + Config.facebook : null;
    mc.youtubeLink = Config.youtube ? 'https://www.youtube.com/channel/' + Config.youtube : null;
    mc.meetupLink = Config.meetup ? 'http://www.meetup.com/' + Config.meetup : null;
    $rootScope.$mdMedia = $mdMedia;
    $rootScope.$mdSidenav = $mdSidenav;
    $rootScope.canonical = Config.domain;

    NavService.registerNavListener(function (tab) {
        mc.navTab = tab;
    });
});
