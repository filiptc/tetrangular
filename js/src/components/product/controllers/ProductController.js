define(function () {
  'use strict';
  return {
    'resolve': {
      'product': function ($stateParams, Resource) {
        return Resource('product', $stateParams.productId);
      }
    },
    'controller': function ($scope, product) {
      $scope.product = product;
    }
  };
});
