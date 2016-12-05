(function() {
    'use strict';

    angular
        .module('app.ui')
        .directive('autoLoader', autoLoaderDirective);

    autoLoaderDirective.$inject = [];

    function autoLoaderDirective() {
        return {
            restrict: 'A',
            scope: {
              'autoLoader': '&'
            },
            link: link
        };
    }

    function link($scope, element, attrs) {
      var $container = $(element);
      var scrolledToBottom = false;
      var previousMax = 0;

      $container.scroll(function() {
        if ($container.scrollTop() + $container.innerHeight() >= $container.prop("scrollHeight")) {
          if (!scrolledToBottom) {
            $scope.$apply(function() {
                $scope.autoLoader();
            });
          }
          scrolledToBottom = true;
        } else {
          scrolledToBottom = false;
        }
      });
    }

})();