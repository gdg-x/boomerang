boomerang.factory('Config', function () {
    return {
        //modify these
        'name'          : 'GDG Space Coast',
        'id'            : '103959793061819610212',
        'google_api'    : '<insert your API key here>',
        'pwa_id'        : '5915725140705884785', //picasa web album id, must belong to google+ id above
        'domain'        : 'http://www.gdgspacecoast.org',
        'cover' : {
            title: 'Chrome Dev Summit',
            subtitle: 'Connecting you with Chrome Engineers. November 19-20th, 2014. Mountain View, CA and live stream.',
            button: {
                text: 'Find out more',
                url: 'https://developer.chrome.com/devsummit/'
            }
        }
    };
});
