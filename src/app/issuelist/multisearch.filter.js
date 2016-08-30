(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('multiSearch', multiSearch);

  function multiSearch() {
    return function(items, searchText) {
      if (searchText.trim() === "") return items;

      var filteredItems = new Array();
      var searchItems = splitSearchText(searchText);

      angular.forEach(items, function(row) {
        var foundAllSearchItems = true;

        angular.forEach(searchItems, function(searchItem) {
          var searchItemFound = false;

          angular.forEach(row, function(val) {
            if (val.toString().toLowerCase().indexOf(searchItem.toString().toLowerCase()) !== -1) {
              searchItemFound = true;
              return false;
            }
          });

          if (searchItemFound !== true) {
            foundAllSearchItems = false;
            return false;
          }
        });

        if (foundAllSearchItems) {
          filteredItems.push(row);
        }
      });

      return filteredItems;
    }
  }

  function splitSearchText(searchText) {
    var items = new Array();
    var isContiguousString = false;
    var currentItem = "";

    for(var idx = 0; idx < searchText.length; idx++) {
      var char = searchText.substr(idx, 1);

      switch(char) {
        case '"':
          isContiguousString = !isContiguousString;
          break;

        case ' ':
          if (!isContiguousString && currentItem !== "") {
            items.push(currentItem);
            currentItem = "";
          } else {
            currentItem += char;
          }
          break;

        default:
          currentItem += char;
          break;
      }
    }

    if (currentItem !== "") {
      items.push(currentItem);
    }

    return items;
  }

})();