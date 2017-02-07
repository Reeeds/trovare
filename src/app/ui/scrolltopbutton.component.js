(function() {
  'use strict';

  angular
    .module('app.ui')
    .component('scrollTopButton', {
      templateUrl: 'app/ui/scrolltopbutton.template.html',
      controller: ScrollTopButtonController,
      controllerAs: 'scrollTopBtnCtrl',
      bindings: {
        containerSelector: '@'
      }
    });

  function ScrollTopButtonController() {
    var vm = this;

  }

})();