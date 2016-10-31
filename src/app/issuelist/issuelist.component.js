(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['csv', 'filterColumns', 'collapsableColumns', 'externalLinks'];

  function IssueListController(csv, filterColumns, collapsableColumns, externalLinks) {
    var vm = this;

    vm.content            = "";
    vm.contentJson        = "";
    vm.contentJsonLink    = "";
    vm.sortType           = 'fish'; // set the default sort type
    vm.sortReverse        = false;  // set the default sort order
    vm.search             = '';     // set the default search/filter term
    vm.headers            = {};
    vm.collapsableColumns = collapsableColumns;
    vm.limitTo            = 50;
    vm.step               = 50;

    vm.fileLoaded   = fileLoaded;
    vm.orderBy = orderBy;
    vm.loadMore = loadMore;

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

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.contentJson = new csv(fileContent, { header: true }).parse();
      vm.contentJsonLink = {};

      angular.forEach(vm.contentJson[0], function(val, key) {
        vm.headers[key] = {
          title: key,
          collapsable: (vm.collapsableColumns.indexOf(key) !== -1),
          active: true
        };
      });

      angular.forEach(vm.contentJson, function(row) {
        row['_trovare'] = {};

        angular.forEach(externalLinks, function(extLink) {
          if (row[extLink.match.field].toLowerCase() == extLink.match.value.toLowerCase()) {
            row['_trovare'][extLink.link.field] = (extLink.link.url + row[extLink.link.field]);
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
  }
})();
