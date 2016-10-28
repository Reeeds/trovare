(function() {
  'use strict';

  angular
    .module('app.issueList')
    .value('filterColumns', ['Fehlerklasse', 'Param-Team', 'Status', 'Erfasser', 'Zugewiesen an', 'Externer Bearbeiter'])
    .value('collapsableColumns', ['Beschreibung', 'Kommentare'])
     .value('externalLinks', [
      {
        match: {
          value: 'Avaloq',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://www.community.avaloq.com/community/iss/edit_view.cfm?issue_id=',
          field: 'Externer Bearbeiter Ref.'
        }
      }
    ]);


})();
