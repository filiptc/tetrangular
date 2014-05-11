define(function () {
  'use strict';
  return function (cache) {

    var updateSlugCache = function (model) {
      var typeSlug = model.route + '/' + model.slug;
      var cachedObject = cache.get(typeSlug);
      if (cachedObject) {
        cachedObject.then(function (obj) {
          obj = _.clone(model);
        });
      }
    };

    var updateIdCache = function (model) {
      var url = model.getRestangularUrl();
      var cachedObject = cache.get(url);
      if (cachedObject) {
        cachedObject[1] = JSON.stringify(_.clone(model));
        cache.put(url, cachedObject);
      }
    };

    var getCommonModelMethods = function (model) {
      model.updateCache = function () {
        updateSlugCache(model);
        updateIdCache(model);
      };

      return model;
    };

    return getCommonModelMethods;
  };
});
