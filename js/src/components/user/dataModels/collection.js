define(function () {
  'use strict';
  return function (users) {

    var newUserMock = {
      'email': '',
      'name': '',
      'pass': '',
      'status': 'subscribed'
    };

    users.getNew = function () {
      var Q = users.getQ();
      var deferredUser = Q.defer();
      deferredUser.resolve(newUserMock);
      return deferredUser.promise;
    };

    return users;
  };
});
