exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'aboutTests.js',
        'newsTests.js'
    ],
    multiCapabilities: [
        { browserName: 'firefox' },
        //{ browserName: 'safari' },
        { browserName: 'chrome' }
    ],
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    }
};
