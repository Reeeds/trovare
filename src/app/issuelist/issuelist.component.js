(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.template.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['csv', 'filterColumns', 'collapsableColumns', 'singleLineColumns', 'columnHeaders', 'externalLinks', 'parserService'];

  function IssueListController(csv, filterColumns, collapsableColumns, singleLineColumns, columnHeaders, externalLinks, parserService) {
    var vm = this;

    vm.content            = "";
    vm.rows               = "";
    vm.sortType           = '';     // set the default sort type
    vm.sortReverse        = false;  // set the default sort order
    vm.search             = '';     // set the default search/filter term
    vm.headers            = {};
    vm.collapsableColumns = collapsableColumns;
    vm.limitTo            = 50;
    vm.step               = 50;

    vm.getSearchWords = getSearchWords;
    vm.fileLoaded   = fileLoaded;
    vm.orderBy = orderBy;
    vm.loadMore = loadMore;
    vm.appendColumnnFilterToSearch = appendColumnnFilterToSearch;

    /*
    //////////
    var mockData = "";

    mockData += "Issue ID;Titel;Status;Fehlerklasse;Erfasser;Zugewiesen an;Entwicklungs-Team;Planung Entwicklung;Externer Bearbeiter;Externer Bearbeiter Ref.;Prozessbereich;Target Cycle;Target Release\n";
    mockData += "41223;Buchungsdetails | Total Buchungsbetrag wird im PDF nicht angezeigt;Assigned;A - Critical;LU14843;lue0759;ZIW A;R16-7_DEC;Avaloq;;Projekt NTS;;NTS_R2.1\n";
    mockData += "41210;NTS: AFP Administration: EBV-Nummer wird nicht erkannt;Assigned;A - Critical;lu10921;lue0549;ZIW A;;;;Projekt NTS;;\n";
    mockData += "41208;Zahlungsvorlage - Roter Einzahlungsschein - Begünstigtenangaben fehlen;Warten auf Drittlieferant;A - Critical;LU12518;lue0759;ZIW A;R16-7_DEC;Avaloq;280135;Projekt NTS;;NTS_R2.1\n";
    mockData += "41205;Bankbelege: es sind nicht alle Dokumente in einer Mailbox ersichtlich (Folgeissue / Groupmanager Fehler Avaloq);Warten auf Drittlieferant;A - Critical;lue0456;lue0456;ZIW A;R16-7_DEC;Avaloq;280086;Projekt NTS;;NTS_R2.1";

    fileLoaded(mockData);
    */

    function getSearchWords() {
      if (vm.search !== "") {
        return parserService.getSearchWords(vm.search);
      }

      return [];
    }

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.rows = new csv(fileContent, { header: true, cast: false }).parse();
      vm.headers = {};

      angular.forEach(vm.rows[0], function(val, key) {
        vm.headers[key] = {
          title: angular.isDefined(columnHeaders[key]) ? columnHeaders[key] : key,
          collapsable: (vm.collapsableColumns.indexOf(key) !== -1),
          singleLine: (singleLineColumns.indexOf(key) !== -1),
          active: true
        };
      });

      angular.forEach(vm.rows, function(row) {
        row['_trovare'] = {};

        angular.forEach(externalLinks, function(extLink) {
          if (row[extLink.match.field].toLowerCase() == extLink.match.value.toLowerCase()) {
            var fieldValue = (row[extLink.link.field]).toString().match(new RegExp(extLink.link.pattern));
            if (fieldValue !== null) {
              row['_trovare'][extLink.link.field] = (extLink.link.url + fieldValue);
            }
          }
        });
      });
    }

    function orderBy(val) {
      return val[vm.sortType];
    }

    function loadMore() {
      vm.limitTo += vm.step;
    }

    function appendColumnnFilterToSearch(key, text) {
      if (angular.isString(text) && text.length > 0) {
        var newSearchTerm = vm.search;

        if (newSearchTerm !== "") {
          newSearchTerm += " ";
        }

        if (text.indexOf(" ") !== -1) {
          text = '"'+ text + '"';
        }

        newSearchTerm += key + ":" + text;
        vm.search = newSearchTerm;
      }
    }
  }
})();
