/**
 * Created by retoschuermann on 18.07.16.
 */

angular.module('sortApp',[])
    .controller('mainController', function($scope){
        $scope.sortType     = 'fish'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term

        $scope.showContent = function($fileContent){
        $scope.content = $fileContent;

        $scope.contentJSON = JSON.parse(CSV2JSON($fileContent));
        //$scope.contentArray = CSVToArray($fileContent,";");
        //console.log("content JSON");
        //console.log($scope.contentJSON);
        $scope.testJSON = [{"Issue ID":"37174","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"PEG191 NTS: langsame Antwortzeiten","Erstellt am":"29.04.16","Erfasser":"lue0496","Zugewiesen an":"lue0496","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"267910","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"37942","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: Constraints Verleztungen in Tabelle AFS_SEC_CODE_TAB_ACCESS","Erstellt am":"23.05.16","Erfasser":"lu12569","Zugewiesen an":"lu12569","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"270294","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38045","Fehlerklasse":"A - Critical","Param-Team":"ZIW B","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: Login on Behalf nur m_glich, wenn der Vertrag entsperrt ist","Erstellt am":"09.06.16","Erfasser":"lu12395","Zugewiesen an":"lu13807","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"270926","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38276","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"PEG191 NTS: Parameter f�r Eingabe Profile bei Create DB-User","Erstellt am":"14.06.16","Erfasser":"lu11704","Zugewiesen an":"lu11704","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271049","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38370","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"PEG191 NTS: ActiveMQ r_umt log-files nicht auf","Erstellt am":"15.06.16","Erfasser":"lu11704","Zugewiesen an":"lu11704","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271200","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"35035","Fehlerklasse":"A - Critical","Param-Team":"ZIW F","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: AFP-94: Konto/ZV-Daten abholen : Berechtigung ESR-Download generiert keine Files","Erstellt am":"26.11.15","Erfasser":"lu12395","Zugewiesen an":"lu11843","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271248","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38435","Fehlerklasse":"A - Critical","Param-Team":"ZIW F","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: Synchronisation ACP - AFP nach Neustart activemq funnktioniert nicht - die bestehenden Meldungen bleiben liegen","Erstellt am":"16.06.16","Erfasser":"lu11843","Zugewiesen an":"lu11843","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271302","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38438","Fehlerklasse":"A - Critical","Param-Team":"ZIW F","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: Synchronisation ACP - AFP  - Mit welchen Mitteln von Avaloq kann die Nicht-Snchronit_t ermittelt, �berwacht und behoben werden","Erstellt am":"16.06.16","Erfasser":"lu11843","Zugewiesen an":"lu13807","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271303","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38619","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"Kontoauszug: Filter Zeitspanne funktioniert nicht korrekt","Erstellt am":"23.06.16","Erfasser":"LU13364","Zugewiesen an":"lu13807","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"271912","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"38645","Fehlerklasse":"A - Critical","Param-Team":"ZIW F","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0: Whiteliste nicht verf�gbar im E-Banking","Erstellt am":"27.06.16","Erfasser":"lu12395","Zugewiesen an":"lu10865","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"272035","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"36938","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0 �bersicht Zahlungen: Keine Daten vorhanden","Erstellt am":"18.04.16","Erfasser":"LU13755","Zugewiesen an":"lue0496","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"272106","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"37681","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail | Inhaber werden nicht alles angezeigt / Anrede falsch","Erstellt am":"24.05.16","Erfasser":"lu13785","Zugewiesen an":"lu13807","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"272157","Prozessbereich":"Projekt NTS"},

                                  {" Issue ID":"37686","Fehlerklasse":"A - Critical","Param-Team":"ZIW A","Status":"Warten auf Drittlieferant","Titel":"NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail | Inhaber Daten werden unterschiedlich angezeigt","Erstellt am":"24.05.16","Erfasser":"lu13785","Zugewiesen an":"lu13807","Issue Typ":"Fehler","Externer Bearbeiter":"Avaloq","ExternerBearbeiterRef.":"272157","Prozessbereich":"Projekt NTS"}];
        //console.log($scope.testJSON);
        //console.log("Dummy");
        }


    })
    .directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
