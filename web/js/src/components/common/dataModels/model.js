define(function () {
  'use strict';
  return function (cache) {

    var updateIdCache = function (model) {
      var url = model.getRestangularUrl();
      var cachedObject = cache.get(url);
      if (cachedObject) {
        cachedObject[1] = JSON.stringify(_.clone(model));
        cache.put(url, cachedObject);
      }
    };

    return function (model) {
      model.updateCache = function () {
        updateIdCache(model);
      };

      return model;
    };
  };
});
