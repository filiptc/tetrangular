define([
  'components/example/dataModels/model',

  'components/common/dataModels/model'
], function (
  example,

  common
) {
  'use strict';
  return {
    'specific': {
      'example': example
    },

    'common': common
  };
});
