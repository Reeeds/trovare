(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('multiSearch', multiSearch);

  multiSearch.$inject = ['parserService'];

  function multiSearch(parserService) {
    return function(items, searchText) {
      if (searchText.trim() === "") return items;

      var filteredItems = new Array();
      var searchItems = parserService.parse(searchText);

      angular.forEach(items, function(row) {
        var isRowSearchResult = true;

        // Check for key search
        angular.forEach(row, function(val, key) {
          var searchKey = key.toString().toLowerCase().replace(/[\s]*/g, "");

          angular.forEach(searchItems["keySearch"], function(keySearch) {
            if (keySearch.first.toString().toLowerCase().replace(/[\s]*/g, "") === searchKey) {
              if (val.toString().toLowerCase().indexOf(keySearch.second.toString().toLowerCase()) === -1) {
                isRowSearchResult = false;
                return false;
              }
            }
          });

          if (!isRowSearchResult) return false;
        });

        // Check for excluded Words
        angular.forEach(searchItems["exclude"], function(excludeItem) {
          if (containsRowString(row, excludeItem)) {
            isRowSearchResult = false;
            return false;
          }
        });

        // Check for matches
        angular.forEach(searchItems["match"], function(matchItem) {
          if (!containsRowString(row, matchItem)) {
            isRowSearchResult = false;
            return false;
          }
        });

        // Check for or-matches
        angular.forEach(searchItems["matchOr"], function(orMatch) {
          if (!containsRowString(row, orMatch.first) && !containsRowString(row, orMatch.second)) {
            isRowSearchResult = false;
            return false;
          }
        });

        if (isRowSearchResult) {
          filteredItems.push(row);
        }
      });

      return filteredItems;
    }
  }

  function containsRowString(row, string) {
    var isStringInRow = false;

    angular.forEach(row, function(val) {
      if (val.toString().toLowerCase().indexOf(string.toString().toLowerCase()) !== -1) {
        isStringInRow = true;
        return false;
      }
    });

    return isStringInRow;
  }

})();