angular.module('gdgXBoomerang')
.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.
        when('/about', {templateUrl: 'app/about/about.html', controller: 'AboutController', controllerAs: 'vm'}).
        when('/news', {templateUrl: 'app/news/news.html', controller: 'NewsController', controllerAs: 'vm'}).
        when('/events', {templateUrl: 'app/events/events.html', controller: 'EventsController', controllerAs: 'vm'}).
        when('/photos', {templateUrl: 'app/photos/photos.html', controller: 'PhotosController', controllerAs: 'vm'}).
        otherwise({ redirectTo: '/about' });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});
