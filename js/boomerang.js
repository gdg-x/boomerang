var boomerang = angular.module('gdgBoomerang', ['ngSanitize', 'ngRoute', 'ngAria', 'ui.bootstrap', 'ngMaterial'])
.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.
        when("/about", {templateUrl: 'views/about.html', controller: "AboutControl"}).
        when("/news", {templateUrl: 'views/news.html', controller: "NewsControl"}).
        when("/events", {templateUrl: 'views/events.html', controller: "EventsControl"}).
        when("/photos", {templateUrl: 'views/photos.html', controller: "PhotosControl"}).
        otherwise({ redirectTo: '/about' });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});

boomerang.controller('MainControl', function ($rootScope, $scope, Config) {
    $scope.chapter_name = Config.name;
    $scope.google_plus_link = 'https://plus.google.com/' + Config.id;
    $scope.isNavCollapsed = true;
    $rootScope.canonical = Config.domain;
});

// HTML-ified linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
boomerang.filter('htmlLinky', function($sanitize, linkyFilter) {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    var linkify = function linkify(startNode) {
        var i, currentNode;

        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    linkify(currentNode);
                    break;
                case TEXT_NODE:
                    linkifiedDOM.innerHTML = linkyFilter(currentNode.textContent);
                    i += linkifiedDOM.childNodes.length - 1;

                    while(linkifiedDOM.childNodes.length)
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);

                    startNode.removeChild(currentNode);
            }
        }

        return startNode;
    };

    return function(input) {
        inputDOM.innerHTML = input;
        return linkify(inputDOM).innerHTML;
    };
});

boomerang.filter('hashLinky', function($sanitize, linkyFilter) {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    var hashLinky = function hashLinky(startNode) {
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
                        '<a href="https://plus.google.com/s/%23$1">#$1</a>');

                    linkifiedDOM.innerHTML = currentNode.textContent;
                    i += linkifiedDOM.childNodes.length - 1;

                    while(linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }
                    startNode.removeChild(currentNode);
            }
        }

        return startNode;
    };

    return function(input) {
        inputDOM.innerHTML = input;
        return hashLinky(inputDOM).innerHTML;
    };
});