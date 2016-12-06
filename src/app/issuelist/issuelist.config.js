(function() {
  'use strict';

  angular
    .module('app.issueList')
    .value('filterColumns', ['Fehlerklasse', 'Param-Team', 'Status', 'Erfasser', 'Zugewiesen an', 'Externer Bearbeiter'])
    .value('collapsableColumns', ['Beschreibung', 'Kommentare'])
    .value('columnHeaders', {
      'Entwicklungs-Team':        'Team',
      'Issue ID':                 'ID',
      'Fehlerklasse':             'Prio',
      'Externer Bearbeiter':      'Ext. Bearbeiter',
      'Externer Bearbeiter Ref.': 'Ext. Bearbeiter Ref.',
      'Zugewiesen an':            'Zugew. an',
      'Planung Entwicklung':      'Planung Entw.'
    })
    .value('singleLineColumns', ['Entwicklungs-Team', 'Fehlerklasse'])
    .value('colourColumns', [
      {
        column: 'Fehlerklasse',
        colors: {
          'A - Critical': 'red',
          'B - High':     'orange',
          'C - Medium':   'yellow',
          'D - Low':      'green'
        }
      }
    ])
    .value('externalLinks', [
      {
        match: {
          value: 'Avaloq',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://www.community.avaloq.com/community/iss/edit_view.cfm?issue_id=',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      },
      {
        match: {
          value: 'ti&m',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://redmine.ti8m.ch/issues/',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      },
      {
        match: {
          value: 'ergon',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://secure.ergon.ch/jira/browse/LUKBMEDEXT-',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      }
    ]);


})();



