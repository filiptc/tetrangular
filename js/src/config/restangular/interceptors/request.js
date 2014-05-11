define(function () {
  return function (Session, cache) {

    var isAuthRequest = function (model, headers, params) {
      return (model === 'user' && (_.has(params, 'Authenticated') || _.has(headers, 'authorization')));
    };

    var setAuthenticationHeaders = function (op, model, url, headers, params) {
      if (!isAuthRequest(model, headers, params)) {
        var token = Session.getUser() && Session.getUser().token;
        if (token) {
          headers = _.merge(headers, {'Authorization': 'SignedId ' + token});
        }
      }
    };

    var requestInterceptor = function (element, operation, model, url, headers, params) {
      this.defaultHttpFields = _.merge(this.defaultHttpFields, {'cache': cache});
      setAuthenticationHeaders(operation, model, url, headers, params);
      return {
        'headers': headers,
        'params': params,
        'element': element
      };
    };

    return requestInterceptor;
  };
});
