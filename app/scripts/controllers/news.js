'use strict';

angular.module('boomerangApp')
  .controller('NewsCtrl', function ($scope, $http, $filter, $sce, $timeout, Config) {

        $scope.config = Config;

        $http.jsonp('https://www.googleapis.com/plus/v1/people/' + $scope.config.id +
            '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + $scope.config.google_api)
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
