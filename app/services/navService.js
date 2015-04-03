angular.module('gdgXBoomerang')
.factory('NavService', function () {
    var navTab = '0';
    var navListener;

    return {
        setNavTab: setNavTab,
        getNavTab: getNavTab,
        registerNavListener: registerNavListener
    };

    function setNavTab(tabValue) {
        navTab = tabValue;
        if (navListener) {
            navListener(navTab);
        }
    }

    function getNavTab() {
        return navTab;
    }

    function registerNavListener(listenerToRegister) {
        navListener = listenerToRegister;
    }
});
