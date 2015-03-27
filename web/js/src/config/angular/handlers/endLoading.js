define(function () {
  'use strict';
  return function ($rootScope, CONFIG, Events) {
    var lastTimeout, inCycle;
    var off = $rootScope.$watch(function () {
      if (!inCycle) {
        Events.broadcast('newDigest');
      }
      inCycle = true;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        off();
        window.prerenderReady = true;
        inCycle = false;
        Events.broadcast('readyLoaded');
        console.log('[Prerender.io] Done loading');
      }, CONFIG.prerender.timeout);
    });
  };
});
