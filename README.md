boomerang
=========
Boomerang is a template for a basic GDG web site.

Using boomerang
---------------
Update js/config.js with values appropriate for your group:

1. **name**: The name of your GDG
2. **id**: The ID of the Google+ page for your GDG; for example, if your page
   URL is https://plus.google.com/u/0/b/115803993493374365281/, then the ID
   is 115803993493374365281
3. **google_api**: The API key for your project, available from
   https://code.google.com/apis/console
4. **pwa_id**: The ID for a Picasa web album from which pictures will be
   drawn. If you do not have a Picasa web album for your group, you will want
   to comment out the photos tab in **index.html**.
5. **cover.title**: A notice that will appear on the landing page.
6. **cover.subtitle**: More text to support the landing page notice.
7. **cover.button.text**: Text for the button.
8. **cover.button.url**: The URL that the button links to.
9. **cover.url**: _Optional_: If the cover image drawn from your Google+ page
   does not work with the default layout, you can specify a URL for a specific
   image instead.

Then deploy on your web server of choice. If you need a web server, Google App
Engine's free tier should be more than sufficient for your needs.

Note
----
Testing on localhost will not produce satisfactory results, as the Google API
will not serve up the content required by the pages. Test on a server with a
real hostname.
