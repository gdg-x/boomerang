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

boomerang.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.
        when("/about", {templateUrl: 'app/about/about.html', controller: "AboutController", controllerAs: 'vm'}).
        when("/news", {templateUrl: 'app/news/news.html', controller: "NewsController", controllerAs: 'vm'}).
        when("/events", {templateUrl: 'app/events/events.html', controller: "EventsController", controllerAs: 'vm'}).
        when("/photos", {templateUrl: 'app/photos/photos.html', controller: "PhotosController", controllerAs: 'vm'}).
        otherwise({ redirectTo: '/about' });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});

boomerang.factory('Config', function () {
    return {
        // Modify these to configure your app
        'name'          : 'GDG Space Coast',
        'id'            : '103959793061819610212',
        'google_api'    : 'AIzaSyA9ALjr2iWvhf3Rsz9-bH0cEcDcrdkpuAg',
        'pwa_id'        : '5915725140705884785', // Picasa Web Album id, must belong to Google+ id above
        'domain'        : 'http://www.gdgspacecoast.org',
        'cover' : {
            title: 'GDG Events Worldwide',
            subtitle: 'Worldwide directory of developer events organized by tags and displayed on a map.',
            button: {
                text: 'Find local events',
                url: 'http://gdg.events/'
            }
        }
    };
});

boomerang.factory('NavService', function () {
    var navTab = '0';
    var navListener;

    return {
        setNavTab: setNavTab,
        getNavTab: getNavTab,
        registerNavListener: registerNavListener
    };

    function setNavTab(tabValue) {
        navTab = tabValue;
        navListener(navTab);
    }

    function getNavTab() {
        return navTab;
    }

    function registerNavListener(listenerToRegister) {
        navListener = listenerToRegister;
    }
});

boomerang.controller('AboutController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(0);
    vm.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.google_api).
        success(function (data) {
            vm.desc = data.aboutMe;
            $sce.trustAsHtml(vm.desc);

            if (data.cover && data.cover.coverPhoto.url) {
                vm.cover.url = data.cover.coverPhoto.url;
            }
            vm.loading = false;
        })
        .error(function (response) {
            vm.desc = "Sorry, we failed to retrieve the About text from the Google+ API.";
            vm.loading = false;
            vm.status = 'ready';
        });
});

boomerang.controller("EventsController", function ($http, $log, $filter, Config, NavService) {
    var vm = this;
    NavService.setNavTab(2);
    vm.chapter_name = Config.name;
    vm.loading = true;
    vm.events = { past:[], future:[] };

    var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 2000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                vm.events.future.push(data.items[i]);
            }
            vm.events.future = $filter('orderBy')(vm.events.future, 'start', false);
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (response) {
            vm.upcomingError = "Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.";
            vm.loading = false;
            vm.status = 'ready';
            $log.debug('Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API: ' + response);
        });

    var getPastEventsPage = function(page) {
        var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/past?callback=JSON_CALLBACK&page=' + page;
        var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
        $http.jsonp(url, headers)
            .success(function (data) {
                var i;
                for (i = data.items.length - 1; i >= 0; i--) {
                    data.items[i].about = data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                    vm.events.past.push(data.items[i]);
                }
                if (data.pages === page) {
                    vm.events.past = $filter('orderBy')(vm.events.past, 'start', true);
                    vm.loading = false;
                    vm.status = 'ready';
                } else {
                    getPastEventsPage(page + 1);
                }
            })
            .error(function (response) {
                vm.pastError = "Sorry, we failed to retrieve the past events from the GDG-X Hub API.";
                vm.loading = false;
                vm.status = 'ready';
                $log.debug('Sorry, we failed to retrieve the past events from the GDG-X Hub API: ' + response);
            });
    };
    getPastEventsPage(1);
});

// Google+ hashtag linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
boomerang.filter('hashLinky', function() {
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
boomerang.filter('htmlLinky', function($filter) {
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

boomerang.controller("NewsController", function ($http, $timeout, $filter, $log, $sce, Config, NavService) {
    var vm = this;
    NavService.setNavTab(1);
    vm.loading = true;
    vm.chapter_name = Config.name;

    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
        '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + Config.google_api)
        .success(function (response) {
            var entries = [], i;
            var item, actor, object, itemTitle, html;
            var published, actorImage, entry;

            for (i = 0; i < response.items.length; i++) {
                item = response.items[i];
                actor = item.actor || {};
                object = item.object || {};
                itemTitle = object.content;
                published = $filter('date')(new Date(item.published), 'fullDate');
                html = [];

                html.push(itemTitle.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));
                html = html.join('');
                html = $sce.trustAsHtml(html);

                actorImage = actor.image.url;
                actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

                entry = {
                    via: {
                        name: 'Google+',
                        url: item.url
                    },
                    published: published,
                    body: html,
                    date: item.updated,
                    reshares: (object.resharers || {}).totalItems,
                    plusones: (object.plusoners || {}).totalItems,
                    comments: (object.replies || {}).totalItems,
                    icon: actorImage,
                    item: item,
                    object: object
                };

                entries.push(entry);
            }
            vm.news = $filter('orderBy')(entries, 'date', true);
            $timeout(function () {
                gapi.plusone.go();
            });
            vm.loading = false;
        })
        .error(function (response) {
            vm.desc = "Sorry, we failed to retrieve the News from the Google+ API.";
            vm.loading = false;
            vm.status = 'ready';
            $log.debug('Sorry, we failed to retrieve the News from the Google+ API: ' + response);
        });
});

boomerang.controller("PhotosController", function ($http, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(3);
    vm.chapter_name = Config.name;
    vm.photos = [];

    var pwa = 'https://picasaweb.google.com/data/feed/api/user/' + Config.id + '/albumid/' + Config.pwa_id +
        '?access=public&alt=json-in-script&kind=photo&max-results=50&fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';

    $http.jsonp(pwa).
        success(function (data) {
            var p = data.feed.entry;
            for (var x in p) {
                var photo = {
                    link: p[x].link[1].href,
                    src: p[x].content.src,
                    alt: p[x].title.$t,
                    title: p[x].summary.$t
                };
                vm.photos.push(photo);
            }
            vm.loading = false;
        })
        .error(function (data) {
            vm.error_msg = "Sorry, we failed to retrieve the Photos from the Picasa Web Albums API. Logging out of your Google Account and logging back in may resolve this issue.";
            vm.loading = false;
        });
});
boomerang.directive('gplusAlbum', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusAlbum.html'
    }
});
boomerang.directive('gplusArticle', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusArticle.html'
    }
});
boomerang.directive('gplusEvent', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusEvent.html'
    }
});
boomerang.directive('gplusNoAttachments', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusNoAttachments.html'
    }
});
boomerang.directive('gplusPhotoVideo', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusPhotoVideo.html'
    }
});