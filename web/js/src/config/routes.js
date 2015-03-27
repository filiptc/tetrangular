define([
  'components/example/controllers/FooController'
], function (
  FooController
) {
  'use strict';
  return {
    'controllers': {
      'FooController': FooController.controller
    },

    'states': [
      {
        'alias': 'home',
        'config': {
          'url': '^/',
          'controller': 'FooController',
          'templateUrl': '/templates/pages/home.html',
          'resolve': FooController.resolve
        }
      }, {
        'alias': '404',
        'config': {
          'url': '^/not-found',
          'controller': 'NotFoundController',
          'templateUrl': '/templates/pages/404.html'
        }
      }
    ],
    'redirections': [
      /*{
        'from': '/example',
        'to': '/example/foo'
      }*/
    ]
  };
});
