define(function () {
  'use strict';
  return function () {

    return function (string) {
      var re = /^http:\/\/(?:www\.)?(.+?)(?:\/|$)/;
      var match = string.match(re);
      if (!match) {
        return string;
      }
      return match[1];
    };

  };
});
