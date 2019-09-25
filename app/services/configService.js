angular.module('gdgXBoomerang')
.factory('Config', function () {
    return {
        // TODO Modify these to configure your app
        'name'          : 'GDG Space Coast',
        'domain'        : 'http://www.gdgspacecoast.org',
        'twitter'       : 'gdgspacecoast',
        'facebook'      : 'gdgspacecoast',
        'youtube'       : 'UCkiYHK3IZMk5XsYZ626b9Rw',
        'meetup'        : 'gdgspacecoast',
        'chapterDesc'  : 'Google Developer Group (GDG) Space Coast is a technology user group that meets to discuss the latest Google Technologies, Tools, SDKs, and APIs. We focus on learning about the broad spectrum of technologies provided by Google and finding ways that these technologies can be applied. This includes discussions of the technologies from a number of angles (startups, corporations, and individuals).',
        // Change to 'EEEE, MMMM d, y - H:mm' for 24 hour time format.
        'dateFormat'    : 'EEEE, MMMM d, y - h:mm a',
        'cover' : {
            title: 'Worldwide GDG Events',
            subtitle: 'Directory of developer events organized by tags and displayed on a global map.',
            button: {
                text: 'Find local events',
                url: 'https://www.meetup.com/pro/gdg'
            }
        },
        'activities': {
            techTalks: true,
            codeLabs: true,
            hackathons: true,
            devFests: true,
            appClinics: true,
            panels: true,
            designSprints: true,
            roundTables: true
        }
        // To update the snippet which is used for sharing, see the TODO in the index.html.
    };
});
