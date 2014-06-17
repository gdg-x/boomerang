'use strict';

angular
  .module('boomerangApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl'
      })
      .when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      })
      .when('/photos', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .factory('Config', function () {
        return {
            'date_format' : 'EEE MMM d, yyyy h:mm a',
            'google_api' : 'AIzaSyA9ALjr2iWvhf3Rsz9-bH0cEcDcrdkpuAg',
            'id' : '114769570436363155784',
            'picasa_id' : '5846413253595166705'
        }
    });
