(function() {
    'use strict';

    angular
        .module('app.ui')
        .directive('multiSelect', multiSelectDirective);

    multiSelectDirective.$inject = [];

    function multiSelectDirective() {
        return {
            restrict: 'E',
            scope: {
              title: '@',
              itemList: '='
            },
            link: link,
            controller: multiSelectController,
            controllerAs: 'multiSelectCtrl',
            bindToController: true,
            templateUrl: 'app/ui/multiselect.template.html',
            replace: true
        };
    }

    function link($scope, element, attrs) {
      var $title = element.find(".multiselect-title");
      var $dropdown = element.find(".multiselect-dropdown");

      $title.click(function(e) {
        e.stopPropagation();

        if (!element.hasClass("active")) {
          $("body .multiselect").removeClass("active");
        }

        element.toggleClass("active");
      });

      $("html, body").click(function() {
        element.removeClass("active");
      });

      $dropdown.click(function(e) {
        e.stopPropagation();
      });
    }

    multiSelectController.$inject = ['$scope'];

    function multiSelectController($scope) {
        var vm = this;

        vm.changeAll = changeAll;

        //////////

        function changeAll(active) {
          angular.forEach(vm.itemList, function(item) {
            item.active = active;
          });
        }
    }

})();