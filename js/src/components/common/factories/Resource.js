define(function () {
  'use strict';

  return function (Restangular) {
    
    function DataResource(resource, id) {
      if (!(this instanceof DataResource)) {
        return new DataResource(resource, id);
      }
      if (id === undefined) {
        return Restangular.all(resource);
      }
      return Restangular.one(resource, id);
    }

    return DataResource;
  };

});
