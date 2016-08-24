!function(){"use strict";var e=function(e){return null!=e},t=/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/,n=function(e){return e=e.toLowerCase(),"true"===e||"false"===e},i=["|","^"],o=[",",";","  ","|","^"],r=["\r\n","\r","\n"],s=function(e,i,o,r){var s,a="return ",l=r?function(e,i){return t.test(e)?"Number(values["+i+"]),":n(e)?"Boolean(values["+i+"].toLowerCase() === 'true'),":"String(values["+i+"]),"}:function(e,t){return"values["+t+"],"};if("object"===e){for(a+="{",s=0;s<i.length;++s)a+='"'+i[s]+'": '+l(o[s],s);a=a.slice(0,-1)+"}"}else{for(a+="[",s=0;s<i.length;++s)a+=l(o[s],s);a=a.slice(0,-1)+"]"}return new Function("values",a)},a=function(e,t){for(var n,o=0,r=0,s=t.length;s>r;r++){var a=t[r],l=-1==i.indexOf(a)?a:"\\"+a,c=e.match(new RegExp(l,"g"));c&&c.length>o&&(o=c.length,n=a)}return n||t[0]},l=function(t,n){if(n=e(n)?n:{},this.data=t,this.options={header:e(n.header)?n.header:!1,cast:e(n.cast)?n.cast:!0,line:n.line,delimiter:n.delimiter},this.data instanceof Array)this.options.line=e(n.line)?n.line:"\r\n",this.options.delimiter=e(n.delimiter)?n.delimiter:",";else{this.options.line||(this.options.line=a(this.data,r)),this.options.delimiter||(this.options.delimiter=a(this.data,o));for(var i=0;i<this.options.line.length;i++){var s=t.charCodeAt(t.length-this.options.line.length+i),l=this.options.line.charCodeAt(i);s!=l&&(this.data+=this.options.line.charAt(i))}}};l.prototype.set=function(e,t){return this.options[e]=t,this},l.prototype.encode=function(t){if(0===this.data.length)return"";var n,i,o,r,s,a,l=this.data,c=[],h=this.options.delimiter,u=l[0]instanceof Array?"array":"object",f=this.options.header,d=this.options.done,p=function(t){return e(t)?"string"!=typeof t?t:'"'+t.replace(/\"/g,'""')+'"':null},g=t?function(e){t(e.join(h))}:function(e){c.push(e.join(h))},w=l.length;if("object"===u?(o=Object.keys(l[0]),r=o.length):r=l[0].length,a=new Array(r),f){var m=f instanceof Array?f:o;for(i=0;r>i;++i)a[i]=p(m[i]);g(a)}if("object"===u)for(n=0;w>n;++n){for(s=l[n],i=0;r>i;++i)a[i]=p(s[o[i]]);g(a)}else for(n=0;w>n;++n){for(s=l[n],i=0;r>i;++i)a[i]=p(s[i]);g(a)}return c=c.join(this.options.line),d&&d(c),c},l.prototype.parse=function(e){if(0===this.data.trim().length)return[];var t,n,i,o,r=this.data,a=[],l=this.options.done,c=this.options.cast,h=this.options.header,u=h instanceof Array?h:[],f=this.options.line,d=u.length,p={row:[],cell:""},g={escaped:!1,quote:!1,cell:!0},w=function(e){p.row.push((g.escaped?e.slice(1,-1).replace(/""/g,'"'):e).trim()),p.cell="",g={escaped:!1,quote:!1,cell:!0}},m=1===f.length?w:function(e){w(e.slice(0,1-f.length))},y=e?function(){e(new t(p.row))}:function(){a.push(new t(p.row))},v=function(){h?d?(t=new s("object",u,p.row,c),y(),v=y):(u=p.row,d=u.length):(t||(t=new s("array",p.row,p.row,c)),y(),v=y)},A=r.length,j=f.charCodeAt(f.length-1),b=this.options.delimiter.charCodeAt(0);for(n=0,i=0;A>=i;++i)o=r.charCodeAt(i),g.cell&&(g.cell=!1,34===o)?g.escaped=!0:g.escaped&&34===o?g.quote=!g.quote:(g.escaped&&g.quote||!g.escaped)&&(o===b?(w(p.cell+r.slice(n,i)),n=i+1):o===j&&(m(p.cell+r.slice(n,i)),n=i+1,v(),p.row=[]));return l&&l(a),a},l.prototype.forEach=function(e){return this.data instanceof Array?this.encode(e):this.parse(e)},"function"==typeof define&&define.amd?define(function(){return l}):"object"==typeof module&&module.exports?module.exports=l:window&&(window.CSV=l)}();
(function() {
  'use strict';

  angular.module('app', [
    'app.issueList',
    'app.csvjs'
  ]);

})();

(function() {
  'use strict';

  angular.module('app.csvjs', []);

})();
(function() {
  'use strict';

  angular
    .module('app.csvjs')
    .factory('csv', csvService);

  csvService.$inject = ['$window'];

  function csvService($window) {
    if($window.CSV){
      //Delete moment from window so it's not globally accessible.
      //  We can still get at it through _thirdParty however, more on why later
      $window._thirdParty = $window._thirdParty || {};
      $window._thirdParty.CSV = $window.CSV;
      try { delete $window.CSV; } catch (e) {$window.CSV = undefined;
      /*<IE8 doesn't do delete of window vars, make undefined if delete error*/}
    }
    var csv = $window._thirdParty.CSV;
    return csv;
  }

})();
(function() {
  'use strict';

  angular.module('app.issueList', []);

})();

(function() {
  'use strict';

  angular
    .module('app.issueList')
    .value('filterColumns', ['Fehlerklasse', 'Param-Team', 'Status', 'Erfasser', 'Zugewiesen an', 'Externer Bearbeiter']);
})();

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

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
  }

})();

(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['csv', 'filterColumns'];

  function IssueListController(csv, filterColumns) {
    var vm = this;

    vm.content = "";
    vm.contentJson = "";
    vm.sortType     = 'fish'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchFish   = '';     // set the default search/filter term
    vm.fileLoaded = fileLoaded;
    vm.filters = {};

    //////////

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.contentJson = new csv(fileContent, { header: true }).parse();

      angular.forEach(filterColumns, function(filterColumn) {
        vm.filters[filterColumn] = { name: filterColumn, items: [], values: [] };
      });

      angular.forEach(vm.contentJson, function(row, index) {
        angular.forEach(row, function(itemVal, itemName) {
          if (filterColumns.indexOf(itemName) !== -1) {
            if (vm.filters[itemName].values.indexOf(itemVal) === -1) {
              vm.filters[itemName].items.push({ val: itemVal });
              vm.filters[itemName].values.push(itemVal);
            }
          }
        });
      });
    }
  }
})();
