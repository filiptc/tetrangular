require.config({
  paths : {
    jquery: '../vendor/jquery',
    lodash: '../vendor/lodash',
    angular: '../vendor/angular/angular',
    route: '../vendor/angular/angular-route',
    states: '../vendor/angular-ui-router.0.2.0',
    animate: '../vendor/angular/angular-animate',
    restangular: '../vendor/restangular.1.1.8',
  },
  shim : {
    angular: {
      deps: ['jquery'],
      exports : 'angular'
    },
    restangular: ['angular', 'lodash'],
    route: ['angular'],
    states: ['angular'],
    animate: ['angular'],
    cookies: ['angular'],
  },
  baseUrl: '/js/src'
});

require(
  ['stacktrace', 'angular', 'route', 'states', 'animate', 'cookies', 'restangular', 'app'],
  function (stacktrace, angular, route, states, animate, cookies, restangular, App) {
    'use strict';
    App();
  }
);
