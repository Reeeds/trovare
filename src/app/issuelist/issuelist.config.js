(function() {
  'use strict';

  angular
    .module('app.issueList')
    .value('filterColumns', ['Fehlerklasse', 'Param-Team', 'Status', 'Erfasser', 'Zugewiesen an', 'Externer Bearbeiter']);
})();
