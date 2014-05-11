define(function () {
  'use strict';
  return function () {

    return function (string) {
      return string.split(/\s|-/)[0];
    };

  };
});
