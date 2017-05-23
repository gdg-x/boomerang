GDG-X Boomerang
=========

[![Build Status](https://travis-ci.org/gdg-x/boomerang.svg)](https://travis-ci.org/gdg-x/boomerang) [![Join the chat at https://gitter.im/gdg-x/boomerang](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gdg-x/boomerang?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Boomerang is a template for a dynamic material design GDG chapter web site that can be deployed with very little
work necessary! It pulls data from [MeetUp](https://www.meetup.com/meetup_api/docs/), [GDG-X Hub](https://github.com/gdg-x/hub)
and [Google+ API](https://developers.google.com/+/api/) using [Angular](https://angular.io) and [Angular-Material](https://material.angular.io).


Configuration
---------------
Update src/environents/environent.ts with values appropriate for your group:

* **chapter**: The name of your GDG
* **meetup**: The name of your GDG as it shows up in your MeetUp url
* **googlePlus**: The ID of the Google+ page for your GDG; for example, if your page URL is https://plus.google.com/u/0/b/104918449869513449879/, then the ID is '104918449869513449879'.
* **googleApi**: The API key for your project, available from the [Cloud Console](https://console.developers.google.com/apis)
  * Create a new project
  * Go to Credentials.
  * Click `Create credentials` -> `API Key` -> `Browser Key`
  * Click Create.
* **twitter**, **facebook**, **youtube**: Update these with your chapter's social network handles. Setting them to `null` will hide the icon.
* Create your Google Analytics account and modify the Google Analytics tracking code in **src/index.html**.

###### There are development and production environent variables, adjust them appropriatley!

Additional Optional Config
---------------
* **sponsors**: An array of sponsors that get shown in About, add new objects with the `name`, `url`, and `img` attributes
* **activities**: Disable or enable any type of event you host with boolean values.

To customize the theme of your site update src/styles/theme.scss and modify the arguments of `mat-palette()` in `$primary`
and `$accent` based on the material color pallete found [here](https://material.io/guidelines/style/color.html#color-color-palette).

Building
---------------
Here you will install dependencies and tooling, test/run and build!
You must have Node.js installed to use the build tools. Download it [here](http://nodejs.org/download/).
Also this project uses the [Angular CLI](https://www.npmjs.com/package/@angular/cli). Install it by running `npm install -g @angular/cli`
From the boomerang2 directory, run the following:

* `npm install`
* `ng build`

Testing locally
---------------
To run and tinker with the app locally just run the commang

* `ng serve`

Deployment
---------------
Deploy on your web server of choice (Apache, Nginx, etc).
If you need a web server, Google App Engine's free tier should be more than sufficient for your chapter's needs.


### Contributors
See [list of contributors](https://github.com/gdg-x/boomerang/graphs/contributors)

Maintainer: [Splaktar](https://github.com/Splaktar).

###### GDG Apps, GDG[x] are not endorsed and/or supported by Google, the corporation.

License
--------

    © 2013-2016 GDG[x]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.