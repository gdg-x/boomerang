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
        // Change to 'EEEE, MMMM d, y - H:mm' for 24 hour time format.
        'dateFormat'    : 'EEEE, MMMM d, y - h:mm a',
        'cover' : {
            title: 'Worldwide GDG Events',
            subtitle: 'Directory of developer events organized by tags and displayed on a global map.',
            button: {
                text: 'Find local events',
                url: 'http://gdg.events/'
            }
        },
        'snippet' : {
            name: 'GDG Space Coast - Brevard County, FL, USA.',
            description: 'Google Developer Group (GDG) Space Coast is a technology user group that meets to discuss the latest Google Technologies, Tools, SDKs, and APIs. The focus is on learning about the broad spectrum of technologies provided by Google and finding ways that these technologies can be applied. This includes discussions of the technologies from a number of angles (start ups, corporations, and individuals).',
            image: 'app/images/GDG-X-Boomerang-snippet.png'
        }
    };
});
