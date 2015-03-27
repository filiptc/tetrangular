define(function () {
  'use strict';
  return function ($rootScope, $state, CONFIG, Events, Session, FlashMessages) {

    var USERFRIENDLY_EXCEPTION = 'Oops, you shouldn\'t be seeing this! Something went terribly wrong.';

    var redirectTo = function (event, toState) {
      return function () {
        if (toState.data && toState.data.authRequired && !Session.isAuthenticated()) {
          console.log('[Directive][Controller][StateChange] Route requires authentication! Not authenticated!');
          if (CONFIG.beta) {
            Events.broadcast('showModal', {'name': 'minilogin', 'url': '/templates/common/modals/minilogin.html'});
          } else {
            Events.broadcast('showModal', {'name': 'login', 'url': '/templates/common/modals/login.html'});
          }
          Events.broadcast('$stateChangeSuccess');
          $state.go('home');
          event.preventDefault();
        }
      };
    };

    var startHandler = function (event, toState) {
      console.log('[Directive][Controller][StateChange] Starting state change towards "' + toState.name + '"');
      $rootScope.errorCode = null;
      Events.broadcast('startLoading');
      Session.getUserPromise().finally(redirectTo(event, toState));
    };

    var successHandler = function (event, toState) {
      console.log('[Directive][Controller][StateChange] Finished loading state' + (toState ? ' "' + toState.name + '"' : ''));
      Events.broadcast('endLoading');
    };

    var errorHandler = function (event, toState, toParams, fromState, fromParams, error) {
      console.log('[Directive][Controller][StateChange] Error loading state "' + toState.name + '"');
      var dataMessage = {
        'level': 9,
        'message': CONFIG.debug && error ? error.message || USERFRIENDLY_EXCEPTION : USERFRIENDLY_EXCEPTION,
        'errorData': error.stack
      };

      FlashMessages.set(dataMessage);
      Events.broadcast('errorLoading');
      if (error instanceof Error) {
        throw error;
      }
    };

    Events.on('$stateChangeStart', startHandler);
    Events.on('$stateChangeSuccess', successHandler);
    Events.on('$stateChangeError', errorHandler);
  };
});
