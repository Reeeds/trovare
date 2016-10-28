(function() {
  'use strict';

  angular
    .module('app.issueList')
    .directive('onReadFile', onReadFile);

  onReadFile.$inject = [];

  function onReadFile() {
    var validFormats = ['csv'];

    return {
        restrict: 'A',
        scope: {
          'onReadFile': '&'
        },
        link: function(scope, element, attrs) {
            element.filestyle({ buttonText: 'Choose CSV' });

            element.on('change', function(onChangeEvent) {
                var value = element.val();
                var extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
                var isValidFormat = validFormats.indexOf(extension) !== -1;

                if (isValidFormat) {
                  var reader = new FileReader();

                  reader.onload = function(onLoadEvent) {
                      scope.$apply(function() {
                          scope.onReadFile({ fileContent: onLoadEvent.target.result });
                      });
                  };

                  reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], 'ISO-8859-4'); // TODO Reto: fix that
                } else {
                  alert("File type not supported!");
                }
            });
        }
    };
  }
})();
