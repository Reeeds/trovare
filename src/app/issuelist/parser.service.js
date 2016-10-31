(function() {
  "use strict";

  angular
    .module('app.issueList')
    .factory('parserService', parserService);

  parserService.$inject = [];

  function parserService() {
    var service = {
      parse: parse
    };

    return service;

    //////////

      function parse(searchText) {
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
  }
})();