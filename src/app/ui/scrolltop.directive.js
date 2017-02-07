(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('scrollTop', scrollTopDirective);

  function scrollTopDirective() {
    return {
      restrict: 'A',
      scope: {
        'scrollTop': '<'
      },
      link: link
    };

    function link($scope, element, attrs) {
      element.click(function() {
        var $container = $($scope.scrollTop);
        $container.animate({ scrollTop: 0 }, 300);
      });
    }
  }

})();