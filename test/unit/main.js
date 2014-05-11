var tests = [];
var TEST_REGEXP = /Spec\.js$/;
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        tests.push(file);
    }
});

requirejs.config({
    paths : {
        'stacktrace' : 'http://rawgithub.com/eriwen/javascript-stacktrace/master/stacktrace',
        'jquery' : 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery',
        'transit': 'http://ricostacruz.com/jquery.transit/jquery.transit',
        'lodash' : 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.0.0/lodash',
        'angular' : 'http://code.angularjs.org/snapshot/angular',
        'route' : 'http://code.angularjs.org/snapshot/angular-route',
        'animate' : 'http://code.angularjs.org/snapshot/angular-animate',
        'cookies': 'http://code.angularjs.org/snapshot/angular-cookies',
        'states' : 'http://angular-ui.github.io/ui-router/release/angular-ui-router',
        'restangular' : 'https://raw.github.com/mgonto/restangular/master/dist/restangular',
        'mock': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-mocks'
    },
    shim : {
        'jquery': {exports : 'jQuery'},
        'transit': {
            deps: ['jquery'],
            exports: 'jQuery.fn.transit'
        },
        'angular': {
            deps: ['jquery'],
            exports : 'angular'
        },
        'lodash': {exports : 'lodash'},
        'restangular': {
            deps: ['angular', 'lodash'],
            exports : 'restangular'
        },
        'states': {
            deps: ['angular']
        },
        'route': {
            deps: ['angular']
        },
        'animate': {
            deps: ['angular']
        },
        'cookies': {
            deps: ['angular']
        },
        'mock': {
            deps: ['angular']
        }
    },
    // Karma serves files from '/base'
    baseUrl: '/base/js/src',
    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});