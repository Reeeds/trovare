(function() {
  'use strict';

  angular
    .module('app.ui')
    .component('collapsableText', {
      templateUrl: 'app/ui/collapsabletext.template.html',
      controller: CollapsableTextController,
      controllerAs: 'collapsableTextCtrl',
      bindings: {
        text: '<'
      }
    });

  CollapsableTextController.$inject = [];

  function CollapsableTextController() {
    var vm = this;

    vm.collapsed = true;
    vm.getCollapsedContent = getCollapsedContent;

    //////////

    init();

    //////////

    function init() {

    }

    function getCollapsedContent() {
      var max = 100;
      return (vm.text.length > max ? vm.text.substr(0, max) + "..." : vm.text);
    }
  }

})();