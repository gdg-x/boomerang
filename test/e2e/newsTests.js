var env = require('./env.js');

describe('Boomerang News page', function () {
    var gdgLoading = element(by.css('.gdg_loading'));
    var newsTab = element(by.css('#news-tab.active'));
    var newsArticles = element.all((by.repeater('article in vm.news')));
    var attachments = element.all((by.repeater('attachment in article.object.attachments')));

    beforeEach(function () {
        browser.get(env.baseUrl + '/#!/news');
    });

    it('should have a title and tab selected', function () {
        expect(browser.getTitle()).toEqual('Google Developer Group');
        expect(newsTab.isPresent()).toBe(true);
    });

    it('should hide the loading image', function () {
        expect(gdgLoading.isDisplayed()).not.toBe(true);
    });

    it('should load the news feed', function () {
        expect(newsArticles.count()).toBeGreaterThan(1);
        expect(attachments.count()).toBeGreaterThan(1);
    });
});
