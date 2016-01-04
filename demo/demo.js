
angular.module('demo', ['lazyload'])
  .controller('Demo', function($scope, $timeout) {
    var temp = {
      text: 'test'
    };
    var tempList = [];
    for(var i = 0; i < 5; i++) {
      tempList.push(temp);
    }
    $scope.list = [];
    $scope.list = $scope.list.concat(tempList);
    $scope.$on('lazyLoading', function () {
      $timeout(function() {
        $scope.list = $scope.list.concat(tempList);
        if($scope.list.length > 15) {
          $scope.$broadcast('allLoaded');
          $scope.list = [{text: 'DONE'}];
          return;
        }
        $scope.$broadcast('lazyLoadingFinished');
      }, 1000);
    });
  });

