define([
  'components/user/dataModels/model',
  'components/product/dataModels/model',

  'components/common/dataModels/model'
], function (
  user,
  product,

  common
) {
  'use strict';
  return {
    'specific': {
      'user': user,
      'product': product,
    },

    'common': common
  };
});
