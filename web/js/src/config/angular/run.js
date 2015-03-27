define([
  'config/restangular/config',
  'config/angular/handlers/routing',
  'config/angular/handlers/dialog',
  'config/angular/handlers/endLoading'
], function (
  restangular,
  setRoutingHandlers,
  setDialogHandlers,
  setEndLoadingHandler
) {
  return function (app) {
    app.run([
      '$injector', '$cacheFactory', '$rootScope', '$q', '$state', 'CONFIG', 'Events', 'Restangular',
      function ($injector, $cacheFactory, $rootScope, $q, $state, CONFIG, Events, Restangular) {
        restangular.run($injector, $cacheFactory, $rootScope, $q, CONFIG, Events, Restangular);
        setRoutingHandlers($rootScope, $state, CONFIG, Events);
        setDialogHandlers($rootScope, Events);
        setEndLoadingHandler($rootScope, CONFIG, Events);
      }
    ]);
  };
});
