boomerang.factory('Config', function () {
    return {
        //modify these
        'name'          : 'GDG Space Coast',
        'id'            : '103959793061819610212',
        'google_api'    : '<insert your API key here>',
        'pwa_id'        : '5915725140705884785', //picasa web album id, must belong to google+ id above
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
