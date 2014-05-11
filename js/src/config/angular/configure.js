define(
  ['config/routes'],
  function (routes) {
    var handleStates = function ($stateProvider) {
      var i, s;
      var sLength = routes.states.length;
      for (i = 0; i < sLength; i++) {
        s = routes.states[i];
        $stateProvider.state(s.alias, s.config);
      }
    };

    var handleRedirects = function ($urlRouterProvider) {
      var i, r;
      var rLength = routes.redirections.length;
      for (i = 0; i < rLength; i++) {
        r = routes.redirections[i];
        $urlRouterProvider.when(r.from, r.to);
      }
    };

    var handle404 = function ($urlRouterProvider) {
      $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        $state.go('404', {}, {'location': false, 'notify': false});
      });
    };

    var configureRoutes = function ($stateProvider, $urlRouterProvider) {
      handleStates($stateProvider);
      handleRedirects($urlRouterProvider);
      handle404($urlRouterProvider);
    };

    return function (app, config) {
      app.config(function ($provide, $injector, $stateProvider, $urlRouterProvider, $locationProvider, $logProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $logProvider.debugEnabled(config.debug);
        configureRoutes($stateProvider, $urlRouterProvider);

        $provide.decorator('$exceptionHandler', function ($delegate) {
          return function (exception, cause) {
            //$injector.get('$rootScope').$broadcast('$stateChangeError');
            $delegate(exception, cause);
          };
        });
      });
    };
  }
);
