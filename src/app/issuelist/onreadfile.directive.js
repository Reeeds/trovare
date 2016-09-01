(function() {
  'use strict';

  angular
    .module('app.issueList')
    .directive('onReadFile', onReadFile);

  onReadFile.$inject = [];

  function onReadFile() {
    return {
        restrict: 'A',
        scope: {
          'onReadFile': '&'
        },
        link: function(scope, element, attrs) {
            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        scope.onReadFile({ fileContent: onLoadEvent.target.result });
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], 'ISO-8859-4');
            });
        }
    };
  }

})();
