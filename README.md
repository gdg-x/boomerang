boomerang
=========

[![Join the chat at https://gitter.im/gdg-x/boomerang](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gdg-x/boomerang?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Boomerang is a template for a basic GDG web site that can be deployed within 30 minutes.

See it in action: http://gdg-x.github.io/boomerang

There are multiple forked versions for Google App Engine
* Java - https://github.com/Splaktar/boomerang-gae
* Python - https://github.com/neojato/boomerang-gae

Configuring
---------------
Update js/config.js with values appropriate for your group:

1. **name**: The name of your GDG
2. **id**: The ID of the Google+ page for your GDG; for example, if your page
   URL is https://plus.google.com/u/0/b/115803993493374365281/, then the ID
   is 115803993493374365281
3. **google_api**: The API key for your project, available from
   https://code.google.com/apis/console - create a new project, add Google+ API,
   and use the API key shown in 'Simple API Access'
   If you're using the new Cloud Console https://cloud.google.com/console
   add the Google+ API and use the basic BrowserKey registered app's API key
4. **pwa_id**: The ID for a Picasa web album from which pictures will be
   drawn. If you do not have a Picasa web album for your group, you will want
   to comment out the photos tab in **index.html**.
5. **domain**: Your custom domain name (or base appspot URL).
6. **cover.title**: A notice that will appear on the landing page.
7. **cover.subtitle**: More text to support the landing page notice.
8. **cover.button.text**: Text for the button.
9. **cover.button.url**: The URL that the button links to.
10. **cover.url**: _Optional_: If the cover image drawn from your Google+ page
   does not work with the default layout, you can specify a URL for a specific
   image instead.

Building
---------------
Here you will install dependencies and tooling, build, minify, run static analysis, and more.
You must have Node.js installed to use the build tools. Download it [here](http://nodejs.org/download/).
From the boomerang directory, run the following:

1. npm install
2. bower install
3. gulp

Testing locally
---------------
If you aren't using App Engine, you should be able to test locally with Node.js using the following:

1. npm install http-server -g
2. cd boomerang
3. http-server -o

Deployment
---------------
Deploy on your web server of choice (Apache, Nginx, etc).
If you need a web server, Google App Engine's free tier should be more than sufficient for your chapter's needs.

Example sites using this template
---------------
* http://www.gdgfresno.com/
* http://gdgspacecoast.org/
