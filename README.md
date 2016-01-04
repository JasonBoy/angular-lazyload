# angular-lazyload
Angular directive for lazy loading, especially for swiping up in mobile when working with pagination, slide up to load more  
  
###Install

`npm install angular-lazyload`

###Usage

`<div lazyload></div>`

```javascript
angular.module('myModule', ['lazyload'])
  .controller('Demo', function($scope){
    function loadMore() {
      //loading more data
      $scope.$broadcast('lazyLoadingFinished');//notify the directive to finish the current loading
      if(noMore) {
        $scope.$broadcast('allLoaded'); //all data loaded, remove all the touch events
      }
    }
    //listen on the user touch event, which will be fired from the directive
    $scope.$on('lazyLoading', function(){
      loadMore();
    });
    
  });
  ;
```  

###Directive Options

**container**: where the touch events should be bound to, default is document.

**swipeText**: content to display when you is sliding up, before releasing the touch, the default text is 'slide up to load more...', you can add some html for better UI.

**loadingText**: content to display when loading the data, default is 'loading...'.

**offsetBottom**: loading div's offset to the window bottom, default: 10, which means when the offset to the bottom >= 10px, you are about to reload data.

**swipeDistance**: how long the user should slide up their finger. default 50(px).

###Events

**lazyLoading**: when you get this event, you should load data now.

**lazyLoadingFinished**: you should notify the directive to finish the current loading.

**allLoaded**: you should notify the directive to finish the lifecycle after you get all data.

###Demo  

see demo in demo dir.





