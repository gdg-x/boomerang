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
            title: 'Worldwide GDG Events',
            subtitle: 'Directory of developer events organized by tags and displayed on a global map.',
            button: {
                text: 'Find local events',
                url: 'http://gdg.events/'
            }
        }
    };
});
