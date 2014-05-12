require.config({
  paths : {
    jquery: '../vendor/jquery',
    lodash: '../vendor/lodash',
    angular: '../vendor/angular/angular',
    route: '../vendor/angular/angular-route',
    states: '../vendor/angular/angular-ui-router.0.2.0',
    animate: '../vendor/angular/angular-animate',
    restangular: '../vendor/angular/restangular.1.1.8',
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
  ['angular', 'route', 'states', 'animate', 'cookies', 'restangular', 'app'],
  function (angular, route, states, animate, cookies, restangular, App) {
    'use strict';
    App();
  }
);
