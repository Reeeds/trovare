(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('multiSearch', multiSearch);

  function multiSearch() {
    return function(items, searchText) {
      if (searchText.trim() === "") return items;

      var filteredItems = new Array();
      var searchItems = parseSearchText(searchText);

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
      }
    });

    return isStringInRow;
  }


  function parseSearchText(searchText) {
    var matches = {};
    var output = {};

    // --"EXCLUDE WORDS"
    output = checkPattern(/(?:\-\-)(?:(?:")([^\"]*)(?:\"))/g, searchText, 1);
    matches["exclude"] = output.matches;
    searchText = output.text;

    // "MATCH THIS"|"OR THIS"
    output = checkPattern(/\"([^\|\"]+)\"\|\"([^\"]+)\"/g, searchText, 1, 2);
    matches["matchOr"] = output.matches;
    searchText = output.text;

    // COLUMNKEY:"VALUE WITH SPACE"
    output = checkPattern(/\b([^\s\"]+):\"([^\"]+)\"/g, searchText, 1, 2);
    matches["keySearch"] = output.matches;
    searchText = output.text;

    // "MATCH WORDS"
    output = checkPattern(/(?:(?:")([^\"]*)(?:\"))/g, searchText, 1);
    matches["match"] = output.matches;
    searchText = output.text;

    // --EXCLUDETHIS
    output = checkPattern(/(?:\-\-)([^\s]*)/g, searchText, 1);
    matches["exclude"] = matches["exclude"].concat(output.matches);
    searchText = output.text;

    // MATCHTHIS|ORTHIS
    output = checkPattern(/\b([^\|][\S]+)\|([\S]+)\b/g, searchText, 1, 2);
    matches["matchOr"] = matches["matchOr"].concat(output.matches);
    searchText = output.text;

    // COLUMNKEY:VALUE
    output = checkPattern(/\b([^\s]+):([^\s]+)\b/g, searchText, 1, 2);
    matches["keySearch"] = matches["keySearch"].concat(output.matches);
    searchText = output.text;

    // MATCHTHIS
    output = checkPattern(/\b[\S]+\b/g, searchText, 0);
    matches["match"] = matches["match"].concat(output.matches);
    searchText = output.text;

    return matches;
  }

  function checkPattern(pattern, text, index, index2) {
      var result = { matches: [], text: "" }
      var match;

      do {
          match = pattern.exec(text);
          if (match) {
          		if (typeof(index2) !== 'undefined') {
              	result.matches.push({ "first": match[index], "second": match[index2] });
              } else {
              	result.matches.push(match[index]);
              }
          }
      } while (match);

      result.text = text.replace(pattern, "");
      return result;
  }

})();