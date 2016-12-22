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
      var $title = element.find(".multiselect__title");
      var $dropdown = element.find(".multiselect__dropdown");
      var $applyButton = element.find(".multiselect__dropdown-button .btn");

      $title.click(function(e) {
        e.stopPropagation();

        if (!element.hasClass("multiselect--active")) {
          $("body .multiselect").removeClass("multiselect--active");
        }

        element.toggleClass("multiselect--active");
      });

      $applyButton.click(function() {
        element.removeClass("multiselect--active");
      });

      $("html, body").click(function() {
        element.removeClass("multiselect--active");
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