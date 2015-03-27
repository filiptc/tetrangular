define([
  'components/example/dataModels/collection',

  'components/common/dataModels/collection'
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
