define(function () {
  return function ($q, Restangular, config, cache) {

    var embeddedKey = config.api.responseSchema.embedded;
    var documentsKey = config.api.responseSchema.level2;

    var printApiCommunications = function (data, operation, url, response) {
      var paramObj = response.config.params || response.config.data || null;
      var params = (paramObj && !paramObj.hasOwnProperty('all') ? '?' + $.param(paramObj) : '');
    };

    var aliasPrivateProps = function (data) {
      if (_.isArray(data)) {
        return data.map(aliasPrivateProps);
      }

      var prop;
      for (prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (angular.isArray(data[prop])) {
            data[prop] = data[prop].map(aliasPrivateProps);
          }
          if (angular.isObject(data[prop])) {
            data[prop] = aliasPrivateProps(data[prop]);
          }
          if (prop.substr(0, 1) === '_') {
            var newKey = prop.substr(1) + 'Alias';
            data[newKey] = data[prop];
          }
        }
      }
      return data;
    };

    var isList = function (operation) {
      return operation === 'getList';
    };

    var extractList = function (data) {
      return data[embeddedKey][documentsKey];
    };

    var isListEmpty = function (data) {
      return data[embeddedKey] === undefined || data[embeddedKey][documentsKey] === undefined;
    };

    var restangularize = function (element) {
      if (!element._links || !element._links.self || !element._links.self.href) {
        return element;
      }
      var route = element._links.self.href.split('/').slice(-2, -1)[0];
      return Restangular.restangularizeElement(null, element, route);
    };

    var extractEmbedded = function (data) {
      if (angular.isArray(data)) {
        return data.map(extractEmbedded);
      }
      var prop;
      for (prop in data[embeddedKey]) {
        if (data[embeddedKey].hasOwnProperty(prop)) {
          data[prop] = restangularize(data[embeddedKey][prop]);
          if (data[embeddedKey][prop][embeddedKey] || angular.isArray(data[embeddedKey][prop])) {
            data[embeddedKey][prop] = extractEmbedded(data[embeddedKey][prop]);
          }
        }
      }
      return data;
    };

    var filterResponse = function (data, operation, url, response) {
      var embedded, aliasedData;
      if (isList(operation)) {
        if (isListEmpty(data)) {
          data = [];
        } else {
          data = extractList(data);
        }
      }
      embedded = extractEmbedded(data);
      aliasedData = aliasPrivateProps(embedded);
      return aliasedData;
    };

    var storeObjectInCache = function (route, resource) {
      var typeSlug = route + '/' + resource.slug;
      if (resource.slug && !cache.get(typeSlug)) {
        var slugDeferred = $q.defer();
        slugDeferred.resolve(restangularize(resource));
        cache.put(typeSlug, slugDeferred.promise);
      }
    }

    var storeSlugInCache = function (route, resource) {
      switch(route) {
        case 'look':
        case 'product':
        case 'user':
        case 'keyword':
        case 'group':
          storeObjectInCache('slug', {
            '_links': {
              'document': {
                'href': resource._links.self.href
              },
              'self': {
                'href': '/discovery/slug/mockId',
                'name': 'mockId',
                'title': 'mockTitle'
              }
            },
            'document': resource.id,
            'id': 'mockId',
            'slug': resource.slug
          });
          break;
      }
    }

    var storeInCache = function (apiUrl, resources, response, operation) {
      var i, linkUrl, idCache, typeSlug, route, dataLength = resources.length;
      for (i = 0; i < dataLength; i++) {
        linkUrl = apiUrl + resources[i]._links.self.href;
        if (!cache.get(linkUrl) || operation !== 'get' || operation !== 'getList') {
          idCache = [response.status, JSON.stringify(resources[i]), response.headers()];
          cache.put(linkUrl, idCache);
        }
        route = resources[i]._links.self.href.split('/').slice(-2, -1)[0];
        storeObjectInCache(route, resources[i]);
        storeSlugInCache(route, resources[i])
      }
    };

    var findResources = function (data) {
      var resources = [];
      if (data && data._links && data._links.self && data._links.self.href) {
        resources.push(data);
      }
      if (angular.isObject(data) || angular.isArray(data)) {
        angular.forEach(data, function (child) {
          if (angular.isObject(child) || angular.isArray(child)) {
            resources = resources.concat(findResources(child));
          }
        });
      }
      return resources;
    };

    var fillCacheFromResponse = function (data, operation, response) {
      var resources = [];
      if (data._embedded && data._embedded.resources) {
        data._embedded.resources.map(function (resource) {
          resources = resources.concat(findResources(resource));
        });
      } else {
        resources = findResources(data);
      }
      var apiUrl = config.api.protocol + '://' + config.api.domain + (config.api.port ? ':' + config.api.port : '');
      storeInCache(apiUrl, resources, response, operation);
    };

    var getRawData = function (response, url) {
      return {
        'request': {
          'headers': response.config.headers,
          'params': response.config.params || {},
          'method': response.config.method,
          'url': url
        },
        'response': {
          'status': response.status,
          'data': _.clone(response.data),
          'headers': response.headers()
        }
      };
    };

    var responseInterceptor = function (data, operation, what, url, response) {
      printApiCommunications(data, operation, url, response);
      fillCacheFromResponse(data, operation, response);
      var filteredResponse = filterResponse(data, operation, url, response);
      filteredResponse._RAW = getRawData(response, url);
      return filteredResponse;
    };

    return responseInterceptor;
  };
});
