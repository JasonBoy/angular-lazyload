/**!
 * @license
 * Angular directive for lazy loading while swiping up, especially for swiping up in mobile
 * https://github.com/JasonBoy/angular-lazyload#readme
 * License: MIT
 */

;(function(window, angular) {
  'use strict';
  var app = angular.module('lazyload', []);
  app.directive('lazyload', ['$timeout', function ($timeout){
    return {
      restrict: 'EA',
      scope: {
        loadingText: '@',
        offsetBottom: '@',
        waitDuration: '@',
        scale: '@'
      },
      replace: true,
      link: function($scope, element, attrs) {
        var hasCustomLoadingStyle = !!element.html();
        element.css('visibility', 'hidden');
        $scope.lazyLoading = false;
        $scope.scale || ($scope.scale = 1);
        var loadingText = $scope.loadingText || 'loading...';
        var offsetBottom = !isNaN(Number($scope.offsetBottom)) ? Number($scope.offsetBottom) : 10;
        //to prevent loading too often
        var waitDuration = !isNaN(Number($scope.waitDuration)) ? Number($scope.waitDuration) : 500;
        var allLoaded = false;
        var elementDom = element[0];
        var bottomed = true;
        var firstTime = true;

        $scope.$on('lazyLoadingFinished', function () {
          $scope.lazyLoading = false;
          element.css('visibility', 'hidden');
        });

        $scope.$on('allLoaded', function () {
          allLoaded = true;
          $scope.lazyLoading = false;
          element.css('visibility', 'hidden');
          window.removeEventListener('scroll', scrollHandler, false);
        });

        window.addEventListener('scroll', scrollHandler, false);

        function scrollHandler() {
          if($scope.lazyLoading || allLoaded) return;
          var position = elementDom.getBoundingClientRect();
          var screenHeight = screen.availHeight;
          if(!bottomed && !firstTime) return;
          if(screenHeight - position.bottom * $scope.scale >= offsetBottom) {
            firstTime = false;
            if(!hasCustomLoadingStyle) {
              element.html(loadingText);
            }
            $scope.lazyLoading = true;
            element.css('visibility', 'visible');
            $timeout(function() {
              $scope.$emit('lazyLoading');
            }, waitDuration);
          }
        }
      }
    };
  }]);

})(window, window.angular);
