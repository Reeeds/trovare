(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['csv', 'filterColumns'];

  function IssueListController(csv, filterColumns) {
    var vm = this;

    vm.content      = "";
    vm.contentJson  = "";
    vm.sortType     = 'fish'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.search       = '';     // set the default search/filter term
    vm.headers      = [];

    vm.fileLoaded   = fileLoaded;
    vm.orderBy = orderBy;

    //////////

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.contentJson = new csv(fileContent, { header: true }).parse();

      angular.forEach(vm.contentJson[0], function(val, key) {
        vm.headers.push({ title: key });
      });
    }

    function orderBy(val) {
      return val[vm.sortType];
    }
  }
})();
