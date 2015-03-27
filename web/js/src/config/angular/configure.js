define([
    'config/routes',
    'config/restangular/config'
  ], function (
    routes,
    restangular
  ) {

    var handleStates = function ($stateProvider) {
      var i, s;
      var sLength = routes.states.length;
      for (i = 0; i < sLength; i++) {
        s = routes.states[i];
        console.log('[BootStrapping] defining route "' + s.config.url + '"');
        $stateProvider.state(s.alias, s.config);
      }
    };

    var handleRedirects = function ($urlRouterProvider) {
      var i, r;
      var rLength = routes.redirections.length;
      for (i = 0; i < rLength; i++) {
        r = routes.redirections[i];
        console.log('[BootStrapping] defining redirect from "' + r.from + '" to "' + r.to + '"');
        $urlRouterProvider.when(r.from, r.to);
      }
    };

    var handle404 = function ($urlRouterProvider) {
      console.log('[BootStrapping] Setting up 404 forwarding');
      $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('404', {}, {'location': false, 'notify': false});
      });
    };

    var configureRoutes = function ($stateProvider, $urlRouterProvider) {
      handleStates($stateProvider);
      handleRedirects($urlRouterProvider);
      handle404($urlRouterProvider);
    };

    var decorateExceptionHandler = ['$delegate', function ($delegate) {
      return function (exception, cause) {
        // do stuff with extensions (logging server, etc.)
        $delegate(exception, cause);
      };
    }];

    return function (app, config) {
      app.config(['$provide', '$injector', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$logProvider', 'RestangularProvider',
        function ($provide, $injector, $stateProvider, $urlRouterProvider, $locationProvider, $logProvider, RestangularProvider) {
          restangular.config(config, RestangularProvider);
          $locationProvider.html5Mode(true);
          $locationProvider.hashPrefix('!');
          $logProvider.debugEnabled(config.debug);
          $provide.decorator('$exceptionHandler', decorateExceptionHandler);
          configureRoutes($stateProvider, $urlRouterProvider);
        }
      ]);
    };
  }
);
