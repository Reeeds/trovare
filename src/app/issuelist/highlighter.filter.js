(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('highlighter', highlighter);

  highlighter.$inject = ['parserService'];

  function highlighter(parserService) {
    var styleClasses = ["style-1", "style-2", "style-3", "style-4", "style-5", "style-6"];

    return function(content, terms) {
      var textContent = escapeHtmlString(content);

      angular.forEach(terms, function(term, idx) {
        textContent = highlightTerm(textContent, term, idx);
      });

      return textContent;
    }

    function highlightTerm(content, term, idx) {
      var style = styleClasses[ idx % styleClasses.length ];
      var regEx = new RegExp('(' + term + ')', 'gi');
      content = content.replace(regEx, '<span class="is-highlighted--' + style + '">$1</span>');
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