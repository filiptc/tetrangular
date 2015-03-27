require.config({
  'paths': {
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min',
    'lodash': '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.compat.min',
    'angular-animate': '../vendor/angular-animate/angular-animate',
    'angular-sanitize': '../vendor/angular-sanitize/angular-sanitize',
    'angular-route': '../vendor/angular-route/angular-route',
    'angular-ui-router': '../vendor/angular-ui-router/angular-ui-router.min',
    'requirejs-domready': '../vendor/requirejs-domready/domReady',
    'restangular': '../vendor/restangular/restangular'
  },
  'shim': {
    'angular': {
      'deps': ['jquery'],
      'exports': 'angular'
    }
  },
  'packages': [

  ]
});

require(['angular', 'jquery', 'lodash'],
  function () {
    require(['infrastructure'], function () {
      require(['requirejs-domready', 'app'], function (domReady, App) {
        'use strict';
        domReady(App);
      });
    });
  }
);
