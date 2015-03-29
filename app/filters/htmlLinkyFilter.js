// HTML-ified linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('htmlLinky', function($filter) {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return linkify(inputDOM).innerHTML;
    };

    function linkify(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    linkify(currentNode);
                    break;
                case TEXT_NODE:
                    linkifiedDOM.innerHTML = $filter('linky')(currentNode.textContent, '_blank');
                    i += linkifiedDOM.childNodes.length - 1;

                    while (linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }

                    startNode.removeChild(currentNode);
            }
        }
        return startNode;
    }
});
