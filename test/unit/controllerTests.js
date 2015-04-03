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
            expect(mc.googlePlusLink).toBe('https://plus.google.com/' + Config.id);
            expect(rootScope.canonical).toBe(Config.domain);
        }));
    });

    describe('AboutController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var vm = $controller('AboutController');
            expect(vm.cover).toBe(Config.cover);
            expect(vm.loading).toBe(true);
            expect(vm.status).toBeUndefined();
        }));
    });

    describe('NewsController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var vm = $controller('NewsController');
            expect(vm.chapterName).toBe(Config.name);
            expect(vm.loading).toBe(true);
            expect(vm.status).toBeUndefined();
        }));
    });

    describe('EventsController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var vm = $controller('EventsController');
            expect(vm.chapterName).toBe(Config.name);
            expect(vm.loading).toBe(true);
            expect(vm.status).toBeUndefined();
            expect(vm.events).toBeDefined();
            expect(vm.dateFormat).toBe(Config.dateFormat);
        }));
    });

    describe('PhotosController', function () {
        it('should set some values', inject(function (Config, $controller) {
            var vm = $controller('PhotosController');
            expect(vm.chapterName).toBe(Config.name);
            expect(vm.loading).toBe(true);
            expect(vm.photos).toBeDefined();
        }));
    });
});
