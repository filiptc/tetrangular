define([
  'components/product/dataModels/collection',
  'components/user/dataModels/collection',

  'components/common/dataModels/collection'
], function (
  product,
  user,

  common
) {
  'use strict';
  return {
    'specific': {
      'product': product,
      'user': user,
    },
    'common': common
  };
});
