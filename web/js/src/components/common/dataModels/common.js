define(function () {
  'use strict';
  return function ($rootScope, $q, Restangular, cache) {

    return function (mixed) {
      mixed.fetch = function () {
        if (mixed.restangularCollection) {
          return mixed.getList();
        }
        return mixed.get();
      };

      mixed.getRestangular = function () {
        return Restangular;
      };

      mixed.getQ = function () {
        return $q;
      };

      mixed.removeFromCache = function (subject, removeIdCache) {
        var url;
        if (subject && subject.getRequestedUrl) {
          url = subject.getRequestedUrl();
          cache.remove(url);
        } else if (typeof subject === 'string') {
          cache.remove(subject);
        }
        if (removeIdCache) {
          url = subject.getRestangularUrl();
          cache.remove(url);
        }
      };

      return mixed;
    };
  };
});
