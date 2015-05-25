var env = require('./env.js');

describe('Boomerang About page', function () {
    var coverTitle = element(by.binding('vm.cover.title'));
    var coverSubTitle = element(by.binding('vm.cover.subtitle'));
    var coverButtonText = element(by.binding('vm.cover.button.text'));
    var chapterDescription = element(by.binding('vm.desc'));
    var chapterName = element(by.binding('mc.chapterName'));

    var googlePlusLink = element(by.css('.fa.fa-google-plus-square'));
    var twitterLink = element(by.css('.fa.fa-twitter-square'));
    var facebookLink = element(by.css('.fa.fa-facebook-square'));
    var meetupLink = element(by.css('.png-icon.invert'));
    var gdgLink = element(by.css('.png-icon.grayscale'));

    beforeEach(function () {
        browser.get(env.baseUrl);
    });

    it('should have a title and social links', function () {
        expect(browser.getTitle()).toEqual('Google Developer Group');
        expect(googlePlusLink.isPresent()).toBe(true);
        expect(twitterLink.isPresent()).toBe(true);
        expect(facebookLink.isPresent()).toBe(true);
        expect(meetupLink.isPresent()).toBe(true);
        expect(gdgLink.isPresent()).toBe(true);
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
