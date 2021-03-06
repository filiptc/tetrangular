define([
  'config/restangular/dataModel/models',
  'config/restangular/dataModel/collections',
  'config/restangular/dataModel/common'
], function (
  models,
  collections,
  common
) {

  var extendModels = function ($injector, Restangular, cache) {
    var model;
    for (model in models.specific) {
      Restangular.extendModel(model, models.specific[model]);
      Restangular.extendModel(model, models.common(cache));
      Restangular.extendModel(model, common.common($injector, cache));
    }
  };

  var extendCollections = function ($injector, Restangular, cache) {
    var collection;
    for (collection in collections.specific) {
      Restangular.extendCollection(collection, collections.specific[collection]);
      Restangular.extendCollection(collection, collections.common);
      Restangular.extendCollection(collection, common.common($injector, cache));
    }
  };

  return function ($injector, Restangular, cache) {
    extendModels($injector, Restangular, cache);
    extendCollections($injector, Restangular, cache);
  };
});
