define(function () {
  'use strict';
  return function ($rootScope, $q, Restangular, cache) {

    var diff = function (orig, altered) {
      var key;
      var returnObj = {};
      for (key in altered) {
        if (altered.hasOwnProperty(key)
            && !(typeof altered[key] === 'Function')
            && !_.isEqual(orig[key], altered[key])) {
          returnObj[key] = altered[key];
        }
      }
      if (!_.isEmpty(returnObj)) {
        return returnObj;
      }
      return null;
    };

    var getCommonMethods = function (mixed) {
      mixed.fetch = function () {
        if (mixed.restangularCollection) {
          return mixed.getList();
        }
        return mixed.get();
      };


      mixed.getRestangular = function () {
        return Restangular;
      };

      mixed.getConfig = function () {
        return $rootScope.config;
      };

      mixed.secureRemove = function (constraint) {
        if (constraint === null) {
          throw 'Parameter must be one of: string | object | function.';
        }
        switch (typeof constraint) {
        case 'string':
          if (this.route === constraint) {
            this.remove();
          } else {
            console.error('Tried to delete a resource type "'
              + this.route + '" when only "' + constraint + '" is permitted');
          }
          break;
        case 'object':
          var checker = _.reduce(constraint, function (res, v, k) {
            if (constraint[k] !== v) {
              res = false;
              return false;
            }
            res = true;
          }, true);
          if (checker) {
            this.remove();
          } else {
            console.error('Tried to delete a resource but constraints do not allow deletion [object, constraints]:', [this, constraint]);
          }
          break;
        case 'function':
          if (constraint(this)) {
            this.remove();
          } else {
            console.error('Tried to delete a resource but constraint fn does not allow deletion [object, function]:', [this, constraint]);
          }
          break;
        default:
          throw 'Parameter must be one of: string | object | function.';
        }
      };

      mixed.getExtra = function (extra) {
        var range, sort, expand;
        if (extra.range === undefined) {
          range = $.grep(extra['arguments'], function (a) {
            return typeof a === 'object' && a.hasOwnProperty('_offset');
          })[0] || {};
        } else {
          range = {
            '_offset': extra.range[0],
            '_limit': extra.range[1]
          };
        }
        sort = extra.sorting ? {'_sort': extra.sorting} : null;
        expand = extra.expand ? {'_expand': extra.expand} : null;
        return _.merge(range, sort, expand);
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

    return getCommonMethods;
  };
});
