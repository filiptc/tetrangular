define(function () {
  return function () {

    var isFunction = function (value) {
      return typeof value !== 'function';
    };

    var getParams = function (params) {
      if (params && !params.hasOwnProperty('all')) {
        return _.pick(params, isFunction);
      }
      return '';
    };

    var printApiCommunications = function (data, operation, url, response) {
      var paramObj = response.config.params || response.config.data || null;
      var params = getParams(paramObj);
      console.log(
        '[Response] ' + operation + ' on ' + url + ' with params: ',
        params,
        ' returned status [' + response.status + ']' + (data ? ' with data:' : ''),
        data
      );
    };

    return function (data, operation, what, url, response) {
      printApiCommunications(data, operation, url, response);
      return data;
    };
  };
});
