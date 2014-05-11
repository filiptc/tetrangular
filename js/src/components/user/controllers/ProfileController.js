define(function () {
  'use strict';
  return {
    'resolve': {
      'user': function ($stateParams, Resource, Session) {
        return Resource('user').getBySlug($stateParams.userSlug).then(function (u) {
          if (Session.getUser().slug === $stateParams.userSlug) {
            return Session.getUser();
          }
          return u[0] || u;
        }).catch(function () {
          return u[0] || u;
        });
      }
    },
    'controller': function ($scope, $state, user) {
      $scope.user = user;
    }
  };
});
