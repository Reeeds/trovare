(function() {
  'use strict';

  angular
    .module('app.ui')
    .filter('lineBreak', lineBreakFilter);

  lineBreakFilter.$inject = [];

  function lineBreakFilter() {
    return function(content) {
      var result = content;

      if (angular.isString(result)) {
        result = result.replace(/(?:\r\n|\r|\n)/g, '<br />');
      }

      return result;
    }
  }

})();