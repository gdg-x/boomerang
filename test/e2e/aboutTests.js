var env = require('./env.js');

describe('Boomerang About page', function () {
    var coverTitle = element(by.binding('vm.config.cover.title'));
    var coverSubTitle = element(by.binding('vm.config.cover.subtitle'));
    var coverButtonText = element(by.css('.md-button.md-raised.md-accent'));
    var chapterDescription = element(by.binding('vm.config.chapterDesc'));
    var chapterName = element(by.binding('mc.chapterName'));

    var twitterLink = element(by.css('.fa.fa-twitter-square'));
    var facebookLink = element(by.css('.fa.fa-facebook-square'));
    var meetupLink = element(by.css('.png-icon.invert'));

    beforeEach(function () {
        browser.get(env.baseUrl);
    });

    it('should have a title and social links', function () {
        expect(browser.getTitle()).toEqual('Google Developer Group');
        expect(twitterLink.isPresent()).toBe(true);
        expect(facebookLink.isPresent()).toBe(true);
        expect(meetupLink.isPresent()).toBe(true);
        expect(chapterName.isPresent()).toBe(true);
    });

    it('should have a proper promo', function () {
        expect(coverTitle.isPresent()).toBe(true);
        expect(coverSubTitle.isPresent()).toBe(true);
        expect(coverButtonText.isPresent()).toBe(true);
    });

    it('should load the chapter description', function () {
        expect(chapterDescription.isPresent()).toBe(true);
    });
});
