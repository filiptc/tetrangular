define(function () {
  return function ($rootScope, Events, Session) {
    var showApiError = function (code, e, msg, trace) {
      if ((code || e || msg) === undefined) {
        console.error('API failed with an unhandled exception. Check stdErr.');
      } else if ((e || msg) === undefined) {
        console.error('API failed with error code [' + code + '] and an unhandled exception. Check stdErr.');
      } else {
        console.error('API failed with error code [' + code + '] "' + e + ': ' + msg + '"' + (trace ? '\n  Trace:' + trace : ''));
      }
    };

    var setCode = function (code) {
      $rootScope.errorCode = code;
    };

    var errorInterceptor = function (response) {
      var code = response.data.code || response.status;
      var exception = response.data.exception || response.data.type;
      var message = response.data.message;
      var trace = response.data.trace ? '\n\t' + response.data.trace.join('\n\t') : null;
      switch (response.status) {
      case 403:
        if ((/\/login$/g).test(response.config.url)) {
          return true;
        }
      case 401:
        showApiError(code, exception, message, trace);
        Session.flush();
        return true;
      case 404:
        setCode(404);
        showApiError(code, exception, message, trace);
        return true;
      case 500:
        setCode(500);
        showApiError(code, exception, message, trace);
        return true;
      default:
        showApiError(code, exception, message, trace);
        return true;
      }
    };

    return errorInterceptor;
  };
});
