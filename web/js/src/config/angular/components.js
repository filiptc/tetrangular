define([
    'config/routes',
    'config/services',
    'config/factories',
    'config/filters',
    'config/directives'
  ], function (
    routes,
    services,
    factories,
    filters,
    directives
  ) {

    var configureConstants = function (app, config) {
      app.constant('CONFIG', config);
    };

    var configureControllers = function (app) {
      var controller;
      for (controller in routes.controllers) {
        console.log('[BootStrapping] loading controller ' + controller);
        app.controller(controller, routes.controllers[controller]);
      }
    };

    var configureServices = function (app) {
      var service;
      for (service in services) {
        console.log('[BootStrapping] loading ' + service + ' service');
        app.service(service, services[service]);
      }
    };

    var configureFactories = function (app) {
      var factory;
      for (factory in factories) {
        console.log('[BootStrapping] loading ' + factory + ' factory');
        app.factory(factory, factories[factory]);
      }
    };

    var configureFilters = function (app) {
      var filter;
      for (filter in filters) {
        console.log('[BootStrapping] loading ' + filter + ' filter');
        app.filter(filter, filters[filter]);
      }
    };

    var configureDirectives = function (app) {
      var directive;
      for (directive in directives) {
        console.log('[BootStrapping] loading directive ' + directive);
        app.directive(directive, directives[directive]);
      }
    };

    return function (app, config) {
      configureConstants(app, config);
      configureControllers(app);
      configureServices(app);
      configureFactories(app);
      configureFilters(app);
      configureDirectives(app);
    }
  }
);
