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
      restrict: 'A',
      scope: {
        loadingText: '@',
        offsetBottom: '@',
        waitDuration: '@'
      },
      link: function($scope, element, attrs) {
        element.css('visibility', 'hidden');
        $scope.lazyLoading = false;
        var loadingText = $scope.loadingText || 'loading...';
        var offsetBottom = !isNaN(parseInt($scope.offsetBottom)) ? parseInt($scope.offsetBottom) : 10;
        //to prevent loading too often
        var waitDuration = !isNaN(parseInt($scope.waitDuration)) ? parseInt($scope.waitDuration) : 500;
        var allLoaded = false;

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

        var elementDom = element[0];
        var bottomed = true, firstTime = true;
        window.addEventListener('scroll', scrollHandler, false);
        function scrollHandler() {
          if($scope.lazyLoading || allLoaded) return;
          var position = elementDom.getBoundingClientRect();
          var screenHeight = screen.availHeight;
          if(!bottomed && !firstTime) return;
          if(screenHeight - position.bottom >= offsetBottom) {
            firstTime = false;
            element.html(loadingText);
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
