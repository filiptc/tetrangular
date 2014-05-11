define(
  [
    'components/common/controllers/HomeController',
    'components/product/controllers/ProductController',
    'components/user/controllers/ProfileController',
    'components/user/controllers/SettingsController',
  ],
  function (
    HomeController,
    ProductController,
    ProfileController,
    SettingsController,
  ) {
    'use strict';
    return {
      'controllers': {
        'HomeController': HomeController.controller,
        'ProductController': ProductController.controller,
        'ProfileController': ProfileController.controller,
        'SettingsController': SettingsController.controller,
      },

      'states': [
        {
          'alias': 'home',
          'config': {
            'url': '^/',
            'controller': 'HomeController',
            'templateUrl': '/templates/pages/home.html',
            'resolve': HomeController.resolve
          }
        }, {
          'alias': 'product',
          'config': {
            'url': '^/product/:productId',
            'controller': 'ProductController',
            'templateUrl': '/templates/pages/product.html'
            'resolve': ProductController.resolve
          }
        }, {
          'alias': 'settings',
          'config': {
            'url': '^/settings/:userSlug',
            'controller': 'SettingsController',
            'templateUrl': '/templates/pages/settings.html',
            'resolve': SettingsController.resolve,
            'data': {
              'authRequired': true
            }
          }
        }, {
          'alias': 'profile',
          'config': {
            'url': '^/:userSlug',
            'controller': 'ProfileController',
            'templateUrl': '/templates/pages/profile.html',
            'resolve': ProfileController.resolve
          }
        }, {
          'alias': '404',
          'config': {
            'url': '^/not-found',
            'template': '<h1 style="margin: 10px;font-size: 20px;">404: page not found</h1>'
          }
        }
      ],
      'redirections': [
        {
          'from': '/home',
          'to': '/'
        }
      ]
    };
  }
);
