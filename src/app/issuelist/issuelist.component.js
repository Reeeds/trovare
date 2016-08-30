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
    vm.filters      = {};
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

      angular.forEach(filterColumns, function(filterColumn) {
        vm.filters[filterColumn] = { name: filterColumn, items: [], values: [] };
      });

      angular.forEach(vm.contentJson, function(row, index) {
        angular.forEach(row, function(itemVal, itemName) {
          if (filterColumns.indexOf(itemName) !== -1) {
            if (vm.filters[itemName].values.indexOf(itemVal) === -1) {
              vm.filters[itemName].items.push({ val: itemVal });
              vm.filters[itemName].values.push(itemVal);
            }
          }
        });
      });
    }

    function orderBy(val) {
      return val[vm.sortType];
    }
  }
})();
