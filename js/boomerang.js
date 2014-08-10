var boomerang = angular.module('gdgBoomerang', ['ngSanitize', 'ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $routeProvider.
            when("/about", {templateUrl: 'views/about.html', controller: "AboutControl"}).
            when("/news", {templateUrl: 'views/news.html', controller: "NewsControl"}).
            when("/events", {templateUrl: 'views/events.html', controller: "EventsControl"}).
            when("/photos", {templateUrl: 'views/photos.html', controller: "PhotosControl"}).
            otherwise({ redirectTo: '/about' });
    });

boomerang.controller('MainControl', function ($rootScope, $scope, Config) {
    $scope.chapter_name = Config.name;
    $scope.google_plus_link = 'https://plus.google.com/' + Config.id;
    $scope.isNavCollapsed = true;
    $rootScope.canonical = Config.domain;
});

boomerang.controller('AboutControl', function ($scope, $http, $location, $sce, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "about";
    $scope.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.google_api).
        success(function (data) {
            $scope.desc = data.aboutMe;
            $sce.trustAsHtml($scope.desc);

            if (data.cover && data.cover.coverPhoto.url) {
                $scope.cover.url = data.cover.coverPhoto.url;
            }
            $scope.loading = false;
        })
        .error(function (data) {
            $scope.desc = "Sorry, we failed to retrieve the About text from the Google+ API.";
            $scope.loading = false;
        });
});

boomerang.controller("NewsControl", function ($scope, $http, $timeout, $filter, $sce, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "news";
    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
        '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + Config.google_api)
        .success(function (response) {
            var entries = [], i, j, k;
            var item, actor, object, itemTitle, html, thumbnails, attachments, attachment;
            var upper, published, actorImage, entry;

            for (i = 0; i < response.items.length; i++) {
                item = response.items[i];
                actor = item.actor || {};
                object = item.object || {};
                itemTitle = object.content;
                published = $filter('date')(new Date(item.published), 'fullDate');
                html = ['<p style="font-size:14px;">' + published + '</p>'];

                if(item.annotation) {
                    itemTitle = item.annotation;
                }

                html.push(itemTitle.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));

                thumbnails = [];
                attachments = object.attachments || [];

                for (j = 0; j < attachments.length; j++) {
                    attachment = attachments[j];
                    switch (attachment.objectType) {
                        case 'album':
                            upper = attachment.thumbnails.length > 10 ? 10 : attachment.thumbnails.length;
                            html.push('<ul class="thumbnails">');
                            for (k = 0; k < upper; k++) {
                                html.push('<li class="span2"><a href="' + attachment.thumbnails[k].url + '" target="_blank">' +
                                    '<img src="' + attachment.thumbnails[k].image.url + '" /></a></li>');
                            }
                            html.push('</ul>');
                            break;
                        case 'photo':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.url
                            });
                            break;

                        case 'video':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.url
                            });
                            break;

                        case 'article':
                        case 'event':
                            html.push('<div class="link-attachment"><a href="' +
                                attachment.url + '" target="_blank">' + attachment.displayName + '</a>');
                            if (attachment.content) {
                                html.push('<br>' + attachment.content);
                            }
                            html.push('</div>');
                            break;
                        default :
                            console.log(attachment.objectType);
                    }
                }

                html = html.join('');
                $sce.trustAsHtml(html);

                actorImage = actor.image.url;
                actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

                entry = {
                    via: {
                        name: 'Google+',
                        url: item.url
                    },
                    body: html,
                    date: item.updated,
                    reshares: (object.resharers || {}).totalItems,
                    plusones: (object.plusoners || {}).totalItems,
                    comments: (object.replies || {}).totalItems,
                    thumbnails: thumbnails,
                    icon: actorImage
                };

                entries.push(entry);
            }
            $scope.news = entries;
            $timeout(function () {
                gapi.plusone.go();
            });
            $scope.loading = false;
        })
        .error(function (response) {
            $scope.desc = "Sorry, we failed to retrieve the News from the Google+ API.";
            $scope.loading = false;
            $scope.status = 'ready';
        });
});

boomerang.controller("EventsControl", function ($scope, $http, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "events";

    $scope.events = {past:[] ,future:[]};
    var url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                $scope.events.future.push(data.items[i]);
            }
            $scope.loading = false;
            $scope.status = 'ready';
        });

    url = 'http://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/past?callback=JSON_CALLBACK';
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                $scope.events.past.push(data.items[i]);
            }
            $scope.loading = false;
            $scope.status = 'ready';
        });
});

boomerang.controller("PhotosControl", function ($scope, $http, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "photos";
    $scope.photos = [];

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
                $scope.photos.push(photo);
            }
            $scope.loading = false;
        })
        .error(function (data) {
            $scope.error_msg = "Sorry, we failed to retrieve the Photos from the Picasa Web Albums API. Logging out of your Google Account and logging back in may resolve this issue.";
            $scope.loading = false;
        });
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