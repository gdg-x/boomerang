var env = require('./env.js');

describe('Boomerang News page', function () {
    var gdgLoading = element(by.css('.gdg_loading'));
    var newsArticles = element.all((by.repeater('article in vm.news')));
    var attachments = element.all((by.repeater('attachment in article.object.attachments')));

    beforeEach(function () {
        browser.get(env.baseUrl + '/#!/news');
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Google Developer Group');
    });

    it('should hide the loading image', function () {
        expect(gdgLoading.isDisplayed()).not.toBe(true);
    });

    it('should load the news feed', function () {
        expect(newsArticles.count()).toBeGreaterThan(1);
        expect(attachments.count()).toBeGreaterThan(1);
    });
});
