angular.module('gdgXBoomerang', ['ngRoute', 'ngSanitize', 'ngAria', 'ngAnimate', 'ngMaterial'])
.controller('MainController', function ($rootScope, $mdMedia, $mdSidenav, Config, NavService) {
    var mc = this;
    mc.chapterName = Config.name;
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

angular.module('gdgXBoomerang')
.factory('Config', function () {
    return {
        // TODO Modify these to configure your app
        'name'          : 'GDG Space Coast',
        'domain'        : 'http://www.gdgspacecoast.org',
        'twitter'       : 'gdgspacecoast',
        'facebook'      : 'gdgspacecoast',
        'youtube'       : 'UCkiYHK3IZMk5XsYZ626b9Rw',
        'meetup'        : 'gdgspacecoast',
        'chapterDesc'  : 'Google Developer Group (GDG) Space Coast is a technology user group that meets to discuss the latest Google Technologies, Tools, SDKs, and APIs. We focus on learning about the broad spectrum of technologies provided by Google and finding ways that these technologies can be applied. This includes discussions of the technologies from a number of angles (startups, corporations, and individuals).', // jshint ignore:line
        // Change to 'EEEE, MMMM d, y - H:mm' for 24 hour time format.
        'dateFormat'    : 'EEEE, MMMM d, y - h:mm a',
        'cover' : {
            title: 'Worldwide GDG Events',
            subtitle: 'Directory of developer events organized by tags and displayed on a global map.',
            button: {
                text: 'Find local events',
                url: 'https://www.meetup.com/pro/gdg'
            }
        },
        'activities': {
            techTalks: true,
            codeLabs: true,
            hackathons: true,
            devFests: true,
            appClinics: true,
            panels: true,
            designSprints: true,
            roundTables: true
        }
        // To update the snippet which is used for sharing, see the TODO in the index.html.
    };
});

angular.module('gdgXBoomerang')
.factory('NavService', function () {
    var navTab = '0';
    var navListener;

    return {
        setNavTab: setNavTab,
        getNavTab: getNavTab,
        registerNavListener: registerNavListener
    };

    function setNavTab(tabValue) {
        navTab = tabValue;
        if (navListener) {
            navListener(navTab);
        }
    }

    function getNavTab() {
        return navTab;
    }

    function registerNavListener(listenerToRegister) {
        navListener = listenerToRegister;
    }
});

angular.module('gdgXBoomerang')
.controller('AboutController', function ($http, $sce, Config, NavService) {
    var vm = this;
    NavService.setNavTab(0);
    vm.config = Config;
});

angular.module('gdgXBoomerang')
.controller('ConductController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(2);
    vm.chapter = Config.name;
});

angular.module('gdgXBoomerang')
.controller('ActivitiesController', function (Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(1);
    vm.activities = [];

    var activityList = {
        techTalks: {
            name: 'Tech Talks',
            description: 'These talks are a grassroots-style series of presentation given by various ' +
                'technical experts spanning a wide spectrum of topics in technology and related areas.',
            color: 'purple',
            icon: 'app/images/icons/ic_mic_48px.svg'
        },
        roundTables: {
            name: 'Round Tables',
            description: 'Free-form, community-focused events where all attendees can raise topics for discussion.',
            color: 'darkBlue',
            icon: 'app/images/icons/ic_local_pizza_48px.svg'
        },
        codeLabs: {
            name: 'Code Labs',
            description: 'Specially prepared to provide step-by-step instructions, these events focus on ' +
                'introducing new technology and maximizing hands-on learning.',
            color: 'green',
            icon: 'app/images/icons/ic_code_48px.svg'
        },
        devFests: {
            name: 'Dev Fests',
            description: 'GDG Dev Fests are large scale, community-run events that offer speaker sessions ' +
                'across single or multiple product areas, hackathons, code labs, and more...',
            color: 'deepBlue',
            icon: 'app/images/icons/ic_event_48px.svg'
        },
        appClinics: {
            name: 'App Clinics',
            description: 'These community events bring together developers, designers, testers, and ' +
                'usability experts to evaluate specific apps with a focus on constructive criticism, ' +
                'problem solving, and collaboration.',
            color: 'yellow',
            icon: 'app/images/icons/ic_local_hospital_48px.svg'
        },
        panels: {
            name: 'Panels',
            description: 'These events bring together multiple experts on a topic. The formats can vary from ' +
                'moderator-led Q&A, debate, focused or free-form discussion, to audience Q&A.',
            color: 'lightPurple',
            icon: 'app/images/icons/ic_people_48px.svg'
        },
        hackathons: {
            name: 'Hackathons',
            description: 'Events where cross-disciplined teams collaborate intensively on specific projects ' +
                'or challenges. They often involve timed demonstrations and competition for prizes.',
            color: 'red',
            icon: 'app/images/icons/ic_timer_48px.svg'
        },
        designSprints: {
            name: 'Design Sprints',
            description: 'Intense, focused, collaborative brainstorming events where product design is key. ' +
                'Iterate through the various phases of understanding, sketching, deciding, prototyping, ' +
                'and testing.',
            color: 'pink',
            icon: 'app/images/icons/ic_directions_run_48px.svg'
        }
    };

    if (Config.activities.techTalks) {
        vm.activities.push(activityList.techTalks);
    }
    if (Config.activities.roundTables) {
        vm.activities.push(activityList.roundTables);
    }
    if (Config.activities.codeLabs) {
        vm.activities.push(activityList.codeLabs);
    }
    if (Config.activities.devFests) {
        vm.activities.push(activityList.devFests);
    }
    if (Config.activities.appClinics) {
        vm.activities.push(activityList.appClinics);
    }
    if (Config.activities.panels) {
        vm.activities.push(activityList.panels);
    }
    if (Config.activities.hackathons) {
        vm.activities.push(activityList.hackathons);
    }
    if (Config.activities.designSprints) {
        vm.activities.push(activityList.designSprints);
    }
});

// Google+ hashtag linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('hashLinky', function() {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return hashLinky(inputDOM).innerHTML;
    };

    function hashLinky(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    hashLinky(currentNode);
                    break;
                case TEXT_NODE:
                    var hashtagRegex = /#([A-Za-z0-9-_]+)/g;
                    currentNode.textContent =  currentNode.textContent.replace(hashtagRegex,
                        '<a href="https://plus.google.com/s/%23$1" target="_blank">#$1</a>');

                    linkifiedDOM.innerHTML = currentNode.textContent;
                    i += linkifiedDOM.childNodes.length - 1;

                    while (linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }
                    startNode.removeChild(currentNode);
            }
        }
        return startNode;
    }
});

// HTML-ified linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('htmlLinky', function($filter) {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return linkify(inputDOM).innerHTML;
    };

    function linkify(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    linkify(currentNode);
                    break;
                case TEXT_NODE:
                    linkifiedDOM.innerHTML = $filter('linky')(currentNode.textContent, '_blank');
                    i += linkifiedDOM.childNodes.length - 1;

                    while (linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }

                    startNode.removeChild(currentNode);
            }
        }
        return startNode;
    }
});

'use strict';

angular.module('gdgXBoomerang').directive('boomerangFooter', function() {
    return {
        templateUrl: 'app/footer/footer.html',
        restrict: 'E'
    };
});
