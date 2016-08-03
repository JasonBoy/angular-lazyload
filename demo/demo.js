
angular.module('demo', ['lazyload'])
  .controller('Demo', function($scope, $timeout) {
    var temp = 0;
    var tempList = [];
    for(var i = 0; i < 10; i++) {
      temp++;
      tempList.push(temp);
    }
    $scope.list = [];
    $scope.list = $scope.list.concat(tempList);
    $scope.$on('lazyLoading', function () {
      $timeout(function() {
        tempList = [];
        for(var i = 0; i < 10; i++) {
          temp++;
          tempList.push(temp);
        }
        $scope.list = $scope.list.concat(tempList);
        if($scope.list.length > 50) {
          $scope.$broadcast('allLoaded');
          $scope.list = [{text: 'DONE'}];
          return;
        }
        $scope.$broadcast('lazyLoadingFinished');
      }, 1000);
    });
  });

