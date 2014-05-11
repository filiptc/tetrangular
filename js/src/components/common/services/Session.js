define(function () {
  'use strict';
  return function ($q, $rootScope, ipCookie, Data, Events, FlashMessages) {
    var authenticated = false;
    var self = this;

    this.user = null;

    var setUser = function (user) {
      if (user.token === undefined && this.user) {
        user.token = this.user.token;
      }
      this.user = user;
    };

    this.getUser = function () {
      return this.user;
    };

    this.flush = function () {
      authenticated = false;
      this.user = null;
    };
  };
});
