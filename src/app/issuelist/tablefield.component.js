(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('tableField', {
      templateUrl: 'app/issuelist/tablefield.template.html',
      controller: TableFieldController,
      controllerAs: 'tableFieldCtrl',
      bindings: {
        headers: '<',
        row: '<',
        key: '<',
        val: '<',
        getSearchWords: '&',
        autoCopy: '<?'
      }
    });

  TableFieldController.$inject = [];

  function TableFieldController() {
    var vm = this;


    //////////

    init();

    //////////

    function init() {

    }
  }

})();