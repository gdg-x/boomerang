var boomerang = angular.module('gdgBoomerang', ['ngSanitize', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider.
            when("/about", {templateUrl: 'views/about.html', controller: "AboutControl"}).
            when("/news", {templateUrl: 'views/news.html', controller: "NewsControl"}).
            when("/events", {templateUrl: 'views/events.html', controller: "EventsControl"}).
            when("/photos", {templateUrl: 'views/photos.html', controller: "PhotosControl"}).
            otherwise({ redirectTo: '/about' });
    });

boomerang.controller('MainControl', function ($scope, Config) {
    $scope.chapter_name = Config.name;
    $scope.google_plus_link = 'https://plus.google.com/' + Config.id;
    $scope.isNavCollapsed = true;
});

boomerang.controller('AboutControl', function ($scope, $http, $location, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "about";
    $scope.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.google_api).
        success(function (data) {
            console.log(data);
            $scope.desc = data.aboutMe;
            if (data.cover && data.cover.coverPhoto.url) {
                $scope.cover.url = data.cover.coverPhoto.url;
            }
            $scope.loading = false;
        });
});

boomerang.controller("NewsControl", function ($scope, $http, $timeout, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "news";
    $http.
        jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '/activities/public?callback=JSON_CALLBACK&maxResults=10&key=' + Config.google_api).
        success(function (response) {
            var entries = [], i, j;
            for (i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                var actor = item.actor || {};
                var object = item.object || {};
                // Normalize tweet to a FriendFeed-like entry.
                var itemTitle = '<b>' + item.title + '</b>';

                var html = [itemTitle.replace(new RegExp('\n', 'g'), '<br />')];
                //html.push(' <b>Read More &raquo;</a>');

                var thumbnails = [];

                var attachments = object.attachments || [];
                for (j = 0; j < attachments.length; j++) {
                    var attachment = attachments[j];
                    switch (attachment.objectType) {
                        case 'album':
                            break;// TODO needs more work
                            var upper = attachment.thumbnails.length > 7 ? 7 : attachment.thumbnails.length;
                            html.push('<ul class="thumbnails">');
                            for (var k = 1; k < upper; k++) {
                                html.push('<li class="span2"><img src="' + attachment.thumbnails[k].image.url + '" /></li>');
                            }
                            html.push('</ul>');
                            break;
                        case 'photo':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.fullImage.url
                            });
                            break;

                        case 'video':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.url
                            });
                            break;

                        case 'article':
                            html.push('<div class="link-attachment"><a href="' +
                                attachment.url + '">' + attachment.displayName + '</a>');
                            if (attachment.content) {
                                html.push('<br>' + attachment.content + '');
                            }
                            html.push('</div>');
                            break;
                        case 'event':
                            console.log(attachment);
                            html.push('<b>' + attachment.displayName + '</b>');
                            html.push('<p>' + attachment.content.replace(new RegExp('\n', 'g'), '<br />') + '</p>');
                            break;
                        default :
                            console.log(attachment.objectType);
                    }
                }

                html = html.join('');

                var actorImage = actor.image.url;
                actorImage = actorImage.substr(0, actorImage.length - 2) + '16';
                // The replace in the item URL is a dirty quick fix for issue #20 which seems to be a g+ api bug
                var entry = {
                    via: {
                        name: 'Google+',
                        url: item.url.replace('https://plus.google.com/https://plus.google.com', 'https://plus.google.com')
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
        });

});

boomerang.controller("EventsControl", function ($scope, $http, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "events";

    $scope.events = {past: [], future: []};
    $http.get("http://gdgfresno.com/gdgfeed.php?id=" + Config.id).
        success(function (data) {
            var now = new Date();
            for (var i = data.length - 1; i >= 0; i--) {
                var start = new Date(data[i].start);

                data[i].start = start;
                data[i].end = new Date(data[i].end);

                if (start < now) {
                    $scope.events.past.push(data[i]);
                } else {
                    $scope.events.future.push(data[i]);
                }
            }
            $scope.loading = false;
        });

});

boomerang.controller("PhotosControl", function ($scope, $http, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "photos";
    $scope.photos = [];

    var pwa = 'https://picasaweb.google.com/data/feed/api/user/' + Config.id + '/albumid/' + Config.pwa_id +
        '?access=public&alt=json-in-script&kind=photo&max-results=20&fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';

    $http.jsonp(pwa).
        success(function (d) {
            var p = d.feed.entry;
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