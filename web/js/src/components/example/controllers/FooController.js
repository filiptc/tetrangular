define(function () {
  'use strict';
  return {
    'resolve': {
      'foo': ['$stateParams',
        function ($stateParams) {
          // return promise
        }
      ]
    },
    'controller': ['$scope', '$state', 'foo',
      function ($scope, $state, foo) {
        // do stuff
      }
    ]
  };
});
