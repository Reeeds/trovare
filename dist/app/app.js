!function(){"use strict";var e=function(e){return null!=e},t=/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/,n=function(e){return e=e.toLowerCase(),"true"===e||"false"===e},i=["|","^"],o=[",",";","  ","|","^"],r=["\r\n","\r","\n"],s=function(e,i,o,r){var s,a="return ",l=r?function(e,i){return t.test(e)?"Number(values["+i+"]),":n(e)?"Boolean(values["+i+"].toLowerCase() === 'true'),":"String(values["+i+"]),"}:function(e,t){return"values["+t+"],"};if("object"===e){for(a+="{",s=0;s<i.length;++s)a+='"'+i[s]+'": '+l(o[s],s);a=a.slice(0,-1)+"}"}else{for(a+="[",s=0;s<i.length;++s)a+=l(o[s],s);a=a.slice(0,-1)+"]"}return new Function("values",a)},a=function(e,t){for(var n,o=0,r=0,s=t.length;s>r;r++){var a=t[r],l=-1==i.indexOf(a)?a:"\\"+a,c=e.match(new RegExp(l,"g"));c&&c.length>o&&(o=c.length,n=a)}return n||t[0]},l=function(t,n){if(n=e(n)?n:{},this.data=t,this.options={header:e(n.header)?n.header:!1,cast:e(n.cast)?n.cast:!0,line:n.line,delimiter:n.delimiter},this.data instanceof Array)this.options.line=e(n.line)?n.line:"\r\n",this.options.delimiter=e(n.delimiter)?n.delimiter:",";else{this.options.line||(this.options.line=a(this.data,r)),this.options.delimiter||(this.options.delimiter=a(this.data,o));for(var i=0;i<this.options.line.length;i++){var s=t.charCodeAt(t.length-this.options.line.length+i),l=this.options.line.charCodeAt(i);s!=l&&(this.data+=this.options.line.charAt(i))}}};l.prototype.set=function(e,t){return this.options[e]=t,this},l.prototype.encode=function(t){if(0===this.data.length)return"";var n,i,o,r,s,a,l=this.data,c=[],h=this.options.delimiter,u=l[0]instanceof Array?"array":"object",f=this.options.header,d=this.options.done,p=function(t){return e(t)?"string"!=typeof t?t:'"'+t.replace(/\"/g,'""')+'"':null},g=t?function(e){t(e.join(h))}:function(e){c.push(e.join(h))},w=l.length;if("object"===u?(o=Object.keys(l[0]),r=o.length):r=l[0].length,a=new Array(r),f){var m=f instanceof Array?f:o;for(i=0;r>i;++i)a[i]=p(m[i]);g(a)}if("object"===u)for(n=0;w>n;++n){for(s=l[n],i=0;r>i;++i)a[i]=p(s[o[i]]);g(a)}else for(n=0;w>n;++n){for(s=l[n],i=0;r>i;++i)a[i]=p(s[i]);g(a)}return c=c.join(this.options.line),d&&d(c),c},l.prototype.parse=function(e){if(0===this.data.trim().length)return[];var t,n,i,o,r=this.data,a=[],l=this.options.done,c=this.options.cast,h=this.options.header,u=h instanceof Array?h:[],f=this.options.line,d=u.length,p={row:[],cell:""},g={escaped:!1,quote:!1,cell:!0},w=function(e){p.row.push((g.escaped?e.slice(1,-1).replace(/""/g,'"'):e).trim()),p.cell="",g={escaped:!1,quote:!1,cell:!0}},m=1===f.length?w:function(e){w(e.slice(0,1-f.length))},y=e?function(){e(new t(p.row))}:function(){a.push(new t(p.row))},v=function(){h?d?(t=new s("object",u,p.row,c),y(),v=y):(u=p.row,d=u.length):(t||(t=new s("array",p.row,p.row,c)),y(),v=y)},A=r.length,j=f.charCodeAt(f.length-1),b=this.options.delimiter.charCodeAt(0);for(n=0,i=0;A>=i;++i)o=r.charCodeAt(i),g.cell&&(g.cell=!1,34===o)?g.escaped=!0:g.escaped&&34===o?g.quote=!g.quote:(g.escaped&&g.quote||!g.escaped)&&(o===b?(w(p.cell+r.slice(n,i)),n=i+1):o===j&&(m(p.cell+r.slice(n,i)),n=i+1,v(),p.row=[]));return l&&l(a),a},l.prototype.forEach=function(e){return this.data instanceof Array?this.encode(e):this.parse(e)},"function"==typeof define&&define.amd?define(function(){return l}):"object"==typeof module&&module.exports?module.exports=l:window&&(window.CSV=l)}();
(function() {
  'use strict';

  angular.module('app', [
    'app.issueList',
    'app.csvjs',
    'app.ui',
    'ngSanitize',
    'ngclipboard'
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

  angular.module('app.ui', []);

})();
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
(function() {
    'use strict';

    angular
        .module('app.ui')
        .directive('autoLoader', autoLoaderDirective);

    autoLoaderDirective.$inject = [];

    function autoLoaderDirective() {
        return {
            restrict: 'A',
            scope: {
              'autoLoader': '&'
            },
            link: link
        };
    }

    function link($scope, element, attrs) {
      var $container = $(element);
      var scrolledToBottom = false;
      var previousMax = 0;

      $container.scroll(function() {
        if ($container.scrollTop() + $container.innerHeight() >= $container.prop("scrollHeight")) {
          if (!scrolledToBottom) {
            $scope.$apply(function() {
                $scope.autoLoader();
            });
          }
          scrolledToBottom = true;
        } else {
          scrolledToBottom = false;
        }
      });
    }

})();
(function() {
  'use strict';

  angular
    .module('app.ui')
    .filter('lineBreak', lineBreakFilter);

  lineBreakFilter.$inject = [];

  function lineBreakFilter() {
    return function(content) {
      var result = content;

      if (angular.isString(result)) {
        result = result.replace(/(?:\r\n|\r|\n)/g, '<br />');
      }

      return result;
    }
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
    .value('filterColumns', ['Fehlerklasse', 'Param-Team', 'Status', 'Erfasser', 'Zugewiesen an', 'Externer Bearbeiter'])
    .value('collapsableColumns', ['Beschreibung', 'Kommentare'])
    .value('columnHeaders', {
      'Entwicklungs-Team':        'Team',
      'Issue ID':                 'ID',
      'Fehlerklasse':             'Prio',
      'Externer Bearbeiter':      'Extern',
      'Externer Bearbeiter Ref.': 'Ref.',
      'Zugewiesen an':            'Zugew.',
      'Planung Entwicklung':      'Planung Entw.',
      'Problem-Melder':           'Melder',
      'Erstellt am':              'Erstellt',
      'Geändert am':              'Geändert',
      'Issue Typ':                'Typ'
    })
    .value('singleLineColumns', ['Entwicklungs-Team', 'Fehlerklasse'])
    .value('colourColumns', [
      {
        column: 'Fehlerklasse',
        colors: {
          'A - Critical': 'red',
          'B - High':     'orange',
          'C - Medium':   'yellow',
          'D - Low':      'green'
        }
      }
    ])
    .value('multiColumns', [
      [ "Erfasser", "Zugewiesen an", "Problem-Melder" ],
      [ "Externer Bearbeiter", "Externer Bearbeiter Ref." ],
      [ "Erstellt am", "Geändert am" ],
      [ "Target Cycle", "Target Release" ]
    ])
    .value('externalLinks', [
      {
        match: {
          value: 'Avaloq',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://www.community.avaloq.com/community/iss/edit_view.cfm?issue_id=',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      },
      {
        match: {
          value: 'ti&m',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://redmine.ti8m.ch/issues/',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      },
      {
        match: {
          value: 'ergon',
          field: 'Externer Bearbeiter'
        },
        link: {
          url: 'https://secure.ergon.ch/jira/browse/LUKBMEDEXT-',
          field: 'Externer Bearbeiter Ref.',
          pattern: "[\\d]+"
        }
      }
    ]);


})();




(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('multiSearch', multiSearch);

  multiSearch.$inject = ['parserService'];

  function multiSearch(parserService) {
    return function(items, searchText) {
      if (searchText.trim() === "") return items;

      var filteredItems = new Array();
      var searchItems = parserService.parse(searchText);

      angular.forEach(items, function(row) {
        var isRowSearchResult = true;

        // Check for key search
        angular.forEach(row, function(val, key) {
          var searchKey = key.toString().toLowerCase().replace(/[\s]*/g, "");

          angular.forEach(searchItems["keySearch"], function(keySearch) {
            if (keySearch.first.toString().toLowerCase().replace(/[\s]*/g, "") === searchKey) {
              if (val.toString().toLowerCase().indexOf(keySearch.second.toString().toLowerCase()) === -1) {
                isRowSearchResult = false;
                return false;
              }
            }
          });

          if (!isRowSearchResult) return false;
        });

        // Check for excluded Words
        angular.forEach(searchItems["exclude"], function(excludeItem) {
          if (containsRowString(row, excludeItem)) {
            isRowSearchResult = false;
            return false;
          }
        });

        // Check for matches
        angular.forEach(searchItems["match"], function(matchItem) {
          if (!containsRowString(row, matchItem)) {
            isRowSearchResult = false;
            return false;
          }
        });

        // Check for or-matches
        angular.forEach(searchItems["matchOr"], function(orMatch) {
          if (!containsRowString(row, orMatch.first) && !containsRowString(row, orMatch.second)) {
            isRowSearchResult = false;
            return false;
          }
        });

        if (isRowSearchResult) {
          filteredItems.push(row);
        }
      });

      return filteredItems;
    }
  }

  function containsRowString(row, string) {
    var isStringInRow = false;

    angular.forEach(row, function(val) {
      if (val.toString().toLowerCase().indexOf(string.toString().toLowerCase()) !== -1) {
        isStringInRow = true;
        return false;
      }
    });

    return isStringInRow;
  }

})();
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

(function() {
  'use strict';

  angular
    .module('app.issueList')
    .component('issueList', {
      templateUrl: 'app/issuelist/issuelist.template.html',
      controller: IssueListController
    });

  IssueListController.$inject = ['csv', 'filterColumns', 'collapsableColumns', 'singleLineColumns', 'columnHeaders', 'colourColumns', 'multiColumns', 'externalLinks', 'parserService'];

  function IssueListController(csv, filterColumns, collapsableColumns, singleLineColumns, columnHeaders, colourColumns, multiColumns, externalLinks, parserService) {
    var vm = this;

    vm.content            = "";
    vm.rows               = "";
    vm.sortType           = '';     // set the default sort type
    vm.sortReverse        = false;  // set the default sort order
    vm.search             = '';     // set the default search/filter term
    vm.headers            = {};
    vm.collapsableColumns = collapsableColumns;
    vm.limitTo            = 5;
    vm.step               = 50;

    vm.getSearchWords = getSearchWords;
    vm.fileLoaded   = fileLoaded;
    vm.orderBy = orderBy;
    vm.loadMore = loadMore;
    vm.appendColumnnFilterToSearch = appendColumnnFilterToSearch;

    /*
    //////////
    var mockData = "";

    mockData += "Issue ID;Titel;Status;Fehlerklasse;Erfasser;Zugewiesen an;Entwicklungs-Team;Planung Entwicklung;Externer Bearbeiter;Externer Bearbeiter Ref.;Prozessbereich;Target Cycle;Target Release\n";
    mockData += "41223;Buchungsdetails | Total Buchungsbetrag wird im PDF nicht angezeigt;Assigned;A - Critical;LU14843;lue0759;ZIW A;R16-7_DEC;Avaloq;;Projekt NTS;;NTS_R2.1\n";
    mockData += "41210;NTS: AFP Administration: EBV-Nummer wird nicht erkannt;Assigned;A - Critical;lu10921;lue0549;ZIW A;;;;Projekt NTS;;\n";
    mockData += "41208;Zahlungsvorlage - Roter Einzahlungsschein - Begünstigtenangaben fehlen;Warten auf Drittlieferant;A - Critical;LU12518;lue0759;ZIW A;R16-7_DEC;Avaloq;280135;Projekt NTS;;NTS_R2.1\n";
    mockData += "41205;Bankbelege: es sind nicht alle Dokumente in einer Mailbox ersichtlich (Folgeissue / Groupmanager Fehler Avaloq);Warten auf Drittlieferant;A - Critical;lue0456;lue0456;ZIW A;R16-7_DEC;Avaloq;280086;Projekt NTS;;NTS_R2.1";

    fileLoaded(mockData);
    */

    function getSearchWords() {
      if (vm.search !== "") {
        return parserService.getSearchWords(vm.search);
      }

      return [];
    }

    function fileLoaded(fileContent) {
      vm.content = fileContent;
      vm.rows = new csv(fileContent, { header: true, cast: false }).parse();
      vm.headers = {};

      var newHeader = function(key) {
        return {
          key: key,
          title: angular.isDefined(columnHeaders[key]) ? columnHeaders[key] : key,
          collapsable: (vm.collapsableColumns.indexOf(key) !== -1),
          singleLine: (singleLineColumns.indexOf(key) !== -1),
          active: true,
          subHeaders: {}
        };
      }

      angular.forEach(vm.rows[0], function(val, key) {
        var added = false;

        angular.forEach(multiColumns, function(multiColumn) {
          var idxOf = multiColumn.indexOf(key);

          if (idxOf === 0) {
            vm.headers[key] = newHeader(key);
            added = true;
            return false;
          } else if (idxOf !== -1) {
            vm.headers[multiColumn[0]].subHeaders[idxOf] = newHeader(key);
            added = true;
            return false;
          }
        });

        if (!added) {
          vm.headers[key] = newHeader(key);
        }
      });

      angular.forEach(vm.rows, function(row) {
        row['_trovare'] = { colorColumns: {}, extLinks: {} };

        angular.forEach(colourColumns, function(colorColumn) {
          if (angular.isDefined(row[colorColumn.column]) && angular.isDefined(colorColumn.colors[row[colorColumn.column]])) {
            row._trovare.colorColumns[colorColumn.column] = colorColumn.colors[row[colorColumn.column]]
          }
        });

        angular.forEach(externalLinks, function(extLink) {
          if (row[extLink.match.field].toLowerCase() == extLink.match.value.toLowerCase()) {
            var fieldValue = (row[extLink.link.field]).toString().match(new RegExp(extLink.link.pattern));
            if (fieldValue !== null) {
              row._trovare.extLinks[extLink.link.field] = (extLink.link.url + fieldValue);
            }
          }
        });
      });
    }

    function orderBy(val) {
      return val[vm.sortType];
    }

    function loadMore() {
      console.log("LOAD MORE");
      vm.limitTo += vm.step;
    }

    function appendColumnnFilterToSearch(key, text) {
      if (angular.isString(text) && text.length > 0) {
        var newSearchTerm = vm.search;

        if (newSearchTerm !== "") {
          newSearchTerm += " ";
        }

        if (text.indexOf(" ") !== -1) {
          text = '"'+ text + '"';
        }

        newSearchTerm += key + ":" + text;
        vm.search = newSearchTerm;
      }
    }
  }
})();

(function() {
  "use strict";

  angular
    .module('app.issueList')
    .factory('parserService', parserService);

  parserService.$inject = [];

  function parserService() {
    var parsed = {};

    var service = {
      parse: parse,
      getSearchWords: getSearchWords
    };

    return service;

    //////////

    function parse(searchText) {
      if (angular.isDefined(parsed[searchText])) {
        return parsed[searchText];
      }

      var matches = {};
      var output = {};
      var parsedSearchText = searchText;

      // --"EXCLUDE WORDS"
      output = checkPattern(/(?:\-\-)(?:(?:")([^\"]*)(?:\"))/g, parsedSearchText, 1);
      matches["exclude"] = output.matches;
      parsedSearchText = output.text;

      // "MATCH THIS"|"OR THIS"
      output = checkPattern(/\"([^\|\"]+)\"\|\"([^\"]+)\"/g, parsedSearchText, 1, 2);
      matches["matchOr"] = output.matches;
      parsedSearchText = output.text;

      // COLUMNKEY:"VALUE WITH SPACE"
      output = checkPattern(/\b([^\s\"]+):\"([^\"]+)\"/g, parsedSearchText, 1, 2);
      matches["keySearch"] = output.matches;
      parsedSearchText = output.text;

      // "MATCH WORDS"
      output = checkPattern(/(?:(?:")([^\"]*)(?:\"))/g, parsedSearchText, 1);
      matches["match"] = output.matches;
      parsedSearchText = output.text;

      // --EXCLUDETHIS
      output = checkPattern(/(?:\-\-)([^\s]*)/g, parsedSearchText, 1);
      matches["exclude"] = matches["exclude"].concat(output.matches);
      parsedSearchText = output.text;

      // MATCHTHIS|ORTHIS
      output = checkPattern(/\b([^\|][\S]+)\|([\S]+)\b/g, parsedSearchText, 1, 2);
      matches["matchOr"] = matches["matchOr"].concat(output.matches);
      parsedSearchText = output.text;

      // COLUMNKEY:VALUE
      output = checkPattern(/\b([^\s]+):([^\s]+)\b/g, parsedSearchText, 1, 2);
      matches["keySearch"] = matches["keySearch"].concat(output.matches);
      parsedSearchText = output.text;

      // MATCHTHIS
      output = checkPattern(/\b[\S]+\b/g, parsedSearchText, 0);
      matches["match"] = matches["match"].concat(output.matches);
      parsedSearchText = output.text;

      parsed[searchText] = matches;
      return matches;
    }

    function getSearchWords(searchText) {
      var matches = parse(searchText);
      var searchWords = [];

      angular.forEach(matches.matchOr, function(matchOr) {
        searchWords.push(matchOr.first);
        searchWords.push(matchOr.second);
      });

      angular.forEach(matches.match, function(match) {
        searchWords.push(match);
      });

      return searchWords;
    }

    function checkPattern(pattern, text, index, index2) {
        var result = { matches: [], text: "" }
        var match;

        do {
            match = pattern.exec(text);
            if (match) {
                if (typeof(index2) !== 'undefined') {
                  result.matches.push({ "first": match[index].trim(), "second": match[index2].trim() });
                } else {
                  result.matches.push(match[index].trim());
                }
            }
        } while (match);

        result.text = text.replace(pattern, "");
        return result;
    }
  }
})();
(function() {
  'use strict';

angular
    .module('app.issueList')
    .filter('highlighter', highlighter);

  highlighter.$inject = ['parserService'];

  function highlighter(parserService) {
    var styleClasses = ["style-1", "style-2", "style-3", "style-4", "style-5", "style-6"];

    return function(content, terms) {
      var textContent = escapeHtmlString(content);

      angular.forEach(terms, function(term, idx) {
        textContent = highlightTerm(textContent, term, idx);
      });

      return textContent;
    }

    function highlightTerm(content, term, idx) {
      var style = styleClasses[ idx % styleClasses.length ];
      var regEx = new RegExp('(' + term + ')', 'gi');
      content = content.replace(regEx, '<span class="is-highlighted--' + style + '">$1</span>');
      return content;
    }

    function escapeHtmlString(string) {
      var tagsToReplace = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

      return string.toString().replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
      });
    }
  }

})();
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
(function($){var nextId=0;var Filestyle=function(element,options){this.options=options;this.$elementFilestyle=[];this.$element=$(element)};Filestyle.prototype={clear:function(){this.$element.val("");this.$elementFilestyle.find(":text").val("");this.$elementFilestyle.find(".badge").remove()},destroy:function(){this.$element.removeAttr("style").removeData("filestyle");this.$elementFilestyle.remove()},disabled:function(value){if(value===true){if(!this.options.disabled){this.$element.attr("disabled","true");this.$elementFilestyle.find("label").attr("disabled","true");this.options.disabled=true}}else{if(value===false){if(this.options.disabled){this.$element.removeAttr("disabled");this.$elementFilestyle.find("label").removeAttr("disabled");this.options.disabled=false}}else{return this.options.disabled}}},buttonBefore:function(value){if(value===true){if(!this.options.buttonBefore){this.options.buttonBefore=true;if(this.options.input){this.$elementFilestyle.remove();this.constructor();this.pushNameFiles()}}}else{if(value===false){if(this.options.buttonBefore){this.options.buttonBefore=false;if(this.options.input){this.$elementFilestyle.remove();this.constructor();this.pushNameFiles()}}}else{return this.options.buttonBefore}}},icon:function(value){if(value===true){if(!this.options.icon){this.options.icon=true;this.$elementFilestyle.find("label").prepend(this.htmlIcon())}}else{if(value===false){if(this.options.icon){this.options.icon=false;this.$elementFilestyle.find(".icon-span-filestyle").remove()}}else{return this.options.icon}}},input:function(value){if(value===true){if(!this.options.input){this.options.input=true;if(this.options.buttonBefore){this.$elementFilestyle.append(this.htmlInput())}else{this.$elementFilestyle.prepend(this.htmlInput())}this.$elementFilestyle.find(".badge").remove();this.pushNameFiles();this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn")}}else{if(value===false){if(this.options.input){this.options.input=false;this.$elementFilestyle.find(":text").remove();var files=this.pushNameFiles();if(files.length>0&&this.options.badge){this.$elementFilestyle.find("label").append(' <span class="badge">'+files.length+"</span>")}this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn")}}else{return this.options.input}}},size:function(value){if(value!==undefined){var btn=this.$elementFilestyle.find("label"),input=this.$elementFilestyle.find("input");btn.removeClass("btn-lg btn-sm");input.removeClass("input-lg input-sm");if(value!="nr"){btn.addClass("btn-"+value);input.addClass("input-"+value)}}else{return this.options.size}},placeholder:function(value){if(value!==undefined){this.options.placeholder=value;this.$elementFilestyle.find("input").attr("placeholder",value)}else{return this.options.placeholder}},buttonText:function(value){if(value!==undefined){this.options.buttonText=value;this.$elementFilestyle.find("label .buttonText").html(this.options.buttonText)}else{return this.options.buttonText}},buttonName:function(value){if(value!==undefined){this.options.buttonName=value;this.$elementFilestyle.find("label").attr({"class":"btn "+this.options.buttonName})}else{return this.options.buttonName}},iconName:function(value){if(value!==undefined){this.$elementFilestyle.find(".icon-span-filestyle").attr({"class":"icon-span-filestyle "+this.options.iconName})}else{return this.options.iconName}},htmlIcon:function(){if(this.options.icon){return'<span class="icon-span-filestyle '+this.options.iconName+'"></span> '}else{return""}},htmlInput:function(){if(this.options.input){return'<input type="text" class="form-control '+(this.options.size=="nr"?"":"input-"+this.options.size)+'" placeholder="'+this.options.placeholder+'" disabled> '}else{return""}},pushNameFiles:function(){var content="",files=[];if(this.$element[0].files===undefined){files[0]={name:this.$element[0]&&this.$element[0].value}}else{files=this.$element[0].files}for(var i=0;i<files.length;i++){content+=files[i].name.split("\\").pop()+", "}if(content!==""){this.$elementFilestyle.find(":text").val(content.replace(/\, $/g,""))}else{this.$elementFilestyle.find(":text").val("")}return files},constructor:function(){var _self=this,html="",id=_self.$element.attr("id"),files=[],btn="",$label;if(id===""||!id){id="filestyle-"+nextId;_self.$element.attr({id:id});nextId++}btn='<span class="group-span-filestyle '+(_self.options.input?"input-group-btn":"")+'"><label for="'+id+'" class="btn '+_self.options.buttonName+" "+(_self.options.size=="nr"?"":"btn-"+_self.options.size)+'" '+(_self.options.disabled?'disabled="true"':"")+">"+_self.htmlIcon()+'<span class="buttonText">'+_self.options.buttonText+"</span></label></span>";html=_self.options.buttonBefore?btn+_self.htmlInput():_self.htmlInput()+btn;_self.$elementFilestyle=$('<div class="bootstrap-filestyle input-group">'+html+"</div>");_self.$elementFilestyle.find(".group-span-filestyle").attr("tabindex","0").keypress(function(e){if(e.keyCode===13||e.charCode===32){_self.$elementFilestyle.find("label").click();return false}});_self.$element.css({position:"absolute",clip:"rect(0px 0px 0px 0px)"}).attr("tabindex","-1").after(_self.$elementFilestyle);if(_self.options.disabled){_self.$element.attr("disabled","true")}_self.$element.change(function(){var files=_self.pushNameFiles();if(_self.options.input==false&&_self.options.badge){if(_self.$elementFilestyle.find(".badge").length==0){_self.$elementFilestyle.find("label").append(' <span class="badge">'+files.length+"</span>")}else{if(files.length==0){_self.$elementFilestyle.find(".badge").remove()}else{_self.$elementFilestyle.find(".badge").html(files.length)}}}else{_self.$elementFilestyle.find(".badge").remove()}});if(window.navigator.userAgent.search(/firefox/i)>-1){_self.$elementFilestyle.find("label").click(function(){_self.$element.click();return false})}}};var old=$.fn.filestyle;$.fn.filestyle=function(option,value){var get="",element=this.each(function(){if($(this).attr("type")==="file"){var $this=$(this),data=$this.data("filestyle"),options=$.extend({},$.fn.filestyle.defaults,option,typeof option==="object"&&option);if(!data){$this.data("filestyle",(data=new Filestyle(this,options)));data.constructor()}if(typeof option==="string"){get=data[option](value)}}});if(typeof get!==undefined){return get}else{return element}};$.fn.filestyle.defaults={buttonText:"Choose file",iconName:"glyphicon glyphicon-folder-open",buttonName:"btn-default",size:"nr",input:true,badge:true,icon:true,buttonBefore:false,disabled:false,placeholder:""};$.fn.filestyle.noConflict=function(){$.fn.filestyle=old;return this};$(function(){$(".filestyle").each(function(){var $this=$(this),options={input:$this.attr("data-input")==="false"?false:true,icon:$this.attr("data-icon")==="false"?false:true,buttonBefore:$this.attr("data-buttonBefore")==="true"?true:false,disabled:$this.attr("data-disabled")==="true"?true:false,size:$this.attr("data-size"),buttonText:$this.attr("data-buttonText"),buttonName:$this.attr("data-buttonName"),iconName:$this.attr("data-iconName"),badge:$this.attr("data-badge")==="false"?false:true,placeholder:$this.attr("data-placeholder")};$this.filestyle(options)})})})(window.jQuery);