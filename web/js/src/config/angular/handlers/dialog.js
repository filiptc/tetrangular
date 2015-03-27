define(function () {
  'use strict';
  return function ($rootScope, Events, Dialog) {
    var dialogUrl = '/templates/common/modals/dialog.html';

    var dialogHandler = function (newDiag, oldDiag) {
      if (newDiag) {
        Events.broadcast('showModal', {name: 'dialog', url: dialogUrl});
      } else if (oldDiag) {
        Events.broadcast('hideModal', 'dialog');
      }
    };

    var dialogWatcher = function () {
      return Dialog.get();
    };

    $rootScope.$watch(dialogWatcher, dialogHandler);
  };
});
