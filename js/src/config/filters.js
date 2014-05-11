define([
    'components/common/filters/firstWord',
    'components/common/filters/getDomain'
  ],
  function (
    firstWord,
    getDomain
  ) {
    'use strict';
    return {
      'firstWord': firstWord,
      'getDomain': getDomain
    };
  }
);
