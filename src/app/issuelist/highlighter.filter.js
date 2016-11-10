(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('highlighter', highlighter);

  highlighter.$inject = ['parserService'];

  function highlighter(parserService) {
    var colorClasses = ["color_1", "color_2", "color_3", "color_4", "color_5", "color_6"];

    return function(content, terms) {
      var textContent = escapeHtmlString(content);

      angular.forEach(terms, function(term, idx) {
        textContent = highlightTerm(textContent, term, idx);
      });

      return textContent;
    }

    function highlightTerm(content, term, idx) {
      var color = colorClasses[ idx % colorClasses.length ];
      var regEx = new RegExp('(' + term + ')', 'gi');
      content = content.replace(regEx, '<span class="highlighted ' + color + '">$1</span>');
      return content;
    }

    function escapeHtmlString(string) {
      var tagsToReplace = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

      return string.toString().replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
      });
    }
  }

})();