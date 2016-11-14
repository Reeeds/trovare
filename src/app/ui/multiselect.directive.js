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
      var $applyButton = element.find(".multiselect-dropdown-button .btn");

      $title.click(function(e) {
        e.stopPropagation();

        if (!element.hasClass("active")) {
          $("body .multiselect").removeClass("active");
        }

        element.toggleClass("active");
      });

      $applyButton.click(function() {
        element.removeClass("active");
      });

      $("html, body").click(function() {
        element.removeClass("active");
      });

      $dropdown.click(function(e) {
        e.stopPropagation();
      });
    }

    multiSelectController.$inject = [];

    function multiSelectController() {
        var vm = this;

        vm.data = {
          disabledItems: []
        };

        vm.changeAll = changeAll;
        vm.changeSelection = changeSelection;
        vm.applyChanges = applyChanges;

        //////////

        function changeAll(active) {
          angular.forEach(vm.itemList, function(item, key) {
            if (active !== (vm.data.disabledItems.indexOf(key) === -1)) {
              changeSelection(key, item);
            }
          });
        }

        function changeSelection(key, item) {
          if (vm.data.disabledItems.indexOf(key) === -1) {
            vm.data.disabledItems.push(key);
          } else {
            vm.data.disabledItems.splice(vm.data.disabledItems.indexOf(key), 1);
          }
        }

        function applyChanges() {
          if (angular.isObject(vm.itemList)) {
            angular.forEach(vm.itemList, function(item, key) {
              item.active = (vm.data.disabledItems.indexOf(key) === -1);
            });
          }
        }
    }

})();