(function() {
  'use strict';

  angular
    .module('app.csvjs')
    .factory('csv', csvService);

  csvService.$inject = ['$window'];

  function csvService($window) {
    if($window.CSV){
      //Delete moment from window so it's not globally accessible.
      //  We can still get at it through _thirdParty however, more on why later
      $window._thirdParty = $window._thirdParty || {};
      $window._thirdParty.CSV = $window.CSV;
      try { delete $window.CSV; } catch (e) {$window.CSV = undefined;
      /*<IE8 doesn't do delete of window vars, make undefined if delete error*/}
    }
    var csv = $window._thirdParty.CSV;
    return csv;
  }

})();