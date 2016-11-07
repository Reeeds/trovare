(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('highlighter', highlighter);

  highlighter.$inject = ['parserService', '$sanitize', '$sce'];

  function highlighter(parserService, $sanitize, $sce) {
    var colorClasses = ["yellow", "green", "orange", "blue", "purple", "red"];

    return function(content, terms) {
      var textContent = escapeHtmlString(content); //$sanitize(content);

      if (content.toString().indexOf("QC-40821") !== -1) {
        console.log(textContent);
      }

      angular.forEach(terms, function(term, idx) {
        textContent = highlightTerm(textContent, term, idx);
      });

      return $sce.trustAsHtml(textContent);
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