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
  return function (app, config) {

    var getCache = function ($cacheFactory) {
      return $cacheFactory.get(config.appName) || $cacheFactory(config.appName, config.lruCacheSize);
    };

    var setRestangularInterceptors = function ($q, Restangular, Session, Events, cache) {
    	Restangular
        .setFullRequestInterceptor(requestInterceptor(Session, cache))
        .setErrorInterceptor(errorInterceptor(Events, Session))
        .setResponseInterceptor(responseInterceptor($q, Restangular, config, cache));
    };

    app.config(function (RestangularProvider) {
      RestangularProvider
        .setBaseUrl(config.api.getUrl())
        .setDefaultHeaders(config.api.headers);
    });

    app.run(function ($cacheFactory, $rootScope, $q, Events, Session, Restangular) {
      var cache = getCache($cacheFactory);
      addCustomMethods($rootScope, $q, Restangular, cache).load();
      setRestangularInterceptors($q, Restangular, Session, Events, cache)
    });
  };
});
