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
      'Externer Bearbeiter':      'Extern',
      'Externer Bearbeiter Ref.': 'Ref.',
      'Zugewiesen an':            'Zugew.',
      'Planung Entwicklung':      'Planung Entw.',
      'Problem-Melder':           'Melder',
      'Erstellt am':              'Erstellt',
      'Geändert am':              'Geändert',
      'Issue Typ':                'Typ'
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
    .value('multiColumns', [
      [ "Erfasser", "Zugewiesen an", "Problem-Melder" ],
      [ "Externer Bearbeiter", "Externer Bearbeiter Ref." ],
      [ "Erstellt am", "Geändert am" ],
      [ "Target Cycle", "Target Release" ]
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



