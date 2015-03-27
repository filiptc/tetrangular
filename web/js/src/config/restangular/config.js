define([
  'config/restangular/customMethods',
  'config/restangular/interceptors/response',
  'config/restangular/interceptors/request',
  'config/restangular/interceptors/error'
], function (
  addCustomMethods,
  responseInterceptor,
  requestInterceptor,
  errorInterceptor
) {

  var getCache = function (CONFIG, $cacheFactory) {
    return $cacheFactory.get(CONFIG.appName) || $cacheFactory(CONFIG.appName, CONFIG.lruCacheSize);
  };

  var setHttpCache = function (Restangular, cache) {
    Restangular.setDefaultHttpFields({'cache': cache});
  };

  var setRestangularInterceptors = function (CONFIG, $rootScope, $q, Restangular, Session, Events, cache) {
    Restangular
      .setFullRequestInterceptor(requestInterceptor(Session, cache))
      .setErrorInterceptor(errorInterceptor($rootScope, Events, Session))
      .setResponseInterceptor(responseInterceptor($q, Restangular, CONFIG, cache));
  };

  return {
    config: function (CONFIG, RestangularProvider) {
      RestangularProvider
        .setBaseUrl(CONFIG.api.getUrl())
        .setDefaultHeaders(CONFIG.api.headers)
    },
    run: function ($injector, $cacheFactory, $rootScope, $q, CONFIG, Events, Restangular) {
      var cache = getCache(CONFIG, $cacheFactory);
      setHttpCache(Restangular, cache);
      addCustomMethods($injector, Restangular, cache);
      setRestangularInterceptors(CONFIG, $rootScope, $q, Restangular, Events, cache)
    }
  };
});
