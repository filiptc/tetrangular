define(function () {
  'use strict';
  return function (user) {

    user.getPhoto = function () {
      var defaultPicture = user.getConfig().user.defaultPhoto;
      var hasPhoto = (Boolean(user.avatar) && Boolean(user.avatar.key));
      return hasPhoto ? 'http://' + user.avatar.bucket + '/' + user.avatar.key : defaultPicture;
    };

    return user;
  };
});
