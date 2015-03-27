define(function () {
  'use strict';
  return {
    'controller': ['Events',
      function (Events) {
        Events.broadcast('errorLoading');
      }
    ]
  };
});

