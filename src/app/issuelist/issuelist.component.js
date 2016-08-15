(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['convert', 'filterColumns'];

  function IssueListController(convert, filterColumns) {
    var vm = this;

    vm.content = "";
    vm.contentJson = "";
    vm.sortType     = 'fish'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchFish   = '';     // set the default search/filter term
    vm.fileLoaded = fileLoaded;
    vm.filters = {};

    //////////

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.contentJson = JSON.parse(convert.csvToJson(fileContent));

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
  }
})();
