/**
 * @license
 * Angular directive for lazy loading while swiping up, especially for swiping up in mobile
 * https://github.com/JasonBoy/angular-lazyload#readme
 * License: MIT
 */

(function(window, angular) {
  'use strict';
  var app = angular.module('lazyload', []);
  app.directive('lazyload', [function (){
    return {
      restrict: 'A',
      scope: {
        container: '@', // on which touch events are bound on, default is document
        swipeText: '@',
        loadingText: '@',
        offsetBottom: '@',
        swipeDistance: '@'
      },
      link: function($scope, element, attrs) {
        element.css('visibility', 'hidden');
        $scope.lazyLoading = false;
        var swipeText = $scope.swipeText || 'slide up to load more...',
            loadingText = $scope.loadingText || 'loading...';
        element.html(swipeText);
        var container = $scope.container ? document.querySelector($scope.container) : window.document;
        var offsetBottom = !isNaN(parseInt($scope.offsetBottom)) ? parseInt($scope.offsetBottom) : 10;
        var swipeDistance = !isNaN(parseInt($scope.swipeDistance)) ? parseInt($scope.swipeDistance) : 50;
        var needReloading = false;
        var startY = 0, moveY = 0, allLoaded = false;

        container.addEventListener('touchstart', touchStartHandler);
        container.addEventListener('touchmove', touchMoveHandler);
        container.addEventListener('touchend', touchEndHandler);

        $scope.$on('lazyLoadingFinished', function () {
          $scope.lazyLoading = false;
          element.css('visibility', 'hidden');
        });
        $scope.$on('allLoaded', function () {
          allLoaded = true;
          element.css('visibility', 'hidden');
          container.removeEventListener('touchstart', touchStartHandler);
          container.removeEventListener('touchmove', touchMoveHandler);
          container.removeEventListener('touchend', touchEndHandler);
        });
        function touchStartHandler(e) {
          startY = e.changedTouches[0].pageY;
        }
        function touchMoveHandler(e) {
          if($scope.lazyLoading || allLoaded) return;
          var position = element[0].getBoundingClientRect();
          moveY = e.changedTouches[0].pageY;
          needReloading = window.screen.availHeight - position.bottom > offsetBottom;
          if(needReloading) {
            element.html(swipeText);
            element.css('visibility', 'visible');
          }
        }
        function touchEndHandler(e) {
          if(!allLoaded && needReloading && startY - moveY >= swipeDistance) {
            element.html(loadingText);
            $scope.lazyLoading = true;
            $scope.$emit('lazyLoading');
            return;
          }
          element.css('visibility', 'hidden');
        }
      }
    };
  }]);
})(window, window.angular);
