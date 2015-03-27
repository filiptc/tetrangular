define(function () {
  return function ($rootScope) {
    var showApiError = function (code, e, msg, trace) {
      if ((code || e || msg) === undefined) {
        console.error('API failed with an unhandled exception. Check stdErr.');
      } else if ((e || msg) === undefined) {
        console.error('API failed with error code [' + code + '] and an unhandled exception. Check stdErr.');
      } else {
        console.error('API failed with error code [' + code + '] "' + e + ': ' + msg + '"' + (trace ? '\n  Trace:' + trace : ''));
      }
    };

    return function (response) {
      var code = response.data.code || response.status;
      var exception = response.data.exception || response.data.type;
      var message = response.data.message;
      var trace = response.data.trace ? '\n\t' + response.data.trace.join('\n\t') : null;
      switch (response.status) {
      // case HTTP_STATUS_CODE:
        //example 401
        //return true;
      default:
        showApiError(code, exception, message, trace);
        return true;
      }
    };
  };
});
