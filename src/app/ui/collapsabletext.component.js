(function() {
  'use strict';

  angular
    .module('app.ui')
    .component('collapsableText', {
      templateUrl: 'app/ui/collapsabletext.template.html',
      controller: CollapsableTextController,
      controllerAs: 'collapsableTextCtrl',
      bindings: {
        text: '<',
        getTerms: '&'
      }
    });

  CollapsableTextController.$inject = ['$filter'];

  function CollapsableTextController($filter) {
    var vm = this;

    var highlighter = $filter('highlighter');

    vm.collapsed = true;
    vm.getCollapsedContent = getCollapsedContent;

    //////////

    init();

    //////////

    function init() {

    }

    function getCollapsedContent() {
      var max = 100;
      var text = (vm.text.length > max ? vm.text.substr(0, max) + "..." : vm.text);

      text = highlighter(text, vm.getTerms());

      return text;
    }
  }

})();