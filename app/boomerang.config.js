angular.module('gdgXBoomerang')
.config(function ($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.
        when('/about', {templateUrl: 'app/about/about.html',
            controller: 'AboutController', controllerAs: 'vm'}).
        when('/conduct', {templateUrl: 'app/conduct/conduct.html',
            controller: 'ConductController', controllerAs: 'vm'}).
        when('/activities', {templateUrl: 'app/activities/activities.html',
            controller: 'ActivitiesController', controllerAs: 'vm'}).
        otherwise({ redirectTo: '/about' });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('green', {
            'default': 'A700'
        });

    $mdIconProvider.fontSet('fa', 'fontawesome');
});
