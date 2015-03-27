define(function () {
  return function (cache) {

    var filterStack = function (e) {
      return e.indexOf('/components/') !== -1 || e.indexOf('/handlers/') !== -1;

    };
    var getStacktrace = function() {
      if (!Error.captureStackTrace) {
        return [];
      }
      var obj = {};
      Error.stackTraceLimit = Infinity;
      Error.captureStackTrace(obj, requestInterceptor);
      Error.stackTraceLimit = 10;
      return obj.stack.split('\n    at ').slice(1);
    };

    var requestInterceptor = function (element, operation, model, url, headers, params) {
      this.defaultHttpFields = _.merge(this.defaultHttpFields, {'cache': cache});
      console.log(
        '[Request][' + model.charAt(0).toUpperCase() + model.slice(1)
        + '] About to request: ', arguments, '\n\nTrace:\n '
        + getStacktrace().filter(filterStack).join('\n ')
      );
      return {
        'headers': headers,
        'params': params,
        'element': element
      };
    };

    return requestInterceptor;
  };
});
