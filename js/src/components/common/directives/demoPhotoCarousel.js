define(function () {
  'use strict';

  var CONTROLS_FADE_TIME_MS = 333;

  return function ($timeout, $window) {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: '/templates/common/carousel/photo.html',
      scope: {
        'photos': '=pfPhotoCarousel',
        'photoSrc': '@pfPhotoSrc'
      },
      link: function(scope, element, attrs) {
        var initCarousel = function () {
          var controls = element.find('.control');
          var currentPosition = 0;

          var getPhotoUrl = function (photo) {
            return eval('photo.' + scope.photoSrc);
          };

          var prefetchPhoto = function (photo) {
            (new Image()).src = getPhotoUrl(photo);
          };

          var prefetchPhotosInArr = function () {
            scope.photos.map(prefetchPhoto);
          };

          var shiftIterator = function (event, targetElem) {
            if (event && (event.keyCode === 39 || targetElem.hasClass('next'))) {
              currentPosition++;
            } else if (event && (event.keyCode === 37 || targetElem.hasClass('prev'))) {
              currentPosition--;
            }
          };

          var handleLowerLimit = function () {
            if (currentPosition >= (scope.photos.length - 1)) {
              currentPosition = scope.photos.length - 1;
              controls.filter('.next').fadeOut(CONTROLS_FADE_TIME_MS);
            } else {
              controls.filter('.next').fadeIn(CONTROLS_FADE_TIME_MS);
            }
          };

          var hanldeUpperLimit = function () {
            if (currentPosition <= 0) {
              currentPosition = 0;
              controls.filter('.prev').fadeOut(CONTROLS_FADE_TIME_MS);
            } else {
              controls.filter('.prev').fadeIn(CONTROLS_FADE_TIME_MS);
            }
          };

          var handleLimits = function () {
            handleLowerLimit();
            hanldeUpperLimit();
          };

          var bindPhotoToScope = function () {
            scope.currentPhoto = getPhotoUrl(scope.photos[currentPosition]);
          };

          var setMainPhoto = function (e) {
            shiftIterator(e, $(this));
            handleLimits();
            $timeout(bindPhotoToScope);
          };

          var deregisterClickListeners = function () {
            controls.off('click', setMainPhoto);
            $($window).off('keydown', setMainPhoto);
          };

          var registerListeners = function () {
            controls.click(setMainPhoto);
            $($window).keydown(setMainPhoto);
          };

          var init = function () {
            setMainPhoto();
            prefetchPhotosInArr();
            registerListeners();
          };

          init();
        };

        var photoArrChangeHandler = function () {
          if (scope.photos) {
            initCarousel();
          }
        };

        scope.$watch('photos', photoArrChangeHandler);
      }
    };
  };
});
