var Config = (function(){
    var config = {
        //modify these
        'id'            : chapter_google+_id,
        'google_api'    : google_api_key,
        'pwa_id'        : picasa_web_album_id //must belong to google+ id above
    }
    return {get : function(a) { return config[a]}}
})();
 
angular.module('gdgBoomerang', ['ngSanitize'])
    .run(function($http, $rootScope, $location){
        var gdg = $rootScope.$new();
        $http.jsonp('https://www.googleapis.com/plus/v1/people/'+Config.get('id')+'?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2CdisplayName%2Cimage%2CplusOneCount&key='+Config.get('google_api')).
            success(function(data){
                gdg.brand = data.displayName;
                gdg.desc = data.aboutMe;
                if(data.cover && data.cover.coverPhoto.url){
                    gdg.cover = {
                        url : data.cover.coverPhoto.url,
                        title : 'Google I/O Recap',
                        subtitle : 'Review announcments made at Google I/O, and schwag!',
                        button : {
                            text : 'View Event',
                            url : 'https://developers.google.com/events/555120305/'
                        }
                    }
                }
                if($location.path() == ''){
                    $location.path('/about');
                }
            });

        gdg.events = {past:[] ,future:[]};
        $http.get("http://gdgfresno.com/gdgfeed.php?id="+Config.get('id')).
            success(function(data){
                var now = new Date();
                for(var i=data.length-1;i>=0;i--){
                    var start = new Date(data[i].start);
                    data[i].date = start.format("longDate") + ' ' + start.format("shortTime");

                    if (start < now){
                        gdg.events.past.push(data[i]);
                    } else {
                        gdg.events.future.push(data[i]);
                    }
                }
            });

        gdg.photos = [];

        var pwa = 'https://picasaweb.google.com/data/feed/api/user/'+Config.get('id')+'/albumid/'+Config.get('pwa_id')+'?access=public&alt=json-in-script&kind=photo&max-results=20&fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';
        $http.jsonp(pwa).
            success(function(d){
                var html, p = d.feed.entry, count=0;
                for(var x in p){

                    var photo = {
                        link : p[x].link[1].href,
                        src : p[x].content.src,
                        alt : p[x].title.$t,
                        title : p[x].summary.$t
                    }
                    gdg.photos.push(photo);
                }
            });
    })
    .config(function($routeProvider) {
         $routeProvider.
               when("/about",  {templateUrl:'about.html', controller:aboutControl}).
               when("/news", {templateUrl:'news.html', controller:newsControl}).
               when("/events", {templateUrl:'events.html', controller:eventsControl}).
               when("/photos", {templateUrl:'photos.html', controller:photosControl});
    });
  
navControl.$inject = ['$scope', '$route', '$rootScope'];
function navControl($scope, $route, $rootScope) {
    $scope.$route = $route;
    var data = $rootScope.$$childHead;
    
    // initialize the model to something useful
    data.$watch('brand',function(){
        $scope.brand = {
          name:data.brand
        };
    })
    
    $scope.setActive = function(ev){
        //reset active item
        var li = document.querySelector('.nav').children;
        for(item in li){
            li[item].className='';
        }
        //set active item
        ev.srcElement.parentNode.className = 'active';
    }
}

function aboutControl( $scope, $rootScope ) {
    var data = $rootScope.$$childHead;
    data.$watch('cover',function(){
        $scope.cover = data.cover;
        $scope.about = {desc : data.desc};
    })
}

function newsControl($scope) {
    
}

function eventsControl( $scope, $rootScope ) {
    var data = $rootScope.$$childHead;
    $scope.events = data.events;
}

function photosControl( $scope, $rootScope ) {
    var data = $rootScope.$$childHead;
    $scope.photos = data.photos;
}
