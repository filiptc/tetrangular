define(function () {
  'use strict';
  return {
    'resolve': {
      'user': function (Session) {
        return Session.getUser();
      }
    },
    'controller': function ($scope, user) {
      $scope.user = user;
    }
  };
});
