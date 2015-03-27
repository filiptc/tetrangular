// This is basically a wrapper around $rootScope events
define(function () {
  'use strict';

  var filterStack = function (stackItem) {
    return (stackItem.indexOf('/components/') !== -1 || stackItem.indexOf('/handlers/') !== -1);
  };

  var getStacktrace = function(scope) {
    if (!Error.captureStackTrace) {
      return [];
    }
    var obj = {};
    Error.stackTraceLimit = Infinity;
    Error.captureStackTrace(obj, scope);
    Error.stackTraceLimit = 10;
    return obj.stack.split('\n    at ').slice(1);
  };

  return ['$rootScope', function ($rootScope) {
    this.on = function (eventName, callback, scope) {
      console.debug('[Event] "' + eventName + '" listener added' + (scope?' on scope $id ' + scope.$id:' on rootScope') + '. StackTrace: \n', getStacktrace(this.on).filter(filterStack).join('\n '));
      if (scope) {
        return scope.$on(eventName, callback);
      }
      return $rootScope.$on(eventName, callback);
    };

    this.broadcast = function (eventName, data) {
      console.debug('[Event] "' + eventName + '" broadcasted. StackTrace: \n', getStacktrace(this.broadcast).filter(filterStack).join('\n '));
      return $rootScope.$broadcast(eventName, data);
    };

    this.emit = function (eventName, data) {
      console.debug('[Event] "' + eventName + '" emitted. StackTrace: \n', getStacktrace(this.emit).filter(filterStack).join('\n '));
      return $rootScope.$emit(eventName, data);
    };
  }];
});
