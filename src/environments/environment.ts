// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  chapter: '<Chapter Name Here>',
  meetup: '<Meetup URL Name>',
  googlePlus: '<Google+ ID>',
  googleAPI: '<Google API>',
  twitter: '<Twitter Handle>',
  facebook: '<Facebook Handle>',
  youtube: '<YouTube Handle>',
  activities: {
    techTalks: true,
    roundTables: true,
    codeLabs: true,
    devFests: true,
    appClinics: true,
    panels: true,
    hackathons: true,
    designSprints: true
  },
  gdgxHub: 'https://hub.gdgx.io',
  sponsors: [{ //To add sponsors, follow the object template below and add to the array
    name: 'Google Developers',
    url: 'https://developers.google.com/',
    img: '/assets/Google-Developers.png'
  }]
};
