boomerang.factory('Config', function () {
    return {
        // Modify these to configure your app
        'name'          : 'GDG Space Coast',
        'id'            : '103959793061819610212',
        'google_api'    : '<insert your API key here>',
        'pwa_id'        : '5915725140705884785', // Picasa Web Album id, must belong to Google+ id above
        'domain'        : 'http://www.gdgspacecoast.org',
        'twitter'       : 'gdgspacecoast',
        'facebook'      : 'gdgspacecoast',
        'meetup'        : 'gdgspacecoast',
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
