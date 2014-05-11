define(function () {
  'use strict';
  return function (cache) {

    var getCommonCollectionMethods = function (collection) {
      collection.getBySlug = function (slug) {
        var typeSlug = collection.route + '/' + slug;
        var cachedObject = cache.get(typeSlug);
        if (cachedObject) {
          return cachedObject.then(function (obj) {
            return [obj];
          });
        }
        return collection.customGetList({'bySlug': slug}, arguments);
      };

      collection.loadNextPage = function(definedParams) {
        var params = _.merge(collection.reqParams, definedParams || {}, {
          '_offset': collection.length || 0,
          '_limit': collection.getConfig().feed.chunkSize
        });
        return collection.customGetList(params).then(function (nextPage) {
          collection.push.apply(collection, nextPage);
          return collection;
        });
      };

      collection.customGetList = function (definedParams, extraArgs, noCache) {
        extraArgs = Array.prototype.slice.call(extraArgs || []);
        extraArgs.shift();
        var extraParams = (extraArgs || [])[0] || {};
        var headers = (extraArgs || [])[1] || {};
        var allParams = _.merge(definedParams, extraParams);
        if (allParams._limit) {
          allParams._limit++;
        }
        var query = collection.getList(allParams, headers);
        if (noCache === true) {
          query.then(function (object) {
            collection.removeFromCache(object.getRequestedUrl());
          });
        }
        query.then(function (object) {
          if (allParams._limit && object.length < allParams._limit) {
            collection.reachedEnd = true;
          } else if (allParams._limit) {
            object.splice(-1);
          }
        });
        return query;
      };

      return collection;
    };

    return getCommonCollectionMethods;
  };
});
