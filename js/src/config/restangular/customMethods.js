define([
  'config/restangular/dataModel/models',
  'config/restangular/dataModel/collections',
  'config/restangular/dataModel/common'
], function (
  models,
  collections,
  common
) {
  return function ($rootScope, $q, Restangular, cache) {

    var extendModels = function () {
      var model;
      for (model in models.specific) {
        Restangular.extendModel(model, models.specific[model]);
        Restangular.extendModel(model, models.common(cache));
        Restangular.extendModel(model, common.common($rootScope, $q, Restangular, cache));
      }
    };

    var extendCollections = function () {
      var collection;
      for (collection in collections.specific) {
        Restangular.extendCollection(collection, collections.specific[collection]);
        Restangular.extendCollection(collection, collections.common(cache));
        Restangular.extendCollection(collection, common.common($rootScope, $q, Restangular, cache));
      }
    };

    var addCustomMethods = function () {
      extendModels();
      extendCollections();
    };

    return {load: addCustomMethods};
  };
});
