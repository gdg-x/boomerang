// Google+ hashtag linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('hashLinky', function() {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return hashLinky(inputDOM).innerHTML;
    };

    function hashLinky(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    hashLinky(currentNode);
                    break;
                case TEXT_NODE:
                    var hashtagRegex = /#([A-Za-z0-9-_]+)/g;
                    currentNode.textContent =  currentNode.textContent.replace(hashtagRegex,
                        '<a href="https://plus.google.com/s/%23$1" target="_blank">#$1</a>');

                    linkifiedDOM.innerHTML = currentNode.textContent;
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
