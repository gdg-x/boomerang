describe('Controllers', function () {
    var rootScope;

    beforeEach(module('gdgXBoomerang'));
    beforeEach(inject(function ($rootScope) {
        rootScope = $rootScope;
    }));

    describe('MainController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var mc = $controller('MainController');
            expect(mc.chapterName).toBe(Config.name);
            expect(rootScope.canonical).toBe(Config.domain);
        }));
    });

    describe('AboutController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var vm = $controller('AboutController');
            expect(vm.config.cover).toBe(Config.cover);
        }));
    });
});
