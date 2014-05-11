define(
  [],
  function () {
    return function (app, config) {
      app.run(function ($rootScope, Events) {
        $rootScope.config = config;
      });
    };
  }
);
