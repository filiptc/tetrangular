define([
  'angular',
  'config/prepareConfig',
  'config/angular/components',
  'config/angular/configure',
  'config/angular/run'
], function (
  angular,
  config,
  appComponents,
  appConfigure,
  appRun
) {
  'use strict';

  var createApp = function () {
    return angular.module(config.appName, ['ngAnimate', 'ngRoute', 'restangular', 'ui.router.compat']);
  };

  var bootstrapLogic = function () {
    if (!document.injector) {
      angular.bootstrap(document, [config.appName]);
    }
    try {
      var html = document.getElementsByTagName('html')[0];
      html.setAttribute('data-ng-app', config.appName);
    } catch (e) {}

    if (top !== window) {
      window.parent.postMessage({type: 'loadamd'}, '*');
    }
  };

  var appSetup = function (app) {
    appComponents(app, config);
    appConfigure(app, config);
    appRun(app);
    facebookConfig.init(config.facebook.appId);
  };

  return function () {
    var app = createApp(config);
    appSetup(app, config);
    bootstrapLogic(config);
  };
});
