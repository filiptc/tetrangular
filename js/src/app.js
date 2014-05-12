define(
  ['angular', 'appConfig', 'config/angular/components', 'config/angular/configure', 'config/angular/run', 'config/restangular/config'],
  function (angular, config, appComponents, appConfigure, appRun, restangularConfig) {
    'use strict';
  
    var createApp = function () {
      return angular.module(
        config.appName,
        ['ngAnimate', 'ivpusic.cookie', 'restangular', 'ui.router.compat']
      );
    };
  
    var appSetup = function (app) {
      appComponents(app, config);
      appConfigure(app, config);
      restangularConfig(app, config);
      appRun(app, config);
    };
  
    return function () {
      var app = createApp(config);
      appSetup(app, config);
    };
  }
);
