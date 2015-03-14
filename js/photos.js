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