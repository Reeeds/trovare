/**
 * Created by retoschuermann on 18.07.16.
 */

angular.module('sortApp',[])
    .controller('mainController', function($scope){
        $scope.sortType     = 'fish'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term

        // create the list of sushi rolls
        $scope.sushi = [
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
        ];


        $scope.showContent = function($fileContent){
        $scope.content = $fileContent;

        $scope.contentJSON = CSV2JSON($fileContent);
        $scope.contentArray = CSVToArray($fileContent,";");
        }
        $scope.testJSON = [
                {
                    "FIELD1": "1",
                    "FIELD2": "2",
                    "FIELD3": "3",
                    "FIELD4": "4",
                    "FIELD5": "5",
                    "FIELD6": "6",
                    "FIELD7": "7",
                    "FIELD8": "8",
                    "FIELD9": "9",
                    "FIELD10": "10",
                    "FIELD11": "11"
                },
                {
                    "FIELD1": "je",
                    "FIELD2": "avais",
                    "FIELD3": "�tais",
                    "FIELD4": "allais",
                    "FIELD5": "faisais",
                    "FIELD6": "venais",
                    "FIELD7": "pouvais",
                    "FIELD8": "devais",
                    "FIELD9": "recevais",
                    "FIELD10": "achetais",
                    "FIELD11": "disais"
                },
                {
                    "FIELD1": "tu",
                    "FIELD2": "avais",
                    "FIELD3": "�tais",
                    "FIELD4": "allais",
                    "FIELD5": "faisais",
                    "FIELD6": "venais",
                    "FIELD7": "pouvais",
                    "FIELD8": "devais",
                    "FIELD9": "recevais",
                    "FIELD10": "achetais",
                    "FIELD11": "disais"
                },
                {
                    "FIELD1": "il",
                    "FIELD2": "avait",
                    "FIELD3": "�tait",
                    "FIELD4": "allait",
                    "FIELD5": "faisait",
                    "FIELD6": "venait",
                    "FIELD7": "pouvait",
                    "FIELD8": "devait",
                    "FIELD9": "recevait",
                    "FIELD10": "achetait",
                    "FIELD11": "disait"
                },
                {
                    "FIELD1": "nous",
                    "FIELD2": "avions",
                    "FIELD3": "�tions",
                    "FIELD4": "allions",
                    "FIELD5": "faisions",
                    "FIELD6": "venions",
                    "FIELD7": "pouvions",
                    "FIELD8": "devions",
                    "FIELD9": "recevions",
                    "FIELD10": "achetions",
                    "FIELD11": "disions"
                },
                {
                    "FIELD1": "vous",
                    "FIELD2": "aviez",
                    "FIELD3": "�tiez",
                    "FIELD4": "alliez",
                    "FIELD5": "faisiez",
                    "FIELD6": "veniez",
                    "FIELD7": "pouviez",
                    "FIELD8": "deviez",
                    "FIELD9": "receviez",
                    "FIELD10": "achetiez",
                    "FIELD11": "disiez"
                },
                {
                    "FIELD1": "ils",
                    "FIELD2": "avaient ",
                    "FIELD3": "�taient ",
                    "FIELD4": "allaient ",
                    "FIELD5": "faisaient ",
                    "FIELD6": "venaient",
                    "FIELD7": "pouvaient ",
                    "FIELD8": "devaient ",
                    "FIELD9": "recevaient ",
                    "FIELD10": "achetaient ",
                    "FIELD11": "disaient "
                },
                {
                    "FIELD1": "je",
                    "FIELD2": "aurai",
                    "FIELD3": "serai",
                    "FIELD4": "irai",
                    "FIELD5": "ferai",
                    "FIELD6": "viendrai",
                    "FIELD7": "pourrai",
                    "FIELD8": "devrai",
                    "FIELD9": "recevrai",
                    "FIELD10": "ach�terai",
                    "FIELD11": "dirai"
                },
                {
                    "FIELD1": "tu",
                    "FIELD2": "auras",
                    "FIELD3": "seras",
                    "FIELD4": "iras",
                    "FIELD5": "feras",
                    "FIELD6": "viendras",
                    "FIELD7": "pourras",
                    "FIELD8": "devras",
                    "FIELD9": "recevras",
                    "FIELD10": "ach�teras",
                    "FIELD11": "diras"
                },
                {
                    "FIELD1": "il",
                    "FIELD2": "aura",
                    "FIELD3": "sera",
                    "FIELD4": "ira",
                    "FIELD5": "fera",
                    "FIELD6": "viendra",
                    "FIELD7": "pourra",
                    "FIELD8": "devra",
                    "FIELD9": "recevra",
                    "FIELD10": "ach�tera",
                    "FIELD11": "dira"
                },
                {
                    "FIELD1": "nous",
                    "FIELD2": "aurons",
                    "FIELD3": "serons",
                    "FIELD4": "irons",
                    "FIELD5": "ferons",
                    "FIELD6": "viendrons",
                    "FIELD7": "pourrons",
                    "FIELD8": "devrons",
                    "FIELD9": "recevrons",
                    "FIELD10": "ach�terons",
                    "FIELD11": "dirons"
                },
                {
                    "FIELD1": "vous",
                    "FIELD2": "aurez",
                    "FIELD3": "serez",
                    "FIELD4": "irez",
                    "FIELD5": "ferez",
                    "FIELD6": "viendrez",
                    "FIELD7": "pourrez",
                    "FIELD8": "devrez",
                    "FIELD9": "recevrez",
                    "FIELD10": "ach�terez",
                    "FIELD11": "direz"
                },
                {
                    "FIELD1": "ils",
                    "FIELD2": "auront ",
                    "FIELD3": "seront ",
                    "FIELD4": "iront ",
                    "FIELD5": "feront",
                    "FIELD6": "viendront",
                    "FIELD7": "pourront ",
                    "FIELD8": "devront ",
                    "FIELD9": "recevront ",
                    "FIELD10": "ach�teront ",
                    "FIELD11": "diront"
                },
                {
                    "FIELD1": "je",
                    "FIELD2": "aurais",
                    "FIELD3": "serais",
                    "FIELD4": "irais",
                    "FIELD5": "ferais",
                    "FIELD6": "viendrais",
                    "FIELD7": "pourrais",
                    "FIELD8": "devrais",
                    "FIELD9": "recevrais",
                    "FIELD10": "ach�terais",
                    "FIELD11": "dirais"
                },
                {
                    "FIELD1": "tu",
                    "FIELD2": "aurais",
                    "FIELD3": "serais",
                    "FIELD4": "irais",
                    "FIELD5": "ferais",
                    "FIELD6": "viendrais",
                    "FIELD7": "pourrais",
                    "FIELD8": "devrais",
                    "FIELD9": "recevrais",
                    "FIELD10": "ach�terais",
                    "FIELD11": "dirais"
                },
                {
                    "FIELD1": "il",
                    "FIELD2": "aurait",
                    "FIELD3": "serait",
                    "FIELD4": "irait",
                    "FIELD5": "ferait",
                    "FIELD6": "viendrait",
                    "FIELD7": "pourrait",
                    "FIELD8": "devrait",
                    "FIELD9": "recevrait",
                    "FIELD10": "ach�terait",
                    "FIELD11": "dirait"
                },
                {
                    "FIELD1": "nous",
                    "FIELD2": "aurions",
                    "FIELD3": "serions",
                    "FIELD4": "irions",
                    "FIELD5": "ferions",
                    "FIELD6": "viendrions",
                    "FIELD7": "pourrions",
                    "FIELD8": "devrions",
                    "FIELD9": "recevrions",
                    "FIELD10": "ach�terions",
                    "FIELD11": "dirions"
                },
                {
                    "FIELD1": "vous",
                    "FIELD2": "auriez",
                    "FIELD3": "seriez",
                    "FIELD4": "iriez",
                    "FIELD5": "feriez",
                    "FIELD6": "viendriez",
                    "FIELD7": "pourriez",
                    "FIELD8": "devriez",
                    "FIELD9": "recevriez",
                    "FIELD10": "ach�teriez",
                    "FIELD11": "diriez"
                },
                {
                    "FIELD1": "ils",
                    "FIELD2": "auraient ",
                    "FIELD3": "seraient ",
                    "FIELD4": "iraient ",
                    "FIELD5": "feraient ",
                    "FIELD6": "viendraient",
                    "FIELD7": "pourraient ",
                    "FIELD8": "devraient ",
                    "FIELD9": "recevraient ",
                    "FIELD10": "ach�teraient ",
                    "FIELD11": "diraient"
                }
            ];
        $scope.testArray = [
            ["Issue ID","Fehlerklasse","Param-Team","Status","Titel","Erstellt am","Erfasser","Zugewiesen an","Issue Typ","Externer Bearbeiter","ExternerBearbeiterRef.","Prozessbereich","Betroffenes Umsystem","Planung ZIW","Gefunden in Release","Umgebung","Target Release","Funktionsbereich","NTS2.0 AFP Avaloq"],["37174","A - Critical","ZIW A","Warten auf Drittlieferant","PEG191 NTS: langsame Antwortzeiten","29.04.16","lue0496","lue0496","Fehler","Avaloq","267910","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["37942","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: Constraints Verleztungen in Tabelle AFS_SEC_CODE_TAB_ACCESS","23.05.16","lu12569","lu12569","Fehler","Avaloq","270294","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Sync / Migr",""],["38045","A - Critical","ZIW B","Warten auf Drittlieferant","NTS 2.0: Login on Behalf nur m_glich, wenn der Vertrag entsperrt ist","09.06.16","lu12395","lu13807","Fehler","Avaloq","270926","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Support und Vertragsadministration",""],["38276","A - Critical","ZIW A","Warten auf Drittlieferant","PEG191 NTS: Parameter f�r Eingabe Profile bei Create DB-User","14.06.16","lu11704","lu11704","Fehler","Avaloq","271049","Projekt NTS","","R16-3_JUN","R16-3_JUN","EBanking-Entwicklung","NTS_R2.0","Infrastruktur",""],["38370","A - Critical","ZIW A","Warten auf Drittlieferant","PEG191 NTS: ActiveMQ r_umt log-files nicht auf","15.06.16","lu11704","lu11704","Fehler","Avaloq","271200","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","Infrastruktur",""],["35035","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: AFP-94: Konto/ZV-Daten abholen : Berechtigung ESR-Download generiert keine Files","26.11.15","lu12395","lu11843","Fehler","Avaloq","271248","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP_EEBCLU05","NTS_R2.0","E-Banking_Zahlungen","AFP-094 File Transfer - Account / Payment-Data (MT940 / MT942)"],["38435","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: Synchronisation ACP - AFP nach Neustart activemq funnktioniert nicht - die bestehenden Meldungen bleiben liegen","16.06.16","lu11843","lu11843","Fehler","Avaloq","271302","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen","AFP-064 Payments - List of Pending Payments"],["38438","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: Synchronisation ACP - AFP  - Mit welchen Mitteln von Avaloq kann die Nicht-Snchronit_t ermittelt, �berwacht und behoben werden","16.06.16","lu11843","lu13807","Fehler","Avaloq","271303","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","E-Banking_Zahlungen","AFP-064 Payments - List of Pending Payments"],["38619","A - Critical","ZIW A","Warten auf Drittlieferant","Kontoauszug: Filter Zeitspanne funktioniert nicht korrekt","23.06.16","LU13364","lu13807","Fehler","Avaloq","271912","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP_EEBCLU05","NTS_R2.0","E-Banking_Verm_gen","AFP-005 Standard Reports - Account Statement (Kontoauszug)"],["38645","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: Whiteliste nicht verf�gbar im E-Banking","27.06.16","lu12395","lu10865","Fehler","Avaloq","272035","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","E-Banking_Support und Vertragsadministration",""],["36938","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 �bersicht Zahlungen: Keine Daten vorhanden","18.04.16","LU13755","lue0496","Fehler","Avaloq","272106","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP INT","NTS_R2.0","E-Banking_Zahlungen","AFP-078 Payments - List of Archived Payments"],["37681","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail | Inhaber werden nicht alles angezeigt / Anrede falsch","24.05.16","lu13785","lu13807","Fehler","Avaloq","272157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-007 Standard Reports - Position Detail"],["37686","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail | Inhaber Daten werden unterschiedlich angezeigt","24.05.16","lu13785","lu13807","Fehler","Avaloq","272157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-007 Standard Reports - Position Detail"],["38031","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail falscher Inhaber bei einem und/oder","08.06.16","lu12775","lu13807","Fehler","Avaloq","272157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen",""],["38681","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 | Kontodetails | AFP-18 | Standard Reports-Account Detail | Zeile Inhaber Datenanzeige unterschiedlich","28.06.16","LU13682","lu13807","Fehler","Avaloq","272157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-018 Standard Reports - Account Detail"],["38701","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: Die Inhaberadresse in der Kontodetails-Ansicht entspricht nicht der RO Domiziladresse","28.06.16","lue0717","lu13807","Fehler","Avaloq","272157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","EBanking-Entwicklung","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38230","A - Critical","ZIW A","Warten auf Drittlieferant","Browser-Test: Bankbelege: Funktion beim Klick falsch","13.06.16","lu12775","lu13364","Fehler","Avaloq","272163","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_UI Customization",""],["38704","A - Critical","ZIW A","Warten auf Drittlieferant","Safari: PDF-Dateien werden mit den Standard-Einstellung nicht ge_ffnet","28.06.16","LU13364","lu13807","Fehler","Avaloq","272163","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP_EEBCLU05","NTS_R2.0","E-Banking_UI Customization",""],["38706","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: Migration Dauerauftr_ge - Vertrag 1125006 - Physischer DA als gel_scht im AFS","10.03.16","lu11843","lue0374","Fehler","Avaloq","272186","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP_EEBCLU04","NTS_R2.0","Sync / Migr",""],["38648","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: Gruppen Manager: Scrollen ist nicht mehr m_glich","27.06.16","lue0865","lu13807","Fehler","Avaloq","272215","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU03","NTS_R2.0","E-Banking_Verm_gen",""],["38678","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-77: Zahlungsliste: Aufruf f�hrt am 28.06.16 nach langem Warten zu \"unerwartetem Systemfehler\"","28.06.16","lu12395","lu13807","Fehler","Avaloq","272327","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen",""],["38707","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0:Zahlungslisten ALLE ZAHLUNGEN & PENDENT gehen auf Error - ZV Testing nicht mehr m_glich","29.06.16","lu11843","lu13807","Fehler","Avaloq","272327","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38757","A - Critical","ZIW A","Warten auf Drittlieferant","NTS: Pendente Zahlungen werden im AFS nicht geladen.","29.06.16","lu10160","lu13807","Fehler","Avaloq","272327","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen",""],["36187","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: Migration Dauerauftr_ge - Vertrag 1125006 - Physischer DA als gel_scht im AFS","10.03.16","lu11843","lu13807","Fehler","Avaloq","272364","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP_EEBCLU04","NTS_R2.0","Sync / Migr",""],["38738","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-98: Offline-Tool: E-Document Download - Only New bringt nicht alle neuen","29.06.16","lu12395","lu13807","Fehler","Avaloq","272384","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38732","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: AFP-98: Offline-Tool; MT940 Download ohne IBAN ergibt keine Daten","29.06.16","lu12395","lue1060","Fehler","Avaloq","272386","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38785","A - Critical","ZIW F","Warten auf Drittlieferant","NTS 2.0: AFP-094:MT940/ESR - Der gew_hlte Datunmsbereich wird angepasst durch AFS","28.06.16","lu12395","lu13807","Fehler","Avaloq","272395","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","E-Banking_Zahlungen",""],["38361","A - Critical","ZIW A","Warten auf Drittlieferant","NTS 2.0 Kontodetails | AFP-18 | Standard Reports-Account Detail | In Zeile ''Kontonummer'' wird falsche Nummer ausgewiesen","15.06.16","LU13682","lu13807","Fehler","Avaloq","252164-CR","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-018 Standard Reports - Account Detail"],["37463","B - High","ZIW F","Warten auf Drittlieferant","NTS 2.0: AFP-77: �bersicht Zahlungen: Zahlungsanweisungen aus dem ACP k_nnen nicht angezeigt werden","12.05.16","lu12395","lu10865","Fehler","Avaloq","270170","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","AFP MAIN","NTS_R2.0","E-Banking_Zahlungen","AFP-077 Payments - List of all Payments"],["37181","B - High","ZIW A","Warten auf Drittlieferant","Notification (#1027) Subskribierung f�r Benachrichtigung: Ablaufdatum Tabelle","29.04.16","lu12775","lue0456","Fehler","Avaloq","270505","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU04","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen","AFP-132 Notifications - Subscription"],["37997","B - High","ZIW A","Warten auf Drittlieferant","PEG191 NTS 2.0: NTFCN - Subskribierung ohne Ablaufdatum Datum unterschiedlich dargestellt","07.06.16","lue0456","lue0456","Fehler","Avaloq","270505","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["37746","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-92: PEG191 NTS: 'fehlende' negative OT f�hren dazu, dass nicht alle Buchungen gesynch. werden k_nnen","08.06.16","lue1163","lue1163","Fehler","Avaloq","270649","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","Sync / Migr",""],["38099","B - High","ZIW A","Warten auf Drittlieferant","AttentionItemCounterService.retrieveCounters has too Long to load","10.06.16","LU13807","lu13807","Fehler","Avaloq","270804","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Performance",""],["37809","B - High","ZIW A","Warten auf Drittlieferant","Notification: E-Mail-Adresse wird bereits nach erstem Zeichen gepr�ft","31.05.16","LU12518","lue0456","Fehler","Avaloq","270982","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Portal Betrieb",""],["38163","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-94: Konto/ZV-Daten abholen: Default Ansicht bei der Auswahl (Gesch_ft Konto/Depot)","10.06.16","lu12395","lu13807","Fehler","Avaloq","271005","Projekt NTS","","R16-3_JUN","R16-3_JUN","keine Angabe","NTS_R2.0","E-Banking_Zahlungen",""],["38168","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0 Sammelb_rsenauftrag: nicht immer Vorgabe eines Abwicklungskonto","10.06.16","lu12150","lu13807","Fehler","Avaloq","271035","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_B_rse","AFP-124 STEX - Collective Order Entry for RM/EAMs"],["38593","B - High","ZIW A","Warten auf Drittlieferant","PEG191 NTS 2.0: Unterscheidung detaillierte/nicht detaillierte Notification nicht mehr m_glich","13.05.16","lue0456","lu13807","Fehler","Avaloq","271036","Projekt NTS","AFP (Avaloq)","R16-3_JUN","Keine Angabe","DALUE5","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38288","B - High","ZIW A","Warten auf Drittlieferant","Mobile Android: Auswahl-Dropdown in Banklet _ffnet OnScreen-Tastatur","14.06.16","LU13657","lu13807","Fehler","Avaloq","271157","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["37826","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-151: Globale Settings: Dienste Deaktivieren - ergibt h_ssliche Fehlermeldung im Front","31.05.16","lu12395","lu13807","Fehler","Avaloq","271265","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Security Implementation",""],["38460","B - High","ZIW A","Warten auf Drittlieferant","PenTests NTS 2.0: Gesch�tzte Nachricht: {{...}} Injection im Betreff","14.06.16","LU13930","lu13807","Fehler","Avaloq","271367","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Security Implementation",""],["38555","B - High","ZIW A","Warten auf Drittlieferant","PEG 191 NTS 2.0: Banklet Bankbelege - Download nach Timeout ohne Systemreaktion","20.06.16","lue0456","lu13807","Fehler","Avaloq","271696","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","FB_023_Document Collaboration",""],["38092","B - High","ZIW A","Warten auf Drittlieferant","PEG191 NTS 2.0: NTFCN - Subskribierung Ereignistyp Gutschrift ab Limite Darstellung","07.06.16","lue0456","lue1183","Fehler","Avaloq","271855","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38688","B - High","ZIW A","Warten auf Drittlieferant","Notifications: Neues Abonnement erstellen - Eingabefeld-Bezeichnung falsch","28.06.16","LU12518","lue0456","Fehler","avaloq","271855","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["37468","B - High","ZIW A","Warten auf Drittlieferant","Trading Core: W_hrung vor Betrag","12.05.16","lu13780","lu13807","Fehler","Avaloq","271893","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen","AFP-144 General User Settings - Basic Settings"],["38636","B - High","ZIW A","Warten auf Drittlieferant","REST caching","24.06.16","lu13632","lu13807","Fehler","Avaloq","271979","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Performance",""],["38637","B - High","ZIW A","Warten auf Drittlieferant","Performance: JavaScript Loading","24.06.16","lu13632","lu13807","Fehler","Avaloq","271982","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Performance",""],["38676","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: Auftragsdetails - PDF Export - Expiry Date - Falsche Darstellung","28.06.16","lu13519","lu13807","Fehler","Avaloq","272094","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","E-Banking_B_rse","AFP-007 Standard Reports - Position Detail"],["38692","B - High","ZIW A","Warten auf Drittlieferant","Systemcounter Kachel: Attention Item Counter B_rsenautr_ge (TRADING_CURRENT_ORDERS_OF_TODAY) liefert falsches Ergebnis","28.06.16","lue0456","lue0456","Fehler","Avaloq","272124","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38427","B - High","ZIW A","Warten auf Drittlieferant","Saldomanager: Ausgew_hltes Konto wird druch nachtr_glichen Einstellungen ge_ndert (hohes Risiko einer Falschzahlung)","16.06.16","LU12282","lu13807","Fehler","Avaloq","272174","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38700","B - High","ZIW A","Warten auf Drittlieferant","Notification: Not all SMS are sent on a block of notifications","28.06.16","lue1147","lue1147","Fehler","Avaloq","272220","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Portal Betrieb",""],["38668","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0 B_rse Auftragsbuch laden dauert viel zu lange","27.06.16","lu13519","lu13807","Fehler","Avaloq","272235","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_B_rse","AFP-114 STEX - Order Overview / Details"],["38685","B - High","ZIW A","Warten auf Drittlieferant","Minify & aggregate Javascript","28.06.16","lu13632","lu13807","Fehler","Avaloq","272242","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","INT","NTS_R2.0","Performance",""],["38019","B - High","ZIW A","Warten auf Drittlieferant","Mobile: Banklets werden nicht korrekt dargestellt","08.06.16","LU13657","lu13807","Fehler","Avaloq","272265","Projekt NTS","","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38744","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: Position-List Banklet unterst�tzt landscape nicht beim PDF Export","29.06.16","lue0717","lu13807","Fehler","Avaloq","272267","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","EBanking-Entwicklung","NTS_R2.0","E-Banking_Verm_gen",""],["38746","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0 | Kontodetails | AFP-18 | Standard Reports-Account Detail | Eintrag Verf�gbarer Betrag nicht immer korrekt","29.06.16","LU13682","lu13807","Fehler","Avaloq","272334","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-018 Standard Reports - Account Detail"],["38708","B - High","ZIW A","Warten auf Drittlieferant","Zahlungshistorie anzeigen: die Anzeige wird teilweise von den Kacheln �berdeckt / Vertrag 1018055","29.06.16","lu10531","lu13807","Fehler","Avaloq","272375","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen",""],["36513","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0 Kontoauszug | AFP-5 | Standard Reports-Account Statement (Kontoauszug) Sortierungsfunktionen fehlen","29.03.16","LU13682","lu13364","Fehler","Avaloq","272376","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-005 Standard Reports - Account Statement (Kontoauszug)"],["38756","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0 | Kontoauszug | AFP-5 | Standard Reports-Account Statement (Kontoauszug) | Sortierungsfunktion fehlt","29.06.16","LU13682","lu13807","Fehler","Avaloq","272376","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-005 Standard Reports - Account Statement (Kontoauszug)"],["38766","B - High","ZIW A","Warten auf Drittlieferant","Performance Improvement Avaloq SSO Hook","30.06.16","lu13632","lu13807","Fehler","Avaloq","272394","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","Performance",""],["38786","B - High","ZIW A","Warten auf Drittlieferant","NTS 2.0: Bei Positionslisten-Banklets k_nnen keine Spalten f�r den Export definiert werden","30.06.16","lue0717","lue0717","Fehler","Avaloq","272396","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","EBanking-Entwicklung","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38058","C - Medium","ZIW A","Warten auf Drittlieferant","PEG191 NTS 2.0: NTFCN - Periodicity Possiblitiy to define an Order","01.04.16","lue0456","lue0456","Fehler","Avaloq","270754","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen","AFP-131 Notifications - Framework"],["38189","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: NTFCN Missing fields in the API for subcriptions generation","13.06.16","lue1147","lu13807","Fehler","Avaloq","270928","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP MAIN","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen","AFP-131 Notifications - Framework"],["37945","C - Medium","ZIW B","Warten auf Drittlieferant","NTS: Person/Konto CTX (Context Action) \"E-Banking �bersicht\" zeigt Vertrag nicht sofort an // Folge QC von 36883","06.06.16","lu12153","lu13807","Fehler","Avaloq","270930","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","QALU01","NTS_R2.0","E-Banking_Support und Vertragsadministration",""],["38161","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-94: Konto/ZV-Daten abholen - Auswahl Dateityp","10.06.16","lu12395","lu13807","Fehler","Avaloq","270953","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen",""],["37992","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-40: Dauerauftrag: Zahlungszweck zu lang ergibt Tool-Tipp","07.06.16","lu12395","lu13807","Fehler","Avaloq","271037","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU04","NTS_R2.0","E-Banking_Zahlungen","AFP-040 Payments - Standing Orders"],["37998","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-74: Freigabezahlungen: Betrag-Filter Meldungen in Englisch","07.06.16","lu12395","lu13807","Fehler","Avaloq","271041","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU04","NTS_R2.0","E-Banking_Zahlungen","AFP-074 Payments - List of Payments to be approved"],["37991","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-59: Zahlungsvorlagen - mehrere Zahlungen mit Hinweis\" in bestimmten F_llen ist eine Eingabe erforderlich","07.06.16","lu12395","lu13807","Fehler","Avaloq","271075","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU04","NTS_R2.0","E-Banking_Zahlungen","AFP-059 Payments - Payment Templates"],["37988","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: AFP-59: Zahlungsvorlagen Detail hat �berfl�ssigen Titel","07.06.16","lu12395","lu13807","Fehler","Avaloq","271219","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP_EEBCLU04","NTS_R2.0","E-Banking_Zahlungen","AFP-059 Payments - Payment Templates"],["38184","C - Medium","ZIW A","Warten auf Drittlieferant","Einzahlungsschein Rot/Orange - Fehlender Pr�fen-Button nach Eingabe PC-Kontonummer","10.06.16","LU12282","lu13807","Fehler","Avaloq","271368","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen","AFP-036 Payments - Einzahlungsschein rot"],["38483","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0:  AFP-79: E-Rechnung: Rechnungssteller hinzuf�gen - Es kann nicht nach Ort gefiltert werden","17.06.16","lu12395","lu13807","Fehler","Avaloq","271909","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen","AFP-079 Payments - Paynet - MISC"],["38186","C - Medium","ZIW A","Warten auf Drittlieferant","Multiselect Inhaber/Gruppe - Alternatives Schliessen erm_glichen","10.06.16","LU12282","lu13807","Fehler","Avaloq","271910","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen",""],["38542","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0: Gesendete DTA-Dateien: Best_tigung der L_schung","20.06.16","lu12395","lu13807","Fehler","Avaloq","272397","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Zahlungen","AFP-092 File Transfer - DTA File History"],["38714","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0 | Gesamt�bersicht | AFP-2 | Wealth Overview-Retail Version (Gesamt�bersicht) | Betragsformat in der Spalte Saldo bei Hypotheken stimmt nicht","29.06.16","LU13682","lu13807","Fehler","Avaloq","272407","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-002 Wealth Overview - Retail Version (Gesamt�bersicht)"],["38764","C - Medium","ZIW A","Warten auf Drittlieferant","NTS 2.0 | Kontoauszug | AFP-5 | Standard Reports-Account Statement (Kontoauszug) | Filter | Zeichenbeschr_nkung in Datumfelder fehlt","30.06.16","LU13682","lu13807","Fehler","Avaloq","272423","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","AFP INT","NTS_R2.0","E-Banking_Verm_gen","AFP-005 Standard Reports - Account Statement (Kontoauszug)"],["35335","D - Low","ZIW B","Warten auf Drittlieferant","NTS 2.0 Kategorisierung von Versandprodukten kann f�r Private Rows in CODE_MAIL nicht vorgenommen werden (CODE_MAIL_CAT)","11.01.16","lu13190","lu13190","Fehler","Avaloq","259541","Projekt NTS","AFP (Avaloq)","R16-3_JUN","R16-3_JUN","DALUE5","NTS_R2.0","E-Banking_Allgemeine Themen und Einstellungen","AFP-126 Document Safe (Bankbelege E-Output)"]];


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
