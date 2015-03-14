boomerang.factory('NavService', function () {
    var navTab = '0';
    var navListener;

    return {
        setNavTab: setNavTab,
        getNavTab: getNavTab,
        registerNavListener: registerNavListener
    };

    function setNavTab(tabValue) {
        navTab = tabValue;
        navListener(navTab);
    }

    function getNavTab() {
        return navTab;
    }

    function registerNavListener(listenerToRegister) {
        navListener = listenerToRegister;
    }
});
