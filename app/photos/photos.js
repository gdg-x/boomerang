angular.module('gdgXBoomerang')
.controller('PhotosController', function ($http, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(5);
    vm.chapterName = Config.name;
    vm.photos = [];

    var pwa = 'https://picasaweb.google.com/data/feed/api/user/' + Config.id + '/albumid/' + Config.pwaId +
        '?access=public&alt=json-in-script&kind=photo&max-results=50&' +
        'fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';

    $http.jsonp(pwa).
        success(function (data) {
            var photoList = data.feed.entry;
            var i;
            if (photoList) {
                // Use reverse ordering newest first
                for (i = photoList.length - 1; i >= 0; i--) {
                    var photo = {
                        link: photoList[i].link[2].href,
                        src: photoList[i].content.src,
                        alt: photoList[i].title.$t,
                        title: photoList[i].summary.$t
                    };
                    vm.photos.push(photo);
                }
            }
            vm.loading = false;
        })
        .error(function () {
            vm.errorMsg = 'Sorry, we failed to retrieve the photos from the Picasa Web Albums API. ' +
                'Logging out of your Google Account and logging back in may resolve this issue.';
            vm.loading = false;
        });
});
