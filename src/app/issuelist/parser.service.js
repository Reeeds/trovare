(function() {
  "use strict";

  angular
    .module('app.issueList')
    .factory('parserService', parserService);

  parserService.$inject = [];

  function parserService() {
    var parsed = {};

    var service = {
      parse: parse,
      getSearchWords: getSearchWords
    };

    return service;

    //////////

    function parse(searchText) {
      if (angular.isDefined(parsed[searchText])) {
        return parsed[searchText];
      }

      var matches = {};
      var output = {};
      var parsedSearchText = searchText;

      // --"EXCLUDE WORDS"
      output = checkPattern(/(?:\-\-)(?:(?:")([^\"]*)(?:\"))/g, parsedSearchText, 1);
      matches["exclude"] = output.matches;
      parsedSearchText = output.text;

      // "MATCH THIS"|"OR THIS"
      output = checkPattern(/\"([^\|\"]+)\"\|\"([^\"]+)\"/g, parsedSearchText, 1, 2);
      matches["matchOr"] = output.matches;
      parsedSearchText = output.text;

      // COLUMNKEY:"VALUE WITH SPACE"
      output = checkPattern(/\b([^\s\"]+):\"([^\"]+)\"/g, parsedSearchText, 1, 2);
      matches["keySearch"] = output.matches;
      parsedSearchText = output.text;

      // "MATCH WORDS"
      output = checkPattern(/(?:(?:")([^\"]*)(?:\"))/g, parsedSearchText, 1);
      matches["match"] = output.matches;
      parsedSearchText = output.text;

      // --EXCLUDETHIS
      output = checkPattern(/(?:\-\-)([^\s]*)/g, parsedSearchText, 1);
      matches["exclude"] = matches["exclude"].concat(output.matches);
      parsedSearchText = output.text;

      // MATCHTHIS|ORTHIS
      output = checkPattern(/\b([^\|][\S]+)\|([\S]+)\b/g, parsedSearchText, 1, 2);
      matches["matchOr"] = matches["matchOr"].concat(output.matches);
      parsedSearchText = output.text;

      // COLUMNKEY:VALUE
      output = checkPattern(/\b([^\s]+):([^\s]+)\b/g, parsedSearchText, 1, 2);
      matches["keySearch"] = matches["keySearch"].concat(output.matches);
      parsedSearchText = output.text;

      // MATCHTHIS
      output = checkPattern(/\b[\S]+\b/g, parsedSearchText, 0);
      matches["match"] = matches["match"].concat(output.matches);
      parsedSearchText = output.text;

      parsed[searchText] = matches;
      return matches;
    }

    function getSearchWords(searchText) {
      var matches = parse(searchText);
      var searchWords = [];

      angular.forEach(matches.matchOr, function(matchOr) {
        searchWords.push(matchOr.first);
        searchWords.push(matchOr.second);
      });

      angular.forEach(matches.match, function(match) {
        searchWords.push(match);
      });

      return searchWords;
    }

    function checkPattern(pattern, text, index, index2) {
        var result = { matches: [], text: "" }
        var match;

        do {
            match = pattern.exec(text);
            if (match) {
                if (typeof(index2) !== 'undefined') {
                  result.matches.push({ "first": match[index].trim(), "second": match[index2].trim() });
                } else {
                  result.matches.push(match[index].trim());
                }
            }
        } while (match);

        result.text = text.replace(pattern, "");
        return result;
    }
  }
})();