export interface MunicipalityData {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  votes: {
    candidate: string;
    party: string;
    turno: 1 | 2;
    totalVotes: number;
    percentage: number;
  }[];
  totalVoters: number;
}

export const candidates = [
  "AAVA SANTIAGO",
  "ABILIO",
  "ADAIL PINHEIRO",
  "ADAILTON FURIA",
  "ADERALDO PINTO",
  "ADHEMAR FREITAS JR",
  "ADILO",
  "ADRIANA ACCORSI",
  "ADRIANE LOPES",
  "ADRIANO DA PIABETA",
  "ADRIANO SILVA",
  "AERO SIM",
  "AERTON GRANDE",
  "AFFONSO CANDIDO",
  "AGNA SOUZA",
  "AIACHE",
  "ALAEZIO DO TEIXEIRAO",
  "ALAN GUEDES",
  "ALCEMIR COSTA",
  "ALEX HENRIQUE",
  "ALEXANDRE AZEVEDO",
  "ALEXANDRE DO SINDICATO",
  "ALEXANDRE MATIAS",
  "ALEXANDRE RAMAGEM",
  "ALEXANDRE VARGAS",
  "ALICE CARVALHO",
  "ALINE 10",
  "ALINE LEITE",
  "ALISSON DA TIM",
  "ALMIR BELO",
  "ALMIR SURUI",
  "ALMIR VIEIRA",
  "ALVARO DA A7",
  "AMANDA PASCHOAL",
  "AMANDA SILVEIRA",
  "AMILTON FONTES",
  "AMOM MANDEL",
  "ANA CAROLINA OLIVEIRA",
  "ANA PAULA LIMA",
  "ANADELSO PEREIRA",
  "ANDERSON CORREIA",
  "ANDERSON LIMA",
  "ANDERSON SILVA",
  "ANDRE CAMPOS",
  "ANDRE FERNANDES",
  "ANDRE FORTALEZA",
  "ANDRE RIBEIRO",
  "ANDREIA REZENDE",
  "ANDRESA SILVEIRA",
  "ANDREZA ROMERO",
  "ANGELINA DIAS",
  "ANTONIO CAMPOS",
  "ANTONIO GOMIDE",
  "ANTONIO REIS",
  "ARMANDINHO",
  "ARMANDO FILHO",
  "ARNALDINHO BORGO",
  "ARNOUD LUCAS",
  "ARTHUR HENRIQUE",
  "ARTUR BOLINHA",
  "AUDIFAX BARCELOS",
  "AUGUSTINHO PEDROSO",
  "AZAMOR PESSOA",
  "BABA TUPINAMBA",
  "BALA ROCHA",
  "BARBOSA NETO",
  "BELA BARROS",
  "BELLA CARMELO",
  "BETINHO",
  "BETO FIGUEIRO",
  "BETO PEREIRA",
  "BIAZON",
  "BILU DO POVO",
  "BIRA",
  "BRANDEL JUNIOR",
  "BRAS ZAGOTTO E BOM",
  "BRENA DIANNA",
  "BRENNA NOBREGA",
  "BRENO",
  "BRENO DE VARDO DA LOTERICA",
  "BRENO GARIBALDE",
  "BRUNA VERAS",
  "BRUNNO LOPES",
  "BRUNO CUNHA",
  "BRUNO CUNHA LIMA",
  "BRUNO DO AREAL",
  "BRUNO ENGLER",
  "BRUNO LAMBRETA",
  "BRUNO MORAES",
  "BRUNO PEZAO",
  "BRUNO REIS",
  "BRUNO VILARINHO",
  "CABO LINHARES",
  "CABO MACIEL",
  "CACIQUE",
  "CAIO CORDEIRO",
  "CAIO OLIVEIRA",
  "CALEBE HENRIQUE",
  "CAMILA JARA",
  "CAPITA ELIZETE",
  "CAPITAO ALBERTO NETO",
  "CAPITAO WAGNER",
  "CARLA REDANO",
  "CARLAO COMUNITARIO MESMO",
  "CARLITO MERSS",
  "CARLO CAIADO",
  "CARLOS AMASTHA",
  "CARLOS BOLSONARO",
  "CARLOS DO CALISTO",
  "CARLOS EDUARDO",
  "CARLOS MEDEIROS",
  "CARLOS MUNIZ",
  "CAROL GOMES",
  "CARRIJO",
  "CASTEGLIONE",
  "CATARINA GUERRA",
  "CECI PROTETORA",
  "CELIO LOPES",
  "CELSO DO ALBA",
  "CELSO POPO",
  "CESINHA",
  "CHAGAS MOURA",
  "CHAMONZINHO",
  "CHARLES DA EDUCACAO",
  "CHARLLES EVANGELISTA",
  "CHAVAO",
  "CHICAO VIANNA",
  "CHICO JOIA JUNIOR",
  "CICERO LUCENA",
  "CIDA",
  "CLAUDIA SEABRA",
  "CLAUDIO THOMAZ",
  "COLEMAR DA SABORELLE",
  "COMANDANTE NADIA",
  "CORONEL RAMALHO",
  "CREONE DA FARMACIA",
  "CRIS LAUER",
  "CRISTIANO PISONI",
  "CRISTIANO RODRIGUES",
  "CRISTINA GRAEML",
  "DA COSTA DO PERDEU PIA",
  "DAIANE MELLO",
  "DALTON",
  "DANDARA",
  "DANI PORTELA",
  "DANIEL BARROS FISCAL DO POVO",
  "DANIEL CARVALHO",
  "DANIEL COELHO",
  "DANIEL CUNHA DA CAMARA",
  "DANIEL MENDONCA",
  "DANIEL THEODORO",
  "DANIEL VALENCA",
  "DANIELL RENDALL",
  "DANILO BALAS",
  "DAPHINY PRETA",
  "DARIO SAADI",
  "DATENA",
  "DAVI ROCHA",
  "DAVID ALMEIDA",
  "DE MOTOTAXI",
  "DEBORA CAMILO",
  "DEIVID WISLEY",
  "DELCIDIO AMARAL",
  "DELEGADA MADELEINE",
  "DELEGADA TATHIANA ",
  "DELEGADO CHARLES",
  "DELEGADO EGIDIO",
  "DELEGADO LUIZ ALVES",
  "DELIO PINHEIRO",
  "DENISE PESSOA",
  "DEVACIR RABELLO",
  "DIEGO FELIPE",
  "DIEGO GARCIA",
  "DIEGO LIBARDI",
  "DIEGO MACHADO",
  "DIEGO SALIBA",
  "DINHO",
  "DIOGENES FERREIRA",
  "DIRCEU",
  "DOUTOR HERCULES",
  "DOUTORA ROSANA VETERINARIA",
  "DR BENEDITO ALVES",
  "DR BUCHAUL",
  "DR FELBEK",
  "DR FURLAN",
  "DR GILBER",
  "DR GILBERTAO",
  "DR JENILSON",
  "DR JHONY",
  "DR JUNIOR QUEIROZ",
  "DR MARCONDE RODRIGUES",
  "DR MARCOS",
  "DR MARCUS VINICIUS",
  "DR OSVALDO FONSECA",
  "DR PABLO SANTOS",
  "DR PESSOA",
  "DR SILVIO CEZAR",
  "DR ZILFRAN",
  "DR. CASEIRO",
  "DR. GABRIEL",
  "DR. JOSE FERNANDES",
  "DR. JULIO",
  "DR. MURILLO LIMA",
  "DR. RAIONE CABRAL",
  "DRA AMALIA MILANI",
  "DUDA SALABERT",
  "DUERITA NETA",
  "DULCE MENEZES",
  "EDER BLANK PATACA",
  "EDILSON CARVALHO",
  "EDIMAR KAPICHE",
  "EDIVAM DO MOCA",
  "EDMILSON DO SALGADO",
  "EDMILSON SANCHES",
  "EDMILSON SOARES",
  "EDSON PASSOS",
  "EDSON SCABORA",
  "EDUARDO BOTELHO",
  "EDUARDO DRAGA ALANA",
  "EDUARDO FORTES",
  "EDUARDO GIRAO",
  "EDUARDO PAES",
  "EDUARDO PIMENTEL",
  "EDUARDO SIQUEIRA CAMPOS",
  "EDVALDO LIMA",
  "EERIZANIA FREITAS",
  "ELIEL FELIPE",
  "ELINHO OLIVEIRA",
  "ELLIS REGINA DO SINDEPROF",
  "ELTER NOBREGA",
  "ELZINHA MENDONCA",
  "EMANO ARAUJO",
  "EMANUEL ACRIZIO",
  "EMILIA CORREA",
  "ENIO DA BRIGIDA",
  "ENZO SAMUEL",
  "ERIKO JACOME",
  "ESLANE PAIXAO",
  "EUGENIA LIMA",
  "EVANDRO LEITAO",
  "EVANDRO OLIVEIRA",
  "EVERTON MATOS",
  "EZIO MORAES",
  "FABAO",
  "FABIANA PESSOA",
  "FABIO COSTA",
  "FABIO NOVO",
  "FABRICIO CARDOSO",
  "FAUSTO PERES",
  "FELIPE CAMOZZATO",
  "FELIPE GREMELMAIER",
  "FELIPE NASCIMENTO",
  "FELIPE TCHE",
  "FELIPE VASQUES",
  "FELIPE VIEIRA",
  "FERNANDA MIRANDA",
  "FERNANDA PEREIRA ALTOE",
  "FERNANDO ESTIMA",
  "FERNANDO HENRRIQUE",
  "FERNANDO MENEZES",
  "FERNANDO RODOLFO",
  "FERNANDO SANTANA",
  "FERNANDO SILVA",
  "FERRACO",
  "FILIPE ROZIQUE DA FAAR",
  "FLAMARION AMARAL",
  "FLAVIA MORETTI",
  "FLAVIO MANTOVANI",
  "FOLHA",
  "FRANCINALDO LEAO",
  "FRANKLIN",
  "FRED RODRIGUES",
  "FUAD NOMAN",
  "GABRIEL",
  "GABRIEL BIOLOGIA",
  "GABRIEL CESAR",
  "GALEGO DE LAJES",
  "GCM ROMARIO POLICARPO",
  "GENILSON COSTA",
  "GENTIL NETO",
  "GERALDO JUNIOR",
  "GERLEN DINIZ",
  "GERUSA SAMPAIO",
  "GEYLSON",
  "GIL PARAIBANO",
  "GILBERTO CUNHA",
  "GILBERTO LIRA",
  "GILBERTO MELO",
  "GILSAO MEU POVO",
  "GILSON MACHADO",
  "GILSON MACHADO FILHO",
  "GILVAM BORGES",
  "GIMENEZ FRITZ",
  "GIOVANI DAMICO",
  "GISA BARROS",
  "GLEDSON BEZERRA",
  "GLEISON FLAVIO",
  "GORDINHO DE JORGE DA LARANJA",
  "GRACA DA CASA DO MOTOR",
  "GRAZI OLIVEIRA",
  "GUGA PET ",
  "GUILHERME BOULOS",
  "GUILHERME GUIMARAES",
  "GUILHERME KILTER",
  "GUSTAVO AMIGO DO POVO ",
  "GUSTAVO PEDROZA",
  "HANNA SANTANA",
  "HARBEN AVELAR",
  "HEITOR ANDRADE",
  "HELDER CARVALHO",
  "HELENA LIMA",
  "HELIO DA APAE",
  "HELIO LEITE",
  "HIAGO MORANDI",
  "HIGOR DIEGO",
  "HUMBERTO HENRIQUE",
  "IDELSON MENDES",
  "IGOR DIAS ",
  "IGOR ELSON",
  "ILKER MORAES",
  "ILO NETO",
  "INACIO",
  "INACIO FALCAO",
  "IONE",
  "IRAJA RODRIGUES",
  "IRAN BARBOSA",
  "IRAPOA",
  "IRMAO TADEU",
  "IRMAO ZE LUIS",
  "ISA MARCONDES",
  "ISAAC MARTINS",
  "ISAU FONSECA",
  "ISAURO CALAIS",
  "ITALO GOMES",
  "ITALO MOREIRA",
  "ITALO OTAVIO",
  "ITHIARA MADUREIRA",
  "ITO",
  "IVONEIDE BERNARDINO",
  "IVONETE LUDGERIO",
  "IZA LOURENCA",
  "IZABEL URQUIZA DE OLINDA",
  "IZOLDA CELA",
  "JAILMA CARVALHO",
  "JAMES RODRIGUES",
  "JANAD VALCARI",
  "JANIO MIGUEL",
  "JANSEN PENHA",
  "JARUDE",
  "JASSON GOULART",
  "JEAN CARLOS",
  "JEANY PINHEIRO",
  "JERO NETO",
  "JESSE SANGALLI",
  "JESSICA SALES",
  "JESSICAO",
  "JHONATAS MONTEIRO",
  "JO OLIVEIRA",
  "JOAO ALBERTO",
  "JOAO BATISTA BABA",
  "JOAO BETTEGA",
  "JOAO CAMPOS",
  "JOAO CORUJINHA",
  "JOAO DONIZETI",
  "JOAO JUSTINO",
  "JOAO MENDES",
  "JOAO NETO GOMES",
  "JOAO TORRES",
  "JOAO UEZ",
  "JOAOZINHO DO LAGAMAR",
  "JOILSON RODRIGUES",
  "JONATAS KAIKY",
  "JORGE ARAUJO REPORTER",
  "JOSE DE LIMA",
  "JOSE RONALDO",
  "JOSE SARTO",
  "JOSI LOPES DO PT",
  "JOSI NUNES",
  "JOSIVALDO JP",
  "JOSIVALDO RATO",
  "JOVAN TEMELJKOVITCH",
  "JOZIEL DE BRITO",
  "JUCA ALVES",
  "JUIZA EUMA TOURINHO",
  "JULIANA BRIZOLA",
  "JULIO CEZAR MEDEIROS",
  "JULIO DELGADO",
  "JULLIAN DE CIELIO",
  "JUNIOR DO GUARABIRA",
  "JUNIOR GALVAO",
  "JUNIOR GAMA",
  "JUNIOR MARTINS",
  "JUNIOR MENEZES",
  "JUNIOR REIS",
  "KALIL BARACAT",
  "KAREN SANTOS",
  "KARINA CAFE",
  "KARINE RIBEIRO",
  "KARLOS CABRAL",
  "KASSIANO TAVARES",
  "KELEU",
  "KENNEDY",
  "KENNEDY MARQUES PROTETOR",
  "KLEBER ROSA",
  "LALO",
  "LARA CAVALCANTI",
  "LEANDRO VILELA",
  "LEO",
  "LEO CABECA",
  "LEO CAMARGO",
  "LEO LIMA",
  "LEO PINDOBA",
  "LEO SATURNINO",
  "LEONIDIO BOUCAS",
  "LEOZINHO FILHO",
  "LINDOMAR FERREIRA",
  "LINO ALVES",
  "LISSAUER VIEIRA",
  "LORENA VASQUES",
  "LUCAS CAREGNATO",
  "LUCAS PAVANATO",
  "LUCIANO BARBOSA",
  "LUCIANO CARTAXO",
  "LUCIANO DO MLB",
  "LUCIANO DUCCI",
  "LUDIO",
  "LUIZ ANTONIO PARDAL",
  "LUIZ CARLOS",
  "LUIZ CLAUDIO GUBERT",
  "LUIZ ROBERTO",
  "LUIZAO GOULART",
  "LUKAO",
  "LULINHA",
  "LYCIA WAQUIM",
  "MABEL",
  "MAGRAO DA RADIO",
  "MAIANA STRINGARI",
  "MAJOR VITOR HUGO",
  "MANOEL DA ACOSAP",
  "MANOEL NEVES",
  "MARCAL FILHO",
  "MARCELA TROPIA",
  "MARCELINHO FAVERO",
  "MARCELO BAGE",
  "MARCELO DE DENILSON",
  "MARCELO DIAS",
  "MARCELO MOURAO",
  "MARCELO QUEIROGA",
  "MARCELO QUEIROZ",
  "MARCELO RAMOS",
  "MARCIANO JUNIOR",
  "MARCIANO PERONDI",
  "MARCIO BOTELHO",
  "MARCIO CORREA",
  "MARCIO PACELE",
  "MARCIO REIS",
  "MARCIO RIBEIRO",
  "MARCO AURELIO",
  "MARCO CASTILHOS",
  "MARCOS LIMA",
  "MARCOS MIRANDA",
  "MARCUS ALEXANDRE",
  "MARGARIDA SALOMAO",
  "MARIA DO ROSARIO",
  "MARIA ORLANDA",
  "MARIANA CARVALHO",
  "MARIANA CONTI",
  "MARILANDE ALVES",
  "MARILON BARBOSA",
  "MARIO ABRAHIM",
  "MARIO ASSUNCAO",
  "MARIO CEZAR LUSTOSA",
  "MARIO VERRI",
  "MARISOL SANTOS",
  "MARLEI MEZZOMO",
  "MARLON MOURA",
  "MARLON SOBREIRA",
  "MARQUINHO BACELLAR",
  "MARQUINHOS TRAD",
  "MARRONI",
  "MATEUS ASSAYAG",
  "MATHEUS CORREA",
  "MATHEUS MONTEIRO",
  "MATHEUS RIBEIRO",
  "MAURICIO",
  "MAURICIO GORZA",
  "MAURICIO TRINDADE",
  "MAURO NAKASHIMA",
  "MAURO TRAMONTE",
  "MENANDRO",
  "MICHAEL BORGES",
  "MICHEL PROMOVE",
  "MICHELE THOMAZINHO",
  "MICHELE VALADARES",
  "MICHELLE SANTOS",
  "MILTON DO COMPLEMENTAR",
  "MIRELLA",
  "MIRTES DA TRANSTERRA",
  "MIUDO",
  "MIZAEL PRESTANISTA",
  "MOANA VALADARES",
  "MOISES DO JARDIM DO OURO",
  "NABOR",
  "NALDO LIMA",
  "NANDO PINHEIRO",
  "NANDO POETA",
  "NATALIA BONAVIDES",
  "NATALIA DE MENUDO",
  "NEEMIAS MIQUEIAS",
  "NEGAO FILHO DO ISAU",
  "NEGRO BUSSOLA",
  "NELCIR FORMEHL",
  "NENEM DO FRANGO",
  "NENZINHA",
  "NETINHO REIS",
  "NETO PETTERS DO NOVO",
  "NEY LEPREVOST",
  "NEY NOBRE",
  "NICK SCHNEIDER",
  "NILDA ABRAHIM",
  "NILSON TAKASHI",
  "NITINHO",
  "NOVINHO DE CARLAO",
  "ODACY AMORIM",
  "ODAIR TRAMONTIN",
  "OMARZINHO",
  "OSCAR RODRIGUES",
  "OTTACI",
  "PABLO ALMEIDA",
  "PABLO MARCAL",
  "PABLO MURIBECA",
  "PANTICO",
  "PASTOR ASCENDINO BATISTA",
  "PASTOR DINHO SOUZA",
  "PASTOR JOSE",
  "PASTORA LEIA PELAES",
  "PATRICIA FERRAZ",
  "PATRICIA TELES",
  "PAULINHO",
  "PAULINHO DO CHURRASQUINHO",
  "PAULINHO DO TRANSPORTE",
  "PAULINHO FREIRE",
  "PAULO 50",
  "PAULO BRANDAO",
  "PAULO GUEDES",
  "PAULO MIYASIRO",
  "PAULO NERY",
  "PAULO SERGIO",
  "PEDRO COELHO",
  "PEDRO DA AGROVILA",
  "PEDRO MORAIS",
  "PEDRO PIO",
  "PEDRO TOURINHO",
  "PLINIO OLIVEIRA",
  "PRISCILA COSTA",
  "PROCOPIO",
  "PROFA GRACIELE",
  "PROFESSOR AILTON PALIKUR",
  "PROFESSOR ALCIDES",
  "PROFESSOR BENIZARIO",
  "PROFESSOR BURMANN",
  "PROFESSOR EDILEUDO",
  "PROFESSOR EDWARD",
  "PROFESSOR GILSON",
  "PROFESSOR JEFFERSON",
  "PROFESSOR JUNIOR GEO",
  "PROFESSOR MARCELO",
  "PROFESSOR MARCOS CARVALHO",
  "PROFESSOR NICOLAS TRANCHO",
  "PROFESSOR ROBERTO CARLOS",
  "PROFESSOR TONNY",
  "PROFESSOR WAINER",
  "PROFESSOR ZE ROBERTO",
  "PROFESSORA FLAVIA CABRAL",
  "PROFESSORA LELIANE BORGES",
  "PROFESSORA MARIA TEREZA",
  "PROFESSORA MARLI",
  "PROFESSORA NILDA",
  "RACIB HARB",
  "RADAMES ESTRELA",
  "RAFA ZIMBALDI",
  "RAFAEL ALOISIO FREITAS",
  "RAFAEL ESTRELA DO MAR",
  "RAFAEL MOTTA",
  "RAFAEL TAVARES",
  "RAFAELA ",
  "RAFAELA DE NILDA",
  "RAFAELA DO BATISTA",
  "RAFAFA",
  "RAMIRO ROSARIO",
  "RAMON",
  "RAMON IZIDORO",
  "RAMONILSON",
  "RARISON SANTIAGO",
  "RAUL MARCELO",
  "REAL",
  "REGINALDO BACCI",
  "REGINALDO DO POSTO",
  "REMIDIO KUNTZ",
  "RENATO PADEIRO",
  "RICARDO ALBA",
  "RICARDO LIBERATO",
  "RICARDO NUNES",
  "RICARDO VASCONCELOS",
  "RIESGO",
  "RILDO AMARAL",
  "RINALDINHO",
  "ROBERTA LEITAO",
  "ROBERTA LOPES",
  "ROBERTO CIDADE",
  "ROBERTO COSTA",
  "ROBERTO DORNER",
  "ROBERTO FILHO",
  "ROBERTO FRANCO",
  "ROBSON CARVALHO",
  "RODRIGO AMORIM",
  "RODRIGO BORNHOLDT",
  "RODRIGO CADEIRANTE",
  "RODRIGO DA FARMADIC",
  "RODRIGO DECIMO",
  "RODRIGO MACIEL",
  "RODRIGO MANGA",
  "RODRIGO PINHEIRO",
  "ROGERIO CARDOSO",
  "ROGERIO NEZINHO",
  "ROGERIO SANTOS",
  "ROMERINHO JATOBA",
  "RONALDO DA TRINTA E TRES",
  "RONALDO MARTINS",
  "RONIVON MACIEL",
  "ROSANA VALLE",
  "ROSANE",
  "ROSANGELA CURADO",
  "ROSE MODESTO",
  "ROSY PRADO",
  "RUDYS CONFIRMADISSIMO",
  "RUY CARNEIRO",
  "RUY MUNIZ",
  "SA",
  "SALATIEL",
  "SALES DO ACOUGUE",
  "SAMIR BESTENE",
  "SAMYR QUALHADA",
  "SANDRA DONATO",
  "SANDRIELY CUNHA",
  "SANDRO LELIS",
  "SARGENTO LIMA",
  "SARGENTO MELLO CASAL",
  "SARGENTO NANTES",
  "SARGENTO NOVANDIR",
  "SARGENTO SALAZAR",
  "SAULINHO DA ACADEMIA ",
  "SAULO HOLANDA",
  "SAVIO SOBREIRA",
  "SCALCO",
  "SCOPONY",
  "SEBASTIAO MELO",
  "SERAFIM",
  "SERGINHO",
  "SERGIO",
  "SERGIO CECHIN",
  "SERGIO DO SINDICATO",
  "SERGIO LEAL",
  "SERGIO SANTANA",
  "SGT EDNALDO",
  "SHEILA ALCANTARA",
  "SILVIO BARROS",
  "SILVIO MENDES",
  "SILVIO PITU",
  "SIMAO DURANDO",
  "SOCORRINHA BRASILEIRO",
  "SOCORRO NOGUEIRA",
  "SUED CARVALHO",
  "TABATA AMARAL",
  "TAINA DE PAULA",
  "TARCISIO MOTTA",
  "TATA TEIXEIRA",
  "TECIO TELES",
  "TEDDY",
  "TEILTON VALIM",
  "TELMA DE SOUZA",
  "TENENTE AURIVAM",
  "TERCILIO TURINI",
  "THAMIRES RANGEL ",
  "THAYSA LIPPY",
  "THIDY QUEIROZ",
  "THUIN",
  "TIAGO AMARAL",
  "TIAGO BOTELHO",
  "TIAGO VIOLA",
  "TIAO BOCALOM",
  "TIDE EDUARDO",
  "TITAN",
  "TOINHO ANDRADE",
  "TOM CABELEIREIRO",
  "TONI CUNHA",
  "TULIO BARCELOS",
  "UESLEI TELES",
  "VALDECI OLIVEIRA",
  "VALDECY NUNES",
  "VALDENIR MAGRAO",
  "VALDIR OLIVEIRA",
  "VALERIA LIMA",
  "VALMIR DE FRANCISQUINHO",
  "VANDERLAN CARDOSO",
  "VANDINHO DA PADARIA",
  "VANIA NASCIMENTO",
  "VETERINARIO FRANCISCO",
  "VINI",
  "VINICIUS CASTELLO",
  "VINICIUS DUARTE",
  "VINICIUS SABA DE ALENCAR",
  "VITINHO",
  "WAGNER NUNES",
  "WAGUINHO DE LEITOA",
  "WALCIMAR FONSECA",
  "WANDERLEY ALVES",
  "WELLINGTON CARRIJO",
  "WELLINGTON DANTAS",
  "WEMERSON BARRIGA",
  "WESLEY COUTINHO",
  "WESLEY TEIXEIRA",
  "WEVERSON MEIRELES",
  "WILIAN TONEZI",
  "WILLIAN PANDA",
  "WILSON MATOS",
  "WLADIMIR GAROTINHO",
  "WOLNEY FRANCA",
  "XIMENES",
  "YURI EZEQUIEL",
  "ZE CARLOS",
  "ZE NETO",
  "ZE QUEIROZ",
  "ZE RICARDO",
  "ZE ROBERTO",
  "ZENILDO DO ALTO DO COCAR",
  "ZEQUINHA LIMA",
  "ZITO"
];

export const parties = [
  "AGIR",
  "AVANTE",
  "CIDADANIA",
  "DC",
  "MDB",
  "MOBILIZA",
  "NOVO",
  "PC DO B",
  "PCB",
  "PCO",
  "PDT",
  "PL",
  "PMB",
  "PODE",
  "PP",
  "PRD",
  "PRTB",
  "PSB",
  "PSD",
  "PSDB",
  "PSOL",
  "PSTU",
  "PT",
  "PV",
  "REDE",
  "REPUBLICANOS",
  "SOLIDARIEDADE",
  "UNIO",
  "UP"
];


export const mockElectionData: MunicipalityData[] = [
  {
    "id": "93559040",
    "name": "CRUZEIRO DO SUL",
    "state": "AC",
    "coordinates": [
      -7.636248,
      -72.669165
    ],
    "votes": [
      {
        "candidate": "CRISTIANO RODRIGUES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1637,
        "percentage": 2.85
      },
      {
        "candidate": "ELTER NOBREGA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1961,
        "percentage": 3.42
      },
      {
        "candidate": "JESSICA SALES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 24281,
        "percentage": 42.34
      },
      {
        "candidate": "KELEU",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1562,
        "percentage": 2.72
      },
      {
        "candidate": "VALERIA LIMA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1994,
        "percentage": 3.48
      },
      {
        "candidate": "ZE ROBERTO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1430,
        "percentage": 2.49
      },
      {
        "candidate": "ZEQUINHA LIMA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 24478,
        "percentage": 42.69
      }
    ],
    "totalVoters": 57343
  },
  {
    "id": "28018026",
    "name": "RIO BRANCO",
    "state": "AC",
    "coordinates": [
      -9.976536,
      -67.822078
    ],
    "votes": [
      {
        "candidate": "AIACHE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5497,
        "percentage": 2.44
      },
      {
        "candidate": "BRUNO MORAES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5898,
        "percentage": 2.62
      },
      {
        "candidate": "DR JENILSON",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 6420,
        "percentage": 2.85
      },
      {
        "candidate": "ELZINHA MENDONCA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 4755,
        "percentage": 2.11
      },
      {
        "candidate": "FELIPE TCHE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 4979,
        "percentage": 2.21
      },
      {
        "candidate": "JARUDE",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 14186,
        "percentage": 6.31
      },
      {
        "candidate": "MARCUS ALEXANDRE",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 68884,
        "percentage": 30.62
      },
      {
        "candidate": "SAMIR BESTENE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5704,
        "percentage": 2.54
      },
      {
        "candidate": "TIAO BOCALOM",
        "party": "PL",
        "turno": 1,
        "totalVotes": 108605,
        "percentage": 48.28
      }
    ],
    "totalVoters": 224928
  },
  {
    "id": "44314382",
    "name": "SENA MADUREIRA",
    "state": "AC",
    "coordinates": [
      -9.065956,
      -68.657106
    ],
    "votes": [
      {
        "candidate": "GERLEN DINIZ",
        "party": "PP",
        "turno": 1,
        "totalVotes": 13391,
        "percentage": 44.88
      },
      {
        "candidate": "GILBERTO LIRA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 11293,
        "percentage": 37.85
      },
      {
        "candidate": "IVONEIDE BERNARDINO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 1021,
        "percentage": 3.42
      },
      {
        "candidate": "MENANDRO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1160,
        "percentage": 3.89
      },
      {
        "candidate": "PANTICO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1024,
        "percentage": 3.43
      },
      {
        "candidate": "REAL",
        "party": "PL",
        "turno": 1,
        "totalVotes": 972,
        "percentage": 3.26
      },
      {
        "candidate": "TOM CABELEIREIRO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 975,
        "percentage": 3.27
      }
    ],
    "totalVoters": 29836
  },
  {
    "id": "43954247",
    "name": "ARAPIRACA",
    "state": "AL",
    "coordinates": [
      -9.754866,
      -36.661471
    ],
    "votes": [
      {
        "candidate": "ALISSON DA TIM",
        "party": "PP",
        "turno": 1,
        "totalVotes": 4343,
        "percentage": 3.05
      },
      {
        "candidate": "DR SILVIO CEZAR",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 583,
        "percentage": 0.41
      },
      {
        "candidate": "FABIANA PESSOA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 16635,
        "percentage": 11.69
      },
      {
        "candidate": "LEO SATURNINO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 4410,
        "percentage": 3.1
      },
      {
        "candidate": "LINDOMAR FERREIRA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 536,
        "percentage": 0.38
      },
      {
        "candidate": "LUCIANO BARBOSA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 100890,
        "percentage": 70.9
      },
      {
        "candidate": "RAMON IZIDORO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3169,
        "percentage": 2.23
      },
      {
        "candidate": "ROGERIO NEZINHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 6597,
        "percentage": 4.64
      },
      {
        "candidate": "SERGIO DO SINDICATO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5139,
        "percentage": 3.61
      }
    ],
    "totalVoters": 142302
  },
  {
    "id": "2911738",
    "name": "UNIAO DOS PALMARES",
    "state": "AL",
    "coordinates": [
      -9.157681,
      -36.034225
    ],
    "votes": [
      {
        "candidate": "ALMIR BELO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1562,
        "percentage": 3.52
      },
      {
        "candidate": "BRUNNO LOPES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 13127,
        "percentage": 29.57
      },
      {
        "candidate": "DE MOTOTAXI",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1554,
        "percentage": 3.5
      },
      {
        "candidate": "GUSTAVO PEDROZA",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1503,
        "percentage": 3.39
      },
      {
        "candidate": "JUNIOR MENEZES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 23163,
        "percentage": 52.17
      },
      {
        "candidate": "MILTON DO COMPLEMENTAR",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1892,
        "percentage": 4.26
      },
      {
        "candidate": "NENZINHA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1597,
        "percentage": 3.6
      }
    ],
    "totalVoters": 44398
  },
  {
    "id": "18537242",
    "name": "COARI",
    "state": "AM",
    "coordinates": [
      -4.088596,
      -63.143117
    ],
    "votes": [
      {
        "candidate": "ADAIL PINHEIRO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 20316,
        "percentage": 43.03
      },
      {
        "candidate": "DR. RAIONE CABRAL",
        "party": "MOBILIZA",
        "turno": 1,
        "totalVotes": 62,
        "percentage": 0.13
      },
      {
        "candidate": "DULCE MENEZES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1483,
        "percentage": 3.14
      },
      {
        "candidate": "ELINHO OLIVEIRA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1387,
        "percentage": 2.94
      },
      {
        "candidate": "HARBEN AVELAR",
        "party": "PMB",
        "turno": 1,
        "totalVotes": 18992,
        "percentage": 40.23
      },
      {
        "candidate": "JEANY PINHEIRO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1579,
        "percentage": 3.34
      },
      {
        "candidate": "JOSI LOPES DO PT",
        "party": "PT",
        "turno": 1,
        "totalVotes": 375,
        "percentage": 0.79
      },
      {
        "candidate": "JUNIOR DO GUARABIRA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 1495,
        "percentage": 3.17
      },
      {
        "candidate": "ZE CARLOS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1521,
        "percentage": 3.22
      }
    ],
    "totalVoters": 47210
  },
  {
    "id": "68891808",
    "name": "ITACOATIARA",
    "state": "AM",
    "coordinates": [
      -3.14779,
      -58.446104
    ],
    "votes": [
      {
        "candidate": "ARNOUD LUCAS",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 2708,
        "percentage": 4.34
      },
      {
        "candidate": "CABO MACIEL",
        "party": "PL",
        "turno": 1,
        "totalVotes": 18380,
        "percentage": 29.48
      },
      {
        "candidate": "DANIEL MENDONCA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1668,
        "percentage": 2.67
      },
      {
        "candidate": "DR MARCONDE RODRIGUES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2226,
        "percentage": 3.57
      },
      {
        "candidate": "JUNIOR GALVAO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1538,
        "percentage": 2.47
      },
      {
        "candidate": "MARIO ABRAHIM",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 31614,
        "percentage": 50.7
      },
      {
        "candidate": "NEY NOBRE",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1680,
        "percentage": 2.69
      },
      {
        "candidate": "NILDA ABRAHIM",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1544,
        "percentage": 2.48
      },
      {
        "candidate": "THIDY QUEIROZ",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 1500,
        "percentage": 2.41
      },
      {
        "candidate": "WEMERSON BARRIGA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1725,
        "percentage": 2.77
      }
    ],
    "totalVoters": 62357
  },
  {
    "id": "62819736",
    "name": "MANAUS",
    "state": "AM",
    "coordinates": [
      -3.131633,
      -59.982504
    ],
    "votes": [
      {
        "candidate": "AMOM MANDEL",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 210643,
        "percentage": 9.42
      },
      {
        "candidate": "CAPITAO ALBERTO NETO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 275063,
        "percentage": 12.31
      },
      {
        "candidate": "CAPITAO ALBERTO NETO",
        "party": "PL",
        "turno": 2,
        "totalVotes": 479297,
        "percentage": 21.44
      },
      {
        "candidate": "DAVID ALMEIDA",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 354596,
        "percentage": 15.86
      },
      {
        "candidate": "DAVID ALMEIDA",
        "party": "AVANTE",
        "turno": 2,
        "totalVotes": 576171,
        "percentage": 25.78
      },
      {
        "candidate": "KENNEDY MARQUES PROTETOR",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 14548,
        "percentage": 0.65
      },
      {
        "candidate": "MARCELO RAMOS",
        "party": "PT",
        "turno": 1,
        "totalVotes": 66528,
        "percentage": 2.98
      },
      {
        "candidate": "MARCO CASTILHOS",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 14621,
        "percentage": 0.65
      },
      {
        "candidate": "ROBERTO CIDADE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 187566,
        "percentage": 8.39
      },
      {
        "candidate": "SARGENTO SALAZAR",
        "party": "PL",
        "turno": 1,
        "totalVotes": 22594,
        "percentage": 1.01
      },
      {
        "candidate": "THAYSA LIPPY",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 16116,
        "percentage": 0.72
      },
      {
        "candidate": "ZE RICARDO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 17395,
        "percentage": 0.78
      }
    ],
    "totalVoters": 2235138
  },
  {
    "id": "43304080",
    "name": "PARINTINS",
    "state": "AM",
    "coordinates": [
      -2.634457,
      -56.731932
    ],
    "votes": [
      {
        "candidate": "AZAMOR PESSOA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1822,
        "percentage": 2.81
      },
      {
        "candidate": "BABA TUPINAMBA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1668,
        "percentage": 2.57
      },
      {
        "candidate": "BRENA DIANNA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 25250,
        "percentage": 38.9
      },
      {
        "candidate": "CABO LINHARES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 1848,
        "percentage": 2.85
      },
      {
        "candidate": "FERNANDO MENEZES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1511,
        "percentage": 2.33
      },
      {
        "candidate": "MATEUS ASSAYAG",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 28235,
        "percentage": 43.5
      },
      {
        "candidate": "MICHELE VALADARES",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 3112,
        "percentage": 4.79
      },
      {
        "candidate": "NALDO LIMA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 1460,
        "percentage": 2.25
      }
    ],
    "totalVoters": 64906
  },
  {
    "id": "85004540",
    "name": "LARANJAL DO JARI",
    "state": "AP",
    "coordinates": [
      -0.841999,
      -52.516
    ],
    "votes": [
      {
        "candidate": "EDIVAM DO MOCA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 749,
        "percentage": 3.07
      },
      {
        "candidate": "EZIO MORAES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 732,
        "percentage": 3.0
      },
      {
        "candidate": "IRMAO TADEU",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 735,
        "percentage": 3.01
      },
      {
        "candidate": "MARLON MOURA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 825,
        "percentage": 3.38
      },
      {
        "candidate": "TEDDY",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 14797,
        "percentage": 60.57
      },
      {
        "candidate": "TENENTE AURIVAM",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5838,
        "percentage": 23.9
      },
      {
        "candidate": "WALCIMAR FONSECA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 754,
        "percentage": 3.09
      }
    ],
    "totalVoters": 24430
  },
  {
    "id": "64453298",
    "name": "MACAPA",
    "state": "AP",
    "coordinates": [
      0.040153,
      -51.056959
    ],
    "votes": [
      {
        "candidate": "ALEXANDRE AZEVEDO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 4857,
        "percentage": 1.87
      },
      {
        "candidate": "ALINE 10",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 8897,
        "percentage": 3.42
      },
      {
        "candidate": "DANIEL THEODORO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 4542,
        "percentage": 1.75
      },
      {
        "candidate": "DR FURLAN",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 204291,
        "percentage": 78.51
      },
      {
        "candidate": "GILVAM BORGES",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 637,
        "percentage": 0.24
      },
      {
        "candidate": "MARCELO DIAS",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 4534,
        "percentage": 1.74
      },
      {
        "candidate": "PASTORA LEIA PELAES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4419,
        "percentage": 1.7
      },
      {
        "candidate": "PATRICIA FERRAZ",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 1835,
        "percentage": 0.71
      },
      {
        "candidate": "PAULO 50",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 23491,
        "percentage": 9.03
      },
      {
        "candidate": "PAULO NERY",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 4533,
        "percentage": 1.74
      }
    ],
    "totalVoters": 260201
  },
  {
    "id": "39581996",
    "name": "OIAPOQUE",
    "state": "AP",
    "coordinates": [
      3.843213,
      -51.83508
    ],
    "votes": [
      {
        "candidate": "BRENO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 8965,
        "percentage": 46.74
      },
      {
        "candidate": "BRUNO DO AREAL",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 542,
        "percentage": 2.83
      },
      {
        "candidate": "DELEGADO CHARLES",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 1110,
        "percentage": 5.79
      },
      {
        "candidate": "INACIO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4460,
        "percentage": 23.25
      },
      {
        "candidate": "MARIA ORLANDA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 1930,
        "percentage": 10.06
      },
      {
        "candidate": "PROFESSOR AILTON PALIKUR",
        "party": "PP",
        "turno": 1,
        "totalVotes": 486,
        "percentage": 2.53
      },
      {
        "candidate": "RAMON",
        "party": "PL",
        "turno": 1,
        "totalVotes": 525,
        "percentage": 2.74
      },
      {
        "candidate": "SALES DO ACOUGUE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 542,
        "percentage": 2.83
      },
      {
        "candidate": "UESLEI TELES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 620,
        "percentage": 3.23
      }
    ],
    "totalVoters": 19180
  },
  {
    "id": "89568302",
    "name": "SANTANA",
    "state": "AP",
    "coordinates": [
      -0.030707,
      -51.178967
    ],
    "votes": [
      {
        "candidate": "BALA ROCHA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 43711,
        "percentage": 56.9
      },
      {
        "candidate": "HELENA LIMA",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 1927,
        "percentage": 2.51
      },
      {
        "candidate": "ITHIARA MADUREIRA",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 2817,
        "percentage": 3.67
      },
      {
        "candidate": "JOSIVALDO RATO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2201,
        "percentage": 2.87
      },
      {
        "candidate": "NENEM DO FRANGO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 6469,
        "percentage": 8.42
      },
      {
        "candidate": "PROFESSOR ZE ROBERTO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 14091,
        "percentage": 18.34
      },
      {
        "candidate": "RARISON SANTIAGO",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 2653,
        "percentage": 3.45
      },
      {
        "candidate": "SOCORRO NOGUEIRA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 2945,
        "percentage": 3.83
      }
    ],
    "totalVoters": 76814
  },
  {
    "id": "69753006",
    "name": "FEIRA DE SANTANA",
    "state": "BA",
    "coordinates": [
      -12.257893,
      -38.959805
    ],
    "votes": [
      {
        "candidate": "CARLOS MEDEIROS",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 9717,
        "percentage": 2.67
      },
      {
        "candidate": "EDVALDO LIMA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 6430,
        "percentage": 1.76
      },
      {
        "candidate": "GERUSA SAMPAIO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5816,
        "percentage": 1.6
      },
      {
        "candidate": "JHONATAS MONTEIRO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 10980,
        "percentage": 3.01
      },
      {
        "candidate": "JOSE RONALDO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 165970,
        "percentage": 45.54
      },
      {
        "candidate": "LULINHA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5574,
        "percentage": 1.53
      },
      {
        "candidate": "MARCOS LIMA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5854,
        "percentage": 1.61
      },
      {
        "candidate": "ZE NETO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 154147,
        "percentage": 42.29
      }
    ],
    "totalVoters": 364488
  },
  {
    "id": "53453518",
    "name": "SALVADOR",
    "state": "BA",
    "coordinates": [
      -12.98225,
      -38.481277
    ],
    "votes": [
      {
        "candidate": "BRUNO REIS",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1045690,
        "percentage": 72.42
      },
      {
        "candidate": "CARLOS MUNIZ",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 24040,
        "percentage": 1.66
      },
      {
        "candidate": "ESLANE PAIXAO",
        "party": "UP",
        "turno": 1,
        "totalVotes": 5513,
        "percentage": 0.38
      },
      {
        "candidate": "GERALDO JUNIOR",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 137298,
        "percentage": 9.51
      },
      {
        "candidate": "GIOVANI DAMICO",
        "party": "PCB",
        "turno": 1,
        "totalVotes": 1364,
        "percentage": 0.09
      },
      {
        "candidate": "JORGE ARAUJO REPORTER",
        "party": "PP",
        "turno": 1,
        "totalVotes": 36065,
        "percentage": 2.5
      },
      {
        "candidate": "KLEBER ROSA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 138610,
        "percentage": 9.6
      },
      {
        "candidate": "LUIZ CARLOS",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 19358,
        "percentage": 1.34
      },
      {
        "candidate": "MAURICIO TRINDADE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 17665,
        "percentage": 1.22
      },
      {
        "candidate": "OMARZINHO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 18304,
        "percentage": 1.27
      }
    ],
    "totalVoters": 1443907
  },
  {
    "id": "7717207",
    "name": "FORTALEZA",
    "state": "CE",
    "coordinates": [
      -3.730451,
      -38.521799
    ],
    "votes": [
      {
        "candidate": "ANDRE FERNANDES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 562305,
        "percentage": 19.16
      },
      {
        "candidate": "ANDRE FERNANDES",
        "party": "PL",
        "turno": 2,
        "totalVotes": 705295,
        "percentage": 24.04
      },
      {
        "candidate": "BELLA CARMELO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 28138,
        "percentage": 0.96
      },
      {
        "candidate": "CAPITAO WAGNER",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 159426,
        "percentage": 5.43
      },
      {
        "candidate": "EDUARDO GIRAO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 14878,
        "percentage": 0.51
      },
      {
        "candidate": "EMANUEL ACRIZIO",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 16083,
        "percentage": 0.55
      },
      {
        "candidate": "EVANDRO LEITAO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 480174,
        "percentage": 16.37
      },
      {
        "candidate": "EVANDRO LEITAO",
        "party": "PT",
        "turno": 2,
        "totalVotes": 716133,
        "percentage": 24.41
      },
      {
        "candidate": "GABRIEL BIOLOGIA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 30682,
        "percentage": 1.05
      },
      {
        "candidate": "JOSE SARTO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 164402,
        "percentage": 5.6
      },
      {
        "candidate": "PRISCILA COSTA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 36226,
        "percentage": 1.23
      },
      {
        "candidate": "RONALDO MARTINS",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 20288,
        "percentage": 0.69
      }
    ],
    "totalVoters": 2934030
  },
  {
    "id": "15114977",
    "name": "IGUATU",
    "state": "CE",
    "coordinates": [
      -6.361934,
      -39.297223
    ],
    "votes": [
      {
        "candidate": "DIEGO FELIPE",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 1953,
        "percentage": 2.88
      },
      {
        "candidate": "DR ZILFRAN",
        "party": "AGIR",
        "turno": 1,
        "totalVotes": 2356,
        "percentage": 3.48
      },
      {
        "candidate": "ILO NETO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 27046,
        "percentage": 39.9
      },
      {
        "candidate": "JOAO TORRES",
        "party": "AGIR",
        "turno": 1,
        "totalVotes": 1766,
        "percentage": 2.61
      },
      {
        "candidate": "ROBERTO FILHO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 29069,
        "percentage": 42.88
      },
      {
        "candidate": "SA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2031,
        "percentage": 3.0
      },
      {
        "candidate": "SAVIO SOBREIRA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 1906,
        "percentage": 2.81
      },
      {
        "candidate": "SHEILA ALCANTARA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1660,
        "percentage": 2.45
      }
    ],
    "totalVoters": 67787
  },
  {
    "id": "8265386",
    "name": "JUAZEIRO DO NORTE",
    "state": "CE",
    "coordinates": [
      -7.215345,
      -39.315334
    ],
    "votes": [
      {
        "candidate": "CHAGAS MOURA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 4692,
        "percentage": 2.58
      },
      {
        "candidate": "FELIPE VASQUES",
        "party": "AGIR",
        "turno": 1,
        "totalVotes": 6670,
        "percentage": 3.67
      },
      {
        "candidate": "FERNANDO SANTANA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 70936,
        "percentage": 39.07
      },
      {
        "candidate": "GLEDSON BEZERRA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 83514,
        "percentage": 45.99
      },
      {
        "candidate": "JULLIAN DE CIELIO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3263,
        "percentage": 1.8
      },
      {
        "candidate": "LINO ALVES",
        "party": "PCO",
        "turno": 1,
        "totalVotes": 151,
        "percentage": 0.08
      },
      {
        "candidate": "LUKAO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 5926,
        "percentage": 3.26
      },
      {
        "candidate": "SUED CARVALHO",
        "party": "UP",
        "turno": 1,
        "totalVotes": 2303,
        "percentage": 1.27
      },
      {
        "candidate": "VINICIUS DUARTE",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 4276,
        "percentage": 2.35
      }
    ],
    "totalVoters": 181580
  },
  {
    "id": "58276457",
    "name": "SOBRAL",
    "state": "CE",
    "coordinates": [
      -3.687914,
      -40.345637
    ],
    "votes": [
      {
        "candidate": "CARLOS DO CALISTO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 4176,
        "percentage": 2.91
      },
      {
        "candidate": "CHICO JOIA JUNIOR",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3783,
        "percentage": 2.63
      },
      {
        "candidate": "IZOLDA CELA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 59135,
        "percentage": 41.15
      },
      {
        "candidate": "KARINE RIBEIRO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3577,
        "percentage": 2.49
      },
      {
        "candidate": "MARLON SOBREIRA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 4143,
        "percentage": 2.88
      },
      {
        "candidate": "OSCAR RODRIGUES",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 65138,
        "percentage": 45.33
      },
      {
        "candidate": "SOCORRINHA BRASILEIRO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3758,
        "percentage": 2.61
      }
    ],
    "totalVoters": 143710
  },
  {
    "id": "64003761",
    "name": "CACHOEIRO DE ITAPEMIRIM",
    "state": "ES",
    "coordinates": [
      -20.848084,
      -41.11129
    ],
    "votes": [
      {
        "candidate": "BRAS ZAGOTTO E BOM",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 1698,
        "percentage": 1.49
      },
      {
        "candidate": "CASTEGLIONE",
        "party": "PT",
        "turno": 1,
        "totalVotes": 3578,
        "percentage": 3.15
      },
      {
        "candidate": "CREONE DA FARMACIA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2224,
        "percentage": 1.96
      },
      {
        "candidate": "DIEGO LIBARDI",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 20030,
        "percentage": 17.63
      },
      {
        "candidate": "FERRACO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 44240,
        "percentage": 38.94
      },
      {
        "candidate": "LEO CABECA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2112,
        "percentage": 1.86
      },
      {
        "candidate": "LEO CAMARGO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 23861,
        "percentage": 21.0
      },
      {
        "candidate": "LORENA VASQUES",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 11643,
        "percentage": 10.25
      },
      {
        "candidate": "MARCELINHO FAVERO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1790,
        "percentage": 1.58
      },
      {
        "candidate": "VANDINHO DA PADARIA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2449,
        "percentage": 2.16
      }
    ],
    "totalVoters": 113625
  },
  {
    "id": "28212706",
    "name": "SERRA",
    "state": "ES",
    "coordinates": [
      -20.125296,
      -40.306448
    ],
    "votes": [
      {
        "candidate": "AUDIFAX BARCELOS",
        "party": "PP",
        "turno": 1,
        "totalVotes": 58643,
        "percentage": 11.67
      },
      {
        "candidate": "IGOR ELSON",
        "party": "PL",
        "turno": 1,
        "totalVotes": 18751,
        "percentage": 3.73
      },
      {
        "candidate": "PABLO MURIBECA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 61690,
        "percentage": 12.28
      },
      {
        "candidate": "PABLO MURIBECA",
        "party": "REPUBLICANOS",
        "turno": 2,
        "totalVotes": 90227,
        "percentage": 17.96
      },
      {
        "candidate": "PASTOR DINHO SOUZA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5616,
        "percentage": 1.12
      },
      {
        "candidate": "PAULINHO DO CHURRASQUINHO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4781,
        "percentage": 0.95
      },
      {
        "candidate": "PROFESSOR ROBERTO CARLOS",
        "party": "PT",
        "turno": 1,
        "totalVotes": 7513,
        "percentage": 1.5
      },
      {
        "candidate": "RAFAEL ESTRELA DO MAR",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 4409,
        "percentage": 0.88
      },
      {
        "candidate": "SAULINHO DA ACADEMIA ",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 8241,
        "percentage": 1.64
      },
      {
        "candidate": "TEILTON VALIM",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 7357,
        "percentage": 1.46
      },
      {
        "candidate": "WEVERSON MEIRELES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 97087,
        "percentage": 19.33
      },
      {
        "candidate": "WEVERSON MEIRELES",
        "party": "PDT",
        "turno": 2,
        "totalVotes": 138071,
        "percentage": 27.48
      }
    ],
    "totalVoters": 502386
  },
  {
    "id": "86747381",
    "name": "VILA VELHA",
    "state": "ES",
    "coordinates": [
      -20.329704,
      -40.292017
    ],
    "votes": [
      {
        "candidate": "ANADELSO PEREIRA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 4914,
        "percentage": 1.81
      },
      {
        "candidate": "ARNALDINHO BORGO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 193451,
        "percentage": 71.11
      },
      {
        "candidate": "CORONEL RAMALHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 42096,
        "percentage": 15.47
      },
      {
        "candidate": "DEVACIR RABELLO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5481,
        "percentage": 2.01
      },
      {
        "candidate": "DOUTOR HERCULES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 7275,
        "percentage": 2.67
      },
      {
        "candidate": "JOAO BATISTA BABA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 6342,
        "percentage": 2.33
      },
      {
        "candidate": "LEO PINDOBA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 4775,
        "percentage": 1.76
      },
      {
        "candidate": "MAURICIO GORZA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 557,
        "percentage": 0.2
      },
      {
        "candidate": "PROFESSOR NICOLAS TRANCHO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 1862,
        "percentage": 0.68
      },
      {
        "candidate": "ROGERIO CARDOSO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 5310,
        "percentage": 1.95
      }
    ],
    "totalVoters": 272063
  },
  {
    "id": "424148",
    "name": "ANAPOLIS",
    "state": "GO",
    "coordinates": [
      -16.333283,
      -48.952576
    ],
    "votes": [
      {
        "candidate": "ANDREIA REZENDE",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 3571,
        "percentage": 0.91
      },
      {
        "candidate": "ANTONIO GOMIDE",
        "party": "PT",
        "turno": 1,
        "totalVotes": 69370,
        "percentage": 17.58
      },
      {
        "candidate": "ANTONIO GOMIDE",
        "party": "PT",
        "turno": 2,
        "totalVotes": 75182,
        "percentage": 19.06
      },
      {
        "candidate": "CAPITA ELIZETE",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 3147,
        "percentage": 0.8
      },
      {
        "candidate": "DR. JOSE FERNANDES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 4222,
        "percentage": 1.07
      },
      {
        "candidate": "EERIZANIA FREITAS",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 21287,
        "percentage": 5.4
      },
      {
        "candidate": "HELIO DA APAE",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 4895,
        "percentage": 1.24
      },
      {
        "candidate": "JEAN CARLOS",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3001,
        "percentage": 0.76
      },
      {
        "candidate": "JOSE DE LIMA",
        "party": "PMB",
        "turno": 1,
        "totalVotes": 3083,
        "percentage": 0.78
      },
      {
        "candidate": "MARCIO CORREA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 97049,
        "percentage": 24.6
      },
      {
        "candidate": "MARCIO CORREA",
        "party": "PL",
        "turno": 2,
        "totalVotes": 106263,
        "percentage": 26.94
      },
      {
        "candidate": "PROFESSOR MARCOS CARVALHO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 3422,
        "percentage": 0.87
      }
    ],
    "totalVoters": 394492
  },
  {
    "id": "69525768",
    "name": "APARECIDA DE GOIANIA",
    "state": "GO",
    "coordinates": [
      -16.822677,
      -49.245255
    ],
    "votes": [
      {
        "candidate": "ANDRE FORTALEZA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3384,
        "percentage": 0.74
      },
      {
        "candidate": "GILSAO MEU POVO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 3841,
        "percentage": 0.84
      },
      {
        "candidate": "GLEISON FLAVIO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3533,
        "percentage": 0.78
      },
      {
        "candidate": "ISAAC MARTINS",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3573,
        "percentage": 0.79
      },
      {
        "candidate": "LEANDRO VILELA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 109793,
        "percentage": 24.15
      },
      {
        "candidate": "LEANDRO VILELA",
        "party": "MDB",
        "turno": 2,
        "totalVotes": 132230,
        "percentage": 29.08
      },
      {
        "candidate": "PROFESSOR ALCIDES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 98415,
        "percentage": 21.64
      },
      {
        "candidate": "PROFESSOR ALCIDES",
        "party": "PL",
        "turno": 2,
        "totalVotes": 75676,
        "percentage": 16.64
      },
      {
        "candidate": "TATA TEIXEIRA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3830,
        "percentage": 0.84
      },
      {
        "candidate": "WILLIAN PANDA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 20443,
        "percentage": 4.5
      }
    ],
    "totalVoters": 454718
  },
  {
    "id": "34021054",
    "name": "GOIANIA",
    "state": "GO",
    "coordinates": [
      -16.680882,
      -49.253269
    ],
    "votes": [
      {
        "candidate": "AAVA SANTIAGO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 10482,
        "percentage": 0.77
      },
      {
        "candidate": "ADRIANA ACCORSI",
        "party": "PT",
        "turno": 1,
        "totalVotes": 168145,
        "percentage": 12.34
      },
      {
        "candidate": "FRED RODRIGUES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 214253,
        "percentage": 15.73
      },
      {
        "candidate": "FRED RODRIGUES",
        "party": "PL",
        "turno": 2,
        "totalVotes": 283054,
        "percentage": 20.78
      },
      {
        "candidate": "GCM ROMARIO POLICARPO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 11496,
        "percentage": 0.84
      },
      {
        "candidate": "MABEL",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 190278,
        "percentage": 13.97
      },
      {
        "candidate": "MABEL",
        "party": "UNIO",
        "turno": 2,
        "totalVotes": 353518,
        "percentage": 25.95
      },
      {
        "candidate": "MAJOR VITOR HUGO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 15678,
        "percentage": 1.15
      },
      {
        "candidate": "MATHEUS RIBEIRO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 46875,
        "percentage": 3.44
      },
      {
        "candidate": "PROFESSOR EDWARD",
        "party": "PT",
        "turno": 1,
        "totalVotes": 13573,
        "percentage": 1.0
      },
      {
        "candidate": "SARGENTO NOVANDIR",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 9762,
        "percentage": 0.72
      },
      {
        "candidate": "VANDERLAN CARDOSO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 45186,
        "percentage": 3.32
      }
    ],
    "totalVoters": 1362300
  },
  {
    "id": "72198337",
    "name": "RIO VERDE",
    "state": "GO",
    "coordinates": [
      -17.792126,
      -50.919122
    ],
    "votes": [
      {
        "candidate": "ARMANDO FILHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2238,
        "percentage": 1.82
      },
      {
        "candidate": "DANIEL CUNHA DA CAMARA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 2025,
        "percentage": 1.65
      },
      {
        "candidate": "DR OSVALDO FONSECA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 10736,
        "percentage": 8.74
      },
      {
        "candidate": "GUSTAVO AMIGO DO POVO ",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2442,
        "percentage": 1.99
      },
      {
        "candidate": "IDELSON MENDES",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 2616,
        "percentage": 2.13
      },
      {
        "candidate": "KARLOS CABRAL",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3659,
        "percentage": 2.98
      },
      {
        "candidate": "LISSAUER VIEIRA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 24805,
        "percentage": 20.18
      },
      {
        "candidate": "MAGRAO DA RADIO",
        "party": "DC",
        "turno": 1,
        "totalVotes": 2922,
        "percentage": 2.38
      },
      {
        "candidate": "TULIO BARCELOS",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2238,
        "percentage": 1.82
      },
      {
        "candidate": "WELLINGTON CARRIJO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 69209,
        "percentage": 56.32
      }
    ],
    "totalVoters": 122890
  },
  {
    "id": "45816729",
    "name": "BACABAL",
    "state": "MA",
    "coordinates": [
      -4.231813,
      -44.781167
    ],
    "votes": [
      {
        "candidate": "JANSEN PENHA",
        "party": "MOBILIZA",
        "turno": 1,
        "totalVotes": 59,
        "percentage": 0.09
      },
      {
        "candidate": "JOAO ALBERTO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2591,
        "percentage": 3.89
      },
      {
        "candidate": "MARCOS MIRANDA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 23278,
        "percentage": 34.93
      },
      {
        "candidate": "PATRICIA TELES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2070,
        "percentage": 3.11
      },
      {
        "candidate": "PAULO BRANDAO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 2292,
        "percentage": 3.44
      },
      {
        "candidate": "PLINIO OLIVEIRA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 1781,
        "percentage": 2.67
      },
      {
        "candidate": "REGINALDO DO POSTO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1786,
        "percentage": 2.68
      },
      {
        "candidate": "ROBERTO COSTA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 30790,
        "percentage": 46.21
      },
      {
        "candidate": "SERAFIM",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1990,
        "percentage": 2.99
      }
    ],
    "totalVoters": 66637
  },
  {
    "id": "14303039",
    "name": "CAXIAS",
    "state": "MA",
    "coordinates": [
      -4.86542,
      -43.353664
    ],
    "votes": [
      {
        "candidate": "DANIEL BARROS FISCAL DO POVO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 1850,
        "percentage": 1.84
      },
      {
        "candidate": "EDMILSON SANCHES",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 531,
        "percentage": 0.53
      },
      {
        "candidate": "GENTIL NETO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 43352,
        "percentage": 43.15
      },
      {
        "candidate": "LYCIA WAQUIM",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2342,
        "percentage": 2.33
      },
      {
        "candidate": "MARIO ASSUNCAO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 3066,
        "percentage": 3.05
      },
      {
        "candidate": "PAULINHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 42787,
        "percentage": 42.59
      },
      {
        "candidate": "VINICIUS SABA DE ALENCAR",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1882,
        "percentage": 1.87
      },
      {
        "candidate": "WESLEY COUTINHO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1912,
        "percentage": 1.9
      },
      {
        "candidate": "XIMENES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 2750,
        "percentage": 2.74
      }
    ],
    "totalVoters": 100472
  },
  {
    "id": "79229523",
    "name": "IMPERATRIZ",
    "state": "MA",
    "coordinates": [
      -5.526928,
      -47.478115
    ],
    "votes": [
      {
        "candidate": "ADHEMAR FREITAS JR",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2718,
        "percentage": 0.86
      },
      {
        "candidate": "ALCEMIR COSTA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 2296,
        "percentage": 0.73
      },
      {
        "candidate": "FLAMARION AMARAL",
        "party": "PV",
        "turno": 1,
        "totalVotes": 2337,
        "percentage": 0.74
      },
      {
        "candidate": "JOSIVALDO JP",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 32689,
        "percentage": 10.38
      },
      {
        "candidate": "JUNIOR GAMA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 2325,
        "percentage": 0.74
      },
      {
        "candidate": "MARCO AURELIO",
        "party": "PC DO B",
        "turno": 1,
        "totalVotes": 9060,
        "percentage": 2.88
      },
      {
        "candidate": "MARIANA CARVALHO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 41172,
        "percentage": 13.07
      },
      {
        "candidate": "MARIANA CARVALHO",
        "party": "REPUBLICANOS",
        "turno": 2,
        "totalVotes": 66752,
        "percentage": 21.2
      },
      {
        "candidate": "NILSON TAKASHI",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 16073,
        "percentage": 5.1
      },
      {
        "candidate": "RILDO AMARAL",
        "party": "PP",
        "turno": 1,
        "totalVotes": 55149,
        "percentage": 17.51
      },
      {
        "candidate": "RILDO AMARAL",
        "party": "PP",
        "turno": 2,
        "totalVotes": 81942,
        "percentage": 26.02
      },
      {
        "candidate": "ROSANGELA CURADO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2384,
        "percentage": 0.76
      }
    ],
    "totalVoters": 314897
  },
  {
    "id": "40710357",
    "name": "BELO HORIZONTE",
    "state": "MG",
    "coordinates": [
      -19.922732,
      -43.945095
    ],
    "votes": [
      {
        "candidate": "BRUNO ENGLER",
        "party": "PL",
        "turno": 1,
        "totalVotes": 435853,
        "percentage": 16.98
      },
      {
        "candidate": "BRUNO ENGLER",
        "party": "PL",
        "turno": 2,
        "totalVotes": 577537,
        "percentage": 22.51
      },
      {
        "candidate": "DUDA SALABERT",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 97315,
        "percentage": 3.79
      },
      {
        "candidate": "FERNANDA PEREIRA ALTOE",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 18682,
        "percentage": 0.73
      },
      {
        "candidate": "FUAD NOMAN",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 336442,
        "percentage": 13.11
      },
      {
        "candidate": "FUAD NOMAN",
        "party": "PSD",
        "turno": 2,
        "totalVotes": 670574,
        "percentage": 26.13
      },
      {
        "candidate": "GABRIEL",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 133728,
        "percentage": 5.21
      },
      {
        "candidate": "IZA LOURENCA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 21485,
        "percentage": 0.84
      },
      {
        "candidate": "MARCELA TROPIA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 17878,
        "percentage": 0.7
      },
      {
        "candidate": "MAURO TRAMONTE",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 192991,
        "percentage": 7.52
      },
      {
        "candidate": "PABLO ALMEIDA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 39960,
        "percentage": 1.56
      },
      {
        "candidate": "PROFESSORA MARLI",
        "party": "PP",
        "turno": 1,
        "totalVotes": 23773,
        "percentage": 0.93
      }
    ],
    "totalVoters": 2566218
  },
  {
    "id": "13584139",
    "name": "JUIZ DE FORA",
    "state": "MG",
    "coordinates": [
      -21.760953,
      -43.350113
    ],
    "votes": [
      {
        "candidate": "CHARLLES EVANGELISTA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 76953,
        "percentage": 23.95
      },
      {
        "candidate": "CIDA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 5884,
        "percentage": 1.83
      },
      {
        "candidate": "IONE",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 27732,
        "percentage": 8.63
      },
      {
        "candidate": "ISAURO CALAIS",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 5832,
        "percentage": 1.82
      },
      {
        "candidate": "JULIO DELGADO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 17214,
        "percentage": 5.36
      },
      {
        "candidate": "MARGARIDA SALOMAO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 150848,
        "percentage": 46.95
      },
      {
        "candidate": "NEGRO BUSSOLA",
        "party": "PV",
        "turno": 1,
        "totalVotes": 6451,
        "percentage": 2.01
      },
      {
        "candidate": "ROBERTA LOPES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 7924,
        "percentage": 2.47
      },
      {
        "candidate": "SARGENTO MELLO CASAL",
        "party": "PL",
        "turno": 1,
        "totalVotes": 7590,
        "percentage": 2.36
      },
      {
        "candidate": "VITINHO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 14879,
        "percentage": 4.63
      }
    ],
    "totalVoters": 321307
  },
  {
    "id": "1336906",
    "name": "MONTES CLAROS",
    "state": "MG",
    "coordinates": [
      -16.749573,
      -43.868727
    ],
    "votes": [
      {
        "candidate": "CECI PROTETORA",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 3872,
        "percentage": 1.86
      },
      {
        "candidate": "DELIO PINHEIRO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 11206,
        "percentage": 5.39
      },
      {
        "candidate": "GRACA DA CASA DO MOTOR",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4065,
        "percentage": 1.95
      },
      {
        "candidate": "GUILHERME GUIMARAES",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 151240,
        "percentage": 72.73
      },
      {
        "candidate": "IGOR DIAS ",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 3767,
        "percentage": 1.81
      },
      {
        "candidate": "JUNIOR MARTINS",
        "party": "PP",
        "turno": 1,
        "totalVotes": 3743,
        "percentage": 1.8
      },
      {
        "candidate": "MAURICIO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 10021,
        "percentage": 4.82
      },
      {
        "candidate": "PAULO GUEDES",
        "party": "PT",
        "turno": 1,
        "totalVotes": 13706,
        "percentage": 6.59
      },
      {
        "candidate": "RODRIGO CADEIRANTE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 6320,
        "percentage": 3.04
      },
      {
        "candidate": "RUY MUNIZ",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 23353,
        "percentage": 11.23
      }
    ],
    "totalVoters": 207940
  },
  {
    "id": "72736045",
    "name": "UBERLANDIA",
    "state": "MG",
    "coordinates": [
      -18.918804,
      -48.276784
    ],
    "votes": [
      {
        "candidate": "ANDERSON LIMA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 5543,
        "percentage": 1.41
      },
      {
        "candidate": "CARRIJO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 6998,
        "percentage": 1.78
      },
      {
        "candidate": "DANDARA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 86755,
        "percentage": 22.12
      },
      {
        "candidate": "DAPHINY PRETA",
        "party": "PRTB",
        "turno": 1,
        "totalVotes": 931,
        "percentage": 0.24
      },
      {
        "candidate": "FABAO",
        "party": "PV",
        "turno": 1,
        "totalVotes": 14596,
        "percentage": 3.72
      },
      {
        "candidate": "GILBERTO CUNHA",
        "party": "PSTU",
        "turno": 1,
        "totalVotes": 858,
        "percentage": 0.22
      },
      {
        "candidate": "LEONIDIO BOUCAS",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 80470,
        "percentage": 20.51
      },
      {
        "candidate": "NEEMIAS MIQUEIAS",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 5997,
        "percentage": 1.53
      },
      {
        "candidate": "PAULO SERGIO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 184282,
        "percentage": 46.98
      },
      {
        "candidate": "SGT EDNALDO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5856,
        "percentage": 1.49
      }
    ],
    "totalVoters": 392286
  },
  {
    "id": "12422042",
    "name": "CAMPO GRANDE",
    "state": "MS",
    "coordinates": [
      -20.464017,
      -54.616295
    ],
    "votes": [
      {
        "candidate": "ADRIANE LOPES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 140913,
        "percentage": 15.48
      },
      {
        "candidate": "ADRIANE LOPES",
        "party": "PP",
        "turno": 2,
        "totalVotes": 222699,
        "percentage": 24.47
      },
      {
        "candidate": "BETO FIGUEIRO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 10885,
        "percentage": 1.2
      },
      {
        "candidate": "BETO PEREIRA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 115516,
        "percentage": 12.69
      },
      {
        "candidate": "CAMILA JARA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 41966,
        "percentage": 4.61
      },
      {
        "candidate": "CARLAO COMUNITARIO MESMO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 6912,
        "percentage": 0.76
      },
      {
        "candidate": "MARQUINHOS TRAD",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 8567,
        "percentage": 0.94
      },
      {
        "candidate": "RAFAEL TAVARES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 8128,
        "percentage": 0.89
      },
      {
        "candidate": "ROSE MODESTO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 131525,
        "percentage": 14.45
      },
      {
        "candidate": "ROSE MODESTO",
        "party": "UNIO",
        "turno": 2,
        "totalVotes": 210112,
        "percentage": 23.09
      },
      {
        "candidate": "SILVIO PITU",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 6409,
        "percentage": 0.7
      },
      {
        "candidate": "VETERINARIO FRANCISCO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 6371,
        "percentage": 0.7
      }
    ],
    "totalVoters": 910003
  },
  {
    "id": "35187637",
    "name": "CORUMBA",
    "state": "MS",
    "coordinates": [
      -19.000603,
      -57.650754
    ],
    "votes": [
      {
        "candidate": "ANDRE CAMPOS",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5944,
        "percentage": 10.43
      },
      {
        "candidate": "BIRA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 1143,
        "percentage": 2.01
      },
      {
        "candidate": "CHICAO VIANNA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 1405,
        "percentage": 2.47
      },
      {
        "candidate": "DELCIDIO AMARAL",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 5043,
        "percentage": 8.85
      },
      {
        "candidate": "DR. GABRIEL",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 28394,
        "percentage": 49.84
      },
      {
        "candidate": "HANNA SANTANA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1857,
        "percentage": 3.26
      },
      {
        "candidate": "JOVAN TEMELJKOVITCH",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1375,
        "percentage": 2.41
      },
      {
        "candidate": "LUIZ ANTONIO PARDAL",
        "party": "PP",
        "turno": 1,
        "totalVotes": 10659,
        "percentage": 18.71
      },
      {
        "candidate": "SAMYR QUALHADA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1145,
        "percentage": 2.01
      }
    ],
    "totalVoters": 56965
  },
  {
    "id": "59705632",
    "name": "DOURADOS",
    "state": "MS",
    "coordinates": [
      -22.220614,
      -54.812208
    ],
    "votes": [
      {
        "candidate": "ALAN GUEDES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 34027,
        "percentage": 25.7
      },
      {
        "candidate": "BELA BARROS",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 5476,
        "percentage": 4.14
      },
      {
        "candidate": "DALTON",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2265,
        "percentage": 1.71
      },
      {
        "candidate": "FRANKLIN",
        "party": "PT",
        "turno": 1,
        "totalVotes": 2452,
        "percentage": 1.85
      },
      {
        "candidate": "ISA MARCONDES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2992,
        "percentage": 2.26
      },
      {
        "candidate": "JANIO MIGUEL",
        "party": "PP",
        "turno": 1,
        "totalVotes": 2375,
        "percentage": 1.79
      },
      {
        "candidate": "MARCAL FILHO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 60418,
        "percentage": 45.63
      },
      {
        "candidate": "MARCELO MOURAO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2115,
        "percentage": 1.6
      },
      {
        "candidate": "RACIB HARB",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 2455,
        "percentage": 1.85
      },
      {
        "candidate": "TIAGO BOTELHO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 17845,
        "percentage": 13.48
      }
    ],
    "totalVoters": 132420
  },
  {
    "id": "84125874",
    "name": "CUIABA",
    "state": "MT",
    "coordinates": [
      -15.598669,
      -56.09913
    ],
    "votes": [
      {
        "candidate": "ABILIO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 126944,
        "percentage": 19.87
      },
      {
        "candidate": "ABILIO",
        "party": "PL",
        "turno": 2,
        "totalVotes": 171324,
        "percentage": 26.82
      },
      {
        "candidate": "EDUARDO BOTELHO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 88977,
        "percentage": 13.93
      },
      {
        "candidate": "KENNEDY",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 13805,
        "percentage": 2.16
      },
      {
        "candidate": "LUDIO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 90719,
        "percentage": 14.2
      },
      {
        "candidate": "LUDIO",
        "party": "PT",
        "turno": 2,
        "totalVotes": 147127,
        "percentage": 23.03
      }
    ],
    "totalVoters": 638896
  },
  {
    "id": "4311841",
    "name": "SINOP",
    "state": "MT",
    "coordinates": [
      -11.857701,
      -55.496782
    ],
    "votes": [
      {
        "candidate": "ENIO DA BRIGIDA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2121,
        "percentage": 2.51
      },
      {
        "candidate": "MIRTES DA TRANSTERRA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 23426,
        "percentage": 27.75
      },
      {
        "candidate": "MOISES DO JARDIM DO OURO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2647,
        "percentage": 3.14
      },
      {
        "candidate": "PROFA GRACIELE",
        "party": "PT",
        "turno": 1,
        "totalVotes": 1882,
        "percentage": 2.23
      },
      {
        "candidate": "REMIDIO KUNTZ",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1801,
        "percentage": 2.13
      },
      {
        "candidate": "ROBERTO DORNER",
        "party": "PL",
        "turno": 1,
        "totalVotes": 50737,
        "percentage": 60.1
      },
      {
        "candidate": "SANDRA DONATO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1808,
        "percentage": 2.14
      }
    ],
    "totalVoters": 84422
  },
  {
    "id": "95941272",
    "name": "VARZEA GRANDE",
    "state": "MT",
    "coordinates": [
      -15.645816,
      -56.132218
    ],
    "votes": [
      {
        "candidate": "CAIO CORDEIRO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3768,
        "percentage": 2.45
      },
      {
        "candidate": "CHARLES DA EDUCACAO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4859,
        "percentage": 3.16
      },
      {
        "candidate": "FLAVIA MORETTI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 68760,
        "percentage": 44.75
      },
      {
        "candidate": "GISA BARROS",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 3613,
        "percentage": 2.35
      },
      {
        "candidate": "JERO NETO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2850,
        "percentage": 1.85
      },
      {
        "candidate": "KALIL BARACAT",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 61005,
        "percentage": 39.7
      },
      {
        "candidate": "PROFESSORA LELIANE BORGES",
        "party": "PT",
        "turno": 1,
        "totalVotes": 5646,
        "percentage": 3.67
      },
      {
        "candidate": "ROSY PRADO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3168,
        "percentage": 2.06
      }
    ],
    "totalVoters": 153669
  },
  {
    "id": "79104175",
    "name": "CASTANHAL",
    "state": "PA",
    "coordinates": [
      -1.292703,
      -47.92239
    ],
    "votes": [
      {
        "candidate": "CLAUDIA SEABRA",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2195,
        "percentage": 1.76
      },
      {
        "candidate": "DAVI ROCHA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 8179,
        "percentage": 6.57
      },
      {
        "candidate": "DIEGO SALIBA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2895,
        "percentage": 2.33
      },
      {
        "candidate": "EVERTON MATOS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 2308,
        "percentage": 1.85
      },
      {
        "candidate": "HELIO LEITE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 49082,
        "percentage": 39.42
      },
      {
        "candidate": "PEDRO COELHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 14400,
        "percentage": 11.57
      },
      {
        "candidate": "SERGIO LEAL",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2170,
        "percentage": 1.74
      },
      {
        "candidate": "TITAN",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 40480,
        "percentage": 32.51
      },
      {
        "candidate": "VANIA NASCIMENTO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2800,
        "percentage": 2.25
      }
    ],
    "totalVoters": 124509
  },
  {
    "id": "44265171",
    "name": "MARABA",
    "state": "PA",
    "coordinates": [
      -5.346282,
      -49.10074
    ],
    "votes": [
      {
        "candidate": "AERTON GRANDE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3073,
        "percentage": 2.02
      },
      {
        "candidate": "CHAMONZINHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 46412,
        "percentage": 30.48
      },
      {
        "candidate": "DIRCEU",
        "party": "PT",
        "turno": 1,
        "totalVotes": 20299,
        "percentage": 13.33
      },
      {
        "candidate": "FERNANDO HENRRIQUE",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3957,
        "percentage": 2.6
      },
      {
        "candidate": "ILKER MORAES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 3051,
        "percentage": 2.0
      },
      {
        "candidate": "MAIANA STRINGARI",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2853,
        "percentage": 1.87
      },
      {
        "candidate": "RONALDO DA TRINTA E TRES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2937,
        "percentage": 1.93
      },
      {
        "candidate": "TONI CUNHA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 69666,
        "percentage": 45.76
      }
    ],
    "totalVoters": 152248
  },
  {
    "id": "91746098",
    "name": "CAMPINA GRANDE",
    "state": "PB",
    "coordinates": [
      -7.224674,
      -35.877129
    ],
    "votes": [
      {
        "candidate": "ALEXANDRE DO SINDICATO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4671,
        "percentage": 0.96
      },
      {
        "candidate": "ANDRE RIBEIRO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 5386,
        "percentage": 1.1
      },
      {
        "candidate": "ARTUR BOLINHA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 16282,
        "percentage": 3.34
      },
      {
        "candidate": "BRUNO CUNHA LIMA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 110807,
        "percentage": 22.7
      },
      {
        "candidate": "BRUNO CUNHA LIMA",
        "party": "UNIO",
        "turno": 2,
        "totalVotes": 136191,
        "percentage": 27.9
      },
      {
        "candidate": "CAROL GOMES",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5009,
        "percentage": 1.03
      },
      {
        "candidate": "DR JHONY",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 79471,
        "percentage": 16.28
      },
      {
        "candidate": "DR JHONY",
        "party": "PSB",
        "turno": 2,
        "totalVotes": 98852,
        "percentage": 20.25
      },
      {
        "candidate": "INACIO FALCAO",
        "party": "PC DO B",
        "turno": 1,
        "totalVotes": 16448,
        "percentage": 3.37
      },
      {
        "candidate": "IVONETE LUDGERIO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4964,
        "percentage": 1.02
      },
      {
        "candidate": "JO OLIVEIRA",
        "party": "PC DO B",
        "turno": 1,
        "totalVotes": 5178,
        "percentage": 1.06
      },
      {
        "candidate": "RAFAFA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4820,
        "percentage": 0.99
      }
    ],
    "totalVoters": 488079
  },
  {
    "id": "96712199",
    "name": "JOAO PESSOA",
    "state": "PB",
    "coordinates": [
      -7.121598,
      -34.882028
    ],
    "votes": [
      {
        "candidate": "CICERO LUCENA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 205122,
        "percentage": 23.68
      },
      {
        "candidate": "CICERO LUCENA",
        "party": "PP",
        "turno": 2,
        "totalVotes": 258727,
        "percentage": 29.87
      },
      {
        "candidate": "DINHO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 9397,
        "percentage": 1.09
      },
      {
        "candidate": "EDMILSON SOARES",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 6760,
        "percentage": 0.78
      },
      {
        "candidate": "GUGA PET ",
        "party": "PP",
        "turno": 1,
        "totalVotes": 10320,
        "percentage": 1.19
      },
      {
        "candidate": "JAILMA CARVALHO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 10127,
        "percentage": 1.17
      },
      {
        "candidate": "JOAO CORUJINHA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 7562,
        "percentage": 0.87
      },
      {
        "candidate": "LUCIANO CARTAXO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 49110,
        "percentage": 5.67
      },
      {
        "candidate": "MARCELO QUEIROGA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 90840,
        "percentage": 10.49
      },
      {
        "candidate": "MARCELO QUEIROGA",
        "party": "PL",
        "turno": 2,
        "totalVotes": 146129,
        "percentage": 16.87
      },
      {
        "candidate": "RUY CARNEIRO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 69712,
        "percentage": 8.05
      },
      {
        "candidate": "YURI EZEQUIEL",
        "party": "UP",
        "turno": 1,
        "totalVotes": 2237,
        "percentage": 0.26
      }
    ],
    "totalVoters": 866043
  },
  {
    "id": "1990293",
    "name": "PATOS",
    "state": "PB",
    "coordinates": [
      -7.025829,
      -37.276682
    ],
    "votes": [
      {
        "candidate": "ALINE LEITE",
        "party": "UP",
        "turno": 1,
        "totalVotes": 492,
        "percentage": 0.79
      },
      {
        "candidate": "BRENNA NOBREGA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2729,
        "percentage": 4.37
      },
      {
        "candidate": "EMANO ARAUJO",
        "party": "REDE",
        "turno": 1,
        "totalVotes": 2189,
        "percentage": 3.51
      },
      {
        "candidate": "ITALO GOMES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1944,
        "percentage": 3.11
      },
      {
        "candidate": "JONATAS KAIKY",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2238,
        "percentage": 3.58
      },
      {
        "candidate": "NABOR",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 37613,
        "percentage": 60.23
      },
      {
        "candidate": "PROFESSOR EDILEUDO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 1516,
        "percentage": 2.43
      },
      {
        "candidate": "RAMONILSON",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 11371,
        "percentage": 18.21
      },
      {
        "candidate": "TIDE EDUARDO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2360,
        "percentage": 3.78
      }
    ],
    "totalVoters": 62452
  },
  {
    "id": "38365086",
    "name": "SOUSA",
    "state": "PB",
    "coordinates": [
      -6.766203,
      -38.231961
    ],
    "votes": [
      {
        "candidate": "AMANDA SILVEIRA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2664,
        "percentage": 5.4
      },
      {
        "candidate": "BRUNA VERAS",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 1631,
        "percentage": 3.31
      },
      {
        "candidate": "DIOGENES FERREIRA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1417,
        "percentage": 2.87
      },
      {
        "candidate": "DR GILBERTAO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 16050,
        "percentage": 32.55
      },
      {
        "candidate": "HELDER CARVALHO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 23397,
        "percentage": 47.45
      },
      {
        "candidate": "NOVINHO DE CARLAO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1413,
        "percentage": 2.87
      },
      {
        "candidate": "RADAMES ESTRELA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2736,
        "percentage": 5.55
      }
    ],
    "totalVoters": 49308
  },
  {
    "id": "86565333",
    "name": "CARUARU",
    "state": "PE",
    "coordinates": [
      -8.28297,
      -35.972285
    ],
    "votes": [
      {
        "candidate": "ANDERSON CORREIA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 7310,
        "percentage": 3.34
      },
      {
        "candidate": "ARMANDINHO",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 4499,
        "percentage": 2.06
      },
      {
        "candidate": "BRUNO LAMBRETA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 3802,
        "percentage": 1.74
      },
      {
        "candidate": "EDMILSON DO SALGADO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 4309,
        "percentage": 1.97
      },
      {
        "candidate": "FERNANDO RODOLFO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 17326,
        "percentage": 7.92
      },
      {
        "candidate": "GALEGO DE LAJES",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 4435,
        "percentage": 2.03
      },
      {
        "candidate": "MICHELLE SANTOS",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 3443,
        "percentage": 1.57
      },
      {
        "candidate": "RICARDO LIBERATO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 5058,
        "percentage": 2.31
      },
      {
        "candidate": "RODRIGO PINHEIRO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 102198,
        "percentage": 46.74
      },
      {
        "candidate": "ZE QUEIROZ",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 66253,
        "percentage": 30.3
      }
    ],
    "totalVoters": 218633
  },
  {
    "id": "55564047",
    "name": "OLINDA",
    "state": "PE",
    "coordinates": [
      -7.99864,
      -34.845955
    ],
    "votes": [
      {
        "candidate": "ANTONIO CAMPOS",
        "party": "PRTB",
        "turno": 1,
        "totalVotes": 3124,
        "percentage": 0.69
      },
      {
        "candidate": "EUGENIA LIMA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 7110,
        "percentage": 1.56
      },
      {
        "candidate": "FELIPE NASCIMENTO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5783,
        "percentage": 1.27
      },
      {
        "candidate": "IZABEL URQUIZA DE OLINDA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 51526,
        "percentage": 11.3
      },
      {
        "candidate": "MARCIO BOTELHO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 9989,
        "percentage": 2.19
      },
      {
        "candidate": "MIRELLA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 62289,
        "percentage": 13.67
      },
      {
        "candidate": "MIRELLA",
        "party": "PSD",
        "turno": 2,
        "totalVotes": 111613,
        "percentage": 24.49
      },
      {
        "candidate": "MIZAEL PRESTANISTA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5898,
        "percentage": 1.29
      },
      {
        "candidate": "PROFESSOR MARCELO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5105,
        "percentage": 1.12
      },
      {
        "candidate": "SAULO HOLANDA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 7331,
        "percentage": 1.61
      },
      {
        "candidate": "VINICIUS CASTELLO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 80422,
        "percentage": 17.64
      },
      {
        "candidate": "VINICIUS CASTELLO",
        "party": "PT",
        "turno": 2,
        "totalVotes": 105616,
        "percentage": 23.17
      }
    ],
    "totalVoters": 455806
  },
  {
    "id": "84603029",
    "name": "PETROLINA",
    "state": "PE",
    "coordinates": [
      -9.381733,
      -40.496887
    ],
    "votes": [
      {
        "candidate": "AERO SIM",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4122,
        "percentage": 2.01
      },
      {
        "candidate": "DR MARCOS",
        "party": "AGIR",
        "turno": 1,
        "totalVotes": 606,
        "percentage": 0.3
      },
      {
        "candidate": "DR. JULIO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 52224,
        "percentage": 25.51
      },
      {
        "candidate": "GILBERTO MELO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4539,
        "percentage": 2.22
      },
      {
        "candidate": "LARA CAVALCANTI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 10757,
        "percentage": 5.26
      },
      {
        "candidate": "MANOEL DA ACOSAP",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5380,
        "percentage": 2.63
      },
      {
        "candidate": "ODACY AMORIM",
        "party": "PT",
        "turno": 1,
        "totalVotes": 10373,
        "percentage": 5.07
      },
      {
        "candidate": "SIMAO DURANDO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 107806,
        "percentage": 52.67
      },
      {
        "candidate": "WANDERLEY ALVES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4634,
        "percentage": 2.26
      },
      {
        "candidate": "ZENILDO DO ALTO DO COCAR",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 4246,
        "percentage": 2.07
      }
    ],
    "totalVoters": 204687
  },
  {
    "id": "42787868",
    "name": "RECIFE",
    "state": "PE",
    "coordinates": [
      -8.058493,
      -34.884819
    ],
    "votes": [
      {
        "candidate": "ADERALDO PINTO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 15793,
        "percentage": 1.56
      },
      {
        "candidate": "ANDREZA ROMERO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 15785,
        "percentage": 1.56
      },
      {
        "candidate": "DANI PORTELA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 35110,
        "percentage": 3.48
      },
      {
        "candidate": "DANIEL COELHO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 29788,
        "percentage": 2.95
      },
      {
        "candidate": "GILSON MACHADO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 129138,
        "percentage": 12.78
      },
      {
        "candidate": "GILSON MACHADO FILHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 16095,
        "percentage": 1.59
      },
      {
        "candidate": "JOAO CAMPOS",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 725721,
        "percentage": 71.84
      },
      {
        "candidate": "NATALIA DE MENUDO",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 15198,
        "percentage": 1.5
      },
      {
        "candidate": "ROMERINHO JATOBA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 20264,
        "percentage": 2.01
      },
      {
        "candidate": "TECIO TELES",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 7342,
        "percentage": 0.73
      }
    ],
    "totalVoters": 1010234
  },
  {
    "id": "8578463",
    "name": "FLORIANO",
    "state": "PI",
    "coordinates": [
      -6.767574,
      -43.022261
    ],
    "votes": [
      {
        "candidate": "ANTONIO REIS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 19200,
        "percentage": 45.43
      },
      {
        "candidate": "BILU DO POVO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 644,
        "percentage": 1.52
      },
      {
        "candidate": "CARLOS EDUARDO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 1226,
        "percentage": 2.9
      },
      {
        "candidate": "DR MARCUS VINICIUS",
        "party": "PT",
        "turno": 1,
        "totalVotes": 15269,
        "percentage": 36.13
      },
      {
        "candidate": "FELIPE VIEIRA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1957,
        "percentage": 4.63
      },
      {
        "candidate": "JAMES RODRIGUES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1296,
        "percentage": 3.07
      },
      {
        "candidate": "JOAO NETO GOMES",
        "party": "PT",
        "turno": 1,
        "totalVotes": 1348,
        "percentage": 3.19
      },
      {
        "candidate": "JOILSON RODRIGUES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1320,
        "percentage": 3.12
      }
    ],
    "totalVoters": 42260
  },
  {
    "id": "89785296",
    "name": "PICOS",
    "state": "PI",
    "coordinates": [
      -7.082354,
      -41.468505
    ],
    "votes": [
      {
        "candidate": "CACIQUE",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 677,
        "percentage": 1.23
      },
      {
        "candidate": "DR PABLO SANTOS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 24137,
        "percentage": 43.85
      },
      {
        "candidate": "EDILSON CARVALHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2100,
        "percentage": 3.82
      },
      {
        "candidate": "GIL PARAIBANO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 20041,
        "percentage": 36.41
      },
      {
        "candidate": "IRMAO ZE LUIS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1985,
        "percentage": 3.61
      },
      {
        "candidate": "PEDRO PIO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 1658,
        "percentage": 3.01
      },
      {
        "candidate": "RINALDINHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 2192,
        "percentage": 3.98
      },
      {
        "candidate": "WELLINGTON DANTAS",
        "party": "PT",
        "turno": 1,
        "totalVotes": 2254,
        "percentage": 4.09
      }
    ],
    "totalVoters": 55044
  },
  {
    "id": "42850369",
    "name": "TERESINA",
    "state": "PI",
    "coordinates": [
      -5.087461,
      -42.804957
    ],
    "votes": [
      {
        "candidate": "BRUNO VILARINHO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 7992,
        "percentage": 1.6
      },
      {
        "candidate": "DANIEL CARVALHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 7894,
        "percentage": 1.59
      },
      {
        "candidate": "DR PESSOA",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 10131,
        "percentage": 2.03
      },
      {
        "candidate": "EDUARDO DRAGA ALANA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 9233,
        "percentage": 1.85
      },
      {
        "candidate": "ENZO SAMUEL",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 7944,
        "percentage": 1.6
      },
      {
        "candidate": "FABIO NOVO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 198794,
        "percentage": 39.92
      },
      {
        "candidate": "FRANCINALDO LEAO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 2350,
        "percentage": 0.47
      },
      {
        "candidate": "JUCA ALVES",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 7600,
        "percentage": 1.53
      },
      {
        "candidate": "PROFESSOR TONNY",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 6169,
        "percentage": 1.24
      },
      {
        "candidate": "SILVIO MENDES",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 239848,
        "percentage": 48.17
      }
    ],
    "totalVoters": 497955
  },
  {
    "id": "937736",
    "name": "CURITIBA",
    "state": "PR",
    "coordinates": [
      -25.494438,
      -49.284271
    ],
    "votes": [
      {
        "candidate": "CRISTINA GRAEML",
        "party": "PMB",
        "turno": 1,
        "totalVotes": 291523,
        "percentage": 15.44
      },
      {
        "candidate": "CRISTINA GRAEML",
        "party": "PMB",
        "turno": 2,
        "totalVotes": 390254,
        "percentage": 20.67
      },
      {
        "candidate": "DA COSTA DO PERDEU PIA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 15014,
        "percentage": 0.8
      },
      {
        "candidate": "DELEGADA TATHIANA ",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 12515,
        "percentage": 0.66
      },
      {
        "candidate": "EDUARDO PIMENTEL",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 313347,
        "percentage": 16.6
      },
      {
        "candidate": "EDUARDO PIMENTEL",
        "party": "PSD",
        "turno": 2,
        "totalVotes": 531029,
        "percentage": 28.13
      },
      {
        "candidate": "GUILHERME KILTER",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 16664,
        "percentage": 0.88
      },
      {
        "candidate": "JASSON GOULART",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 21684,
        "percentage": 1.15
      },
      {
        "candidate": "JOAO BETTEGA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 12346,
        "percentage": 0.65
      },
      {
        "candidate": "LUCIANO DUCCI",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 181770,
        "percentage": 9.63
      },
      {
        "candidate": "LUIZAO GOULART",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 41271,
        "percentage": 2.19
      },
      {
        "candidate": "NEY LEPREVOST",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 60675,
        "percentage": 3.21
      }
    ],
    "totalVoters": 1888092
  },
  {
    "id": "76926582",
    "name": "LONDRINA",
    "state": "PR",
    "coordinates": [
      -23.311288,
      -51.159502
    ],
    "votes": [
      {
        "candidate": "BARBOSA NETO",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 20616,
        "percentage": 3.9
      },
      {
        "candidate": "CHAVAO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 5655,
        "percentage": 1.07
      },
      {
        "candidate": "DEIVID WISLEY",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 16212,
        "percentage": 3.07
      },
      {
        "candidate": "DIEGO GARCIA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 22751,
        "percentage": 4.31
      },
      {
        "candidate": "JESSICAO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 15057,
        "percentage": 2.85
      },
      {
        "candidate": "MICHELE THOMAZINHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 6984,
        "percentage": 1.32
      },
      {
        "candidate": "PROFESSORA FLAVIA CABRAL",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5751,
        "percentage": 1.09
      },
      {
        "candidate": "PROFESSORA MARIA TEREZA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 62590,
        "percentage": 11.85
      },
      {
        "candidate": "PROFESSORA MARIA TEREZA",
        "party": "PP",
        "turno": 2,
        "totalVotes": 111464,
        "percentage": 21.11
      },
      {
        "candidate": "TERCILIO TURINI",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 24894,
        "percentage": 4.71
      },
      {
        "candidate": "TIAGO AMARAL",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 113032,
        "percentage": 21.4
      },
      {
        "candidate": "TIAGO AMARAL",
        "party": "PSD",
        "turno": 2,
        "totalVotes": 143745,
        "percentage": 27.22
      }
    ],
    "totalVoters": 528135
  },
  {
    "id": "46650844",
    "name": "MARINGA",
    "state": "PR",
    "coordinates": [
      -23.425269,
      -51.938208
    ],
    "votes": [
      {
        "candidate": "BIAZON",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3407,
        "percentage": 1.51
      },
      {
        "candidate": "CRIS LAUER",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 7531,
        "percentage": 3.33
      },
      {
        "candidate": "DELEGADO LUIZ ALVES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5488,
        "percentage": 2.43
      },
      {
        "candidate": "EDSON SCABORA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 44004,
        "percentage": 19.44
      },
      {
        "candidate": "EVANDRO OLIVEIRA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 7421,
        "percentage": 3.28
      },
      {
        "candidate": "FLAVIO MANTOVANI",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5063,
        "percentage": 2.24
      },
      {
        "candidate": "HUMBERTO HENRIQUE",
        "party": "PT",
        "turno": 1,
        "totalVotes": 17321,
        "percentage": 7.65
      },
      {
        "candidate": "MARIO VERRI",
        "party": "PT",
        "turno": 1,
        "totalVotes": 3766,
        "percentage": 1.66
      },
      {
        "candidate": "PASTOR JOSE",
        "party": "MOBILIZA",
        "turno": 1,
        "totalVotes": 480,
        "percentage": 0.21
      },
      {
        "candidate": "SILVIO BARROS",
        "party": "PP",
        "turno": 1,
        "totalVotes": 131819,
        "percentage": 58.25
      }
    ],
    "totalVoters": 226300
  },
  {
    "id": "14364285",
    "name": "CAMPOS DOS GOYTACAZES",
    "state": "RJ",
    "coordinates": [
      -21.7546,
      -41.3242
    ],
    "votes": [
      {
        "candidate": "BRUNO PEZAO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 4880,
        "percentage": 1.61
      },
      {
        "candidate": "DELEGADA MADELEINE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 67354,
        "percentage": 22.17
      },
      {
        "candidate": "DR BUCHAUL",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 1801,
        "percentage": 0.59
      },
      {
        "candidate": "KASSIANO TAVARES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5790,
        "percentage": 1.91
      },
      {
        "candidate": "MARQUINHO BACELLAR",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5345,
        "percentage": 1.76
      },
      {
        "candidate": "PROFESSOR JEFFERSON",
        "party": "PT",
        "turno": 1,
        "totalVotes": 13222,
        "percentage": 4.35
      },
      {
        "candidate": "PROFESSOR WAINER",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5148,
        "percentage": 1.69
      },
      {
        "candidate": "THAMIRES RANGEL ",
        "party": "PMB",
        "turno": 1,
        "totalVotes": 5483,
        "percentage": 1.81
      },
      {
        "candidate": "THUIN",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 2490,
        "percentage": 0.82
      },
      {
        "candidate": "WLADIMIR GAROTINHO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 192232,
        "percentage": 63.29
      }
    ],
    "totalVoters": 303745
  },
  {
    "id": "60619446",
    "name": "DUQUE DE CAXIAS",
    "state": "RJ",
    "coordinates": [
      -22.789623,
      -43.309929
    ],
    "votes": [
      {
        "candidate": "CELSO DO ALBA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 56352,
        "percentage": 10.84
      },
      {
        "candidate": "CLAUDIO THOMAZ",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 11010,
        "percentage": 2.12
      },
      {
        "candidate": "JUNIOR REIS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 11180,
        "percentage": 2.15
      },
      {
        "candidate": "NETINHO REIS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 243850,
        "percentage": 46.93
      },
      {
        "candidate": "SANDRO LELIS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 12094,
        "percentage": 2.33
      },
      {
        "candidate": "SERGINHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 24734,
        "percentage": 4.76
      },
      {
        "candidate": "VALDECY NUNES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 9703,
        "percentage": 1.87
      },
      {
        "candidate": "WESLEY TEIXEIRA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 23329,
        "percentage": 4.49
      },
      {
        "candidate": "ZITO",
        "party": "PV",
        "turno": 1,
        "totalVotes": 127399,
        "percentage": 24.52
      }
    ],
    "totalVoters": 519651
  },
  {
    "id": "94379794",
    "name": "RIO DE JANEIRO",
    "state": "RJ",
    "coordinates": [
      -22.911014,
      -43.209373
    ],
    "votes": [
      {
        "candidate": "ALEXANDRE RAMAGEM",
        "party": "PL",
        "turno": 1,
        "totalVotes": 948631,
        "percentage": 28.4
      },
      {
        "candidate": "CARLO CAIADO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 47671,
        "percentage": 1.43
      },
      {
        "candidate": "CARLOS BOLSONARO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 130480,
        "percentage": 3.91
      },
      {
        "candidate": "EDUARDO PAES",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1861856,
        "percentage": 55.73
      },
      {
        "candidate": "MARCELO QUEIROZ",
        "party": "PP",
        "turno": 1,
        "totalVotes": 74996,
        "percentage": 2.24
      },
      {
        "candidate": "MARCIO RIBEIRO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 56770,
        "percentage": 1.7
      },
      {
        "candidate": "RAFAEL ALOISIO FREITAS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 40892,
        "percentage": 1.22
      },
      {
        "candidate": "RODRIGO AMORIM",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 34117,
        "percentage": 1.02
      },
      {
        "candidate": "TAINA DE PAULA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 49986,
        "percentage": 1.5
      },
      {
        "candidate": "TARCISIO MOTTA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 129344,
        "percentage": 3.87
      }
    ],
    "totalVoters": 3340626
  },
  {
    "id": "48175686",
    "name": "NATAL",
    "state": "RN",
    "coordinates": [
      -5.805398,
      -35.20809
    ],
    "votes": [
      {
        "candidate": "CARLOS EDUARDO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 93013,
        "percentage": 11.18
      },
      {
        "candidate": "DANIEL VALENCA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 8249,
        "percentage": 0.99
      },
      {
        "candidate": "DANIELL RENDALL",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 7417,
        "percentage": 0.89
      },
      {
        "candidate": "ERIKO JACOME",
        "party": "PP",
        "turno": 1,
        "totalVotes": 8819,
        "percentage": 1.06
      },
      {
        "candidate": "IRAPOA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 7760,
        "percentage": 0.93
      },
      {
        "candidate": "NANDO POETA",
        "party": "PSTU",
        "turno": 1,
        "totalVotes": 651,
        "percentage": 0.08
      },
      {
        "candidate": "NATALIA BONAVIDES",
        "party": "PT",
        "turno": 1,
        "totalVotes": 110483,
        "percentage": 13.28
      },
      {
        "candidate": "NATALIA BONAVIDES",
        "party": "PT",
        "turno": 2,
        "totalVotes": 179714,
        "percentage": 21.59
      },
      {
        "candidate": "PAULINHO FREIRE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 171146,
        "percentage": 20.56
      },
      {
        "candidate": "PAULINHO FREIRE",
        "party": "UNIO",
        "turno": 2,
        "totalVotes": 222661,
        "percentage": 26.75
      },
      {
        "candidate": "RAFAEL MOTTA",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 12532,
        "percentage": 1.51
      },
      {
        "candidate": "ROBSON CARVALHO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 9785,
        "percentage": 1.18
      }
    ],
    "totalVoters": 832230
  },
  {
    "id": "33857832",
    "name": "PARNAMIRIM",
    "state": "RN",
    "coordinates": [
      -5.915333,
      -35.267991
    ],
    "votes": [
      {
        "candidate": "GABRIEL CESAR",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2202,
        "percentage": 2.02
      },
      {
        "candidate": "LEO LIMA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 2162,
        "percentage": 1.99
      },
      {
        "candidate": "MARCIANO JUNIOR",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 4593,
        "percentage": 4.22
      },
      {
        "candidate": "MICHAEL BORGES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 2365,
        "percentage": 2.17
      },
      {
        "candidate": "PROFESSORA NILDA",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 47882,
        "percentage": 43.98
      },
      {
        "candidate": "RAFAELA DE NILDA",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 2305,
        "percentage": 2.12
      },
      {
        "candidate": "SALATIEL",
        "party": "PL",
        "turno": 1,
        "totalVotes": 45157,
        "percentage": 41.48
      },
      {
        "candidate": "WOLNEY FRANCA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2204,
        "percentage": 2.02
      }
    ],
    "totalVoters": 108870
  },
  {
    "id": "71470976",
    "name": "ARIQUEMES",
    "state": "RO",
    "coordinates": [
      -9.907652,
      -63.033069
    ],
    "votes": [
      {
        "candidate": "AGNA SOUZA",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1485,
        "percentage": 2.57
      },
      {
        "candidate": "CARLA REDANO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 23816,
        "percentage": 41.2
      },
      {
        "candidate": "FILIPE ROZIQUE DA FAAR",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1784,
        "percentage": 3.09
      },
      {
        "candidate": "JOAO MENDES",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 1975,
        "percentage": 3.42
      },
      {
        "candidate": "MARLEI MEZZOMO",
        "party": "PP",
        "turno": 1,
        "totalVotes": 23734,
        "percentage": 41.06
      },
      {
        "candidate": "RAFAELA DO BATISTA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 1987,
        "percentage": 3.44
      },
      {
        "candidate": "RENATO PADEIRO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1430,
        "percentage": 2.47
      },
      {
        "candidate": "TIAGO VIOLA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 1597,
        "percentage": 2.76
      }
    ],
    "totalVoters": 57808
  },
  {
    "id": "54990625",
    "name": "CACOAL",
    "state": "RO",
    "coordinates": [
      -11.4333,
      -61.44205
    ],
    "votes": [
      {
        "candidate": "ADAILTON FURIA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 40270,
        "percentage": 72.18
      },
      {
        "candidate": "ALAEZIO DO TEIXEIRAO",
        "party": "DC",
        "turno": 1,
        "totalVotes": 1415,
        "percentage": 2.54
      },
      {
        "candidate": "ALMIR SURUI",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1929,
        "percentage": 3.46
      },
      {
        "candidate": "CELSO POPO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 6225,
        "percentage": 11.16
      },
      {
        "candidate": "DRA AMALIA MILANI",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1146,
        "percentage": 2.05
      },
      {
        "candidate": "EDIMAR KAPICHE",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1800,
        "percentage": 3.23
      },
      {
        "candidate": "GIMENEZ FRITZ",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1466,
        "percentage": 2.63
      },
      {
        "candidate": "MARILANDE ALVES",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1539,
        "percentage": 2.76
      }
    ],
    "totalVoters": 55790
  },
  {
    "id": "26163252",
    "name": "JI-PARANA",
    "state": "RO",
    "coordinates": [
      -10.877815,
      -61.927785
    ],
    "votes": [
      {
        "candidate": "AFFONSO CANDIDO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 43371,
        "percentage": 57.3
      },
      {
        "candidate": "DOUTORA ROSANA VETERINARIA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 2111,
        "percentage": 2.79
      },
      {
        "candidate": "DR FELBEK",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 794,
        "percentage": 1.05
      },
      {
        "candidate": "ISAU FONSECA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 23321,
        "percentage": 30.81
      },
      {
        "candidate": "JOZIEL DE BRITO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1715,
        "percentage": 2.27
      },
      {
        "candidate": "NEGAO FILHO DO ISAU",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1572,
        "percentage": 2.08
      },
      {
        "candidate": "PROCOPIO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 1412,
        "percentage": 1.87
      },
      {
        "candidate": "SCOPONY",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1400,
        "percentage": 1.85
      }
    ],
    "totalVoters": 75696
  },
  {
    "id": "19056723",
    "name": "PORTO VELHO",
    "state": "RO",
    "coordinates": [
      -8.749453,
      -63.873544
    ],
    "votes": [
      {
        "candidate": "CELIO LOPES",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 29358,
        "percentage": 5.84
      },
      {
        "candidate": "DR BENEDITO ALVES",
        "party": "SOLIDARIEDADE",
        "turno": 1,
        "totalVotes": 12972,
        "percentage": 2.58
      },
      {
        "candidate": "DR GILBER",
        "party": "PL",
        "turno": 1,
        "totalVotes": 3667,
        "percentage": 0.73
      },
      {
        "candidate": "DR JUNIOR QUEIROZ",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 3954,
        "percentage": 0.79
      },
      {
        "candidate": "ELLIS REGINA DO SINDEPROF",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 4034,
        "percentage": 0.8
      },
      {
        "candidate": "FERNANDO SILVA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 3634,
        "percentage": 0.72
      },
      {
        "candidate": "JUIZA EUMA TOURINHO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 24481,
        "percentage": 4.87
      },
      {
        "candidate": "LEO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 64125,
        "percentage": 12.75
      },
      {
        "candidate": "LEO",
        "party": "PODE",
        "turno": 2,
        "totalVotes": 135118,
        "percentage": 26.87
      },
      {
        "candidate": "MARCIO PACELE",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 4692,
        "percentage": 0.93
      },
      {
        "candidate": "MARIANA CARVALHO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 111329,
        "percentage": 22.14
      },
      {
        "candidate": "MARIANA CARVALHO",
        "party": "UNIO",
        "turno": 2,
        "totalVotes": 105406,
        "percentage": 20.97
      }
    ],
    "totalVoters": 502770
  },
  {
    "id": "33001121",
    "name": "ALTO ALEGRE",
    "state": "RR",
    "coordinates": [
      2.990093,
      -61.308965
    ],
    "votes": [
      {
        "candidate": "ANDRESA SILVEIRA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 660,
        "percentage": 4.54
      },
      {
        "candidate": "AUGUSTINHO PEDROSO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 557,
        "percentage": 3.84
      },
      {
        "candidate": "FABIO COSTA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 751,
        "percentage": 5.17
      },
      {
        "candidate": "OTTACI",
        "party": "PP",
        "turno": 1,
        "totalVotes": 4114,
        "percentage": 28.33
      },
      {
        "candidate": "SANDRIELY CUNHA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 706,
        "percentage": 4.86
      },
      {
        "candidate": "VALDENIR MAGRAO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 751,
        "percentage": 5.17
      },
      {
        "candidate": "WAGNER NUNES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 6983,
        "percentage": 48.09
      }
    ],
    "totalVoters": 14522
  },
  {
    "id": "18105626",
    "name": "BOA VISTA",
    "state": "RR",
    "coordinates": [
      2.820848,
      -60.671958
    ],
    "votes": [
      {
        "candidate": "ARTHUR HENRIQUE",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 133180,
        "percentage": 68.46
      },
      {
        "candidate": "CATARINA GUERRA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 40410,
        "percentage": 20.77
      },
      {
        "candidate": "GENILSON COSTA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 3744,
        "percentage": 1.92
      },
      {
        "candidate": "ITALO OTAVIO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 4024,
        "percentage": 2.07
      },
      {
        "candidate": "JULIO CEZAR MEDEIROS",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 3695,
        "percentage": 1.9
      },
      {
        "candidate": "MANOEL NEVES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 3372,
        "percentage": 1.73
      },
      {
        "candidate": "MAURO NAKASHIMA",
        "party": "PV",
        "turno": 1,
        "totalVotes": 2066,
        "percentage": 1.06
      },
      {
        "candidate": "ROBERTO FRANCO",
        "party": "DC",
        "turno": 1,
        "totalVotes": 4043,
        "percentage": 2.08
      }
    ],
    "totalVoters": 194534
  },
  {
    "id": "5183602",
    "name": "CAXIAS DO SUL",
    "state": "RS",
    "coordinates": [
      -29.168505,
      -51.179639
    ],
    "votes": [
      {
        "candidate": "ADILO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 64537,
        "percentage": 13.06
      },
      {
        "candidate": "ADILO",
        "party": "PSDB",
        "turno": 2,
        "totalVotes": 116730,
        "percentage": 23.63
      },
      {
        "candidate": "DAIANE MELLO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5034,
        "percentage": 1.02
      },
      {
        "candidate": "DENISE PESSOA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 61684,
        "percentage": 12.49
      },
      {
        "candidate": "FELIPE GREMELMAIER",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 19172,
        "percentage": 3.88
      },
      {
        "candidate": "HIAGO MORANDI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 11304,
        "percentage": 2.29
      },
      {
        "candidate": "JOAO UEZ",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 6830,
        "percentage": 1.38
      },
      {
        "candidate": "LUCAS CAREGNATO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 4213,
        "percentage": 0.85
      },
      {
        "candidate": "MARISOL SANTOS",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 4783,
        "percentage": 0.97
      },
      {
        "candidate": "SCALCO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 89260,
        "percentage": 18.07
      },
      {
        "candidate": "SCALCO",
        "party": "PL",
        "turno": 2,
        "totalVotes": 110476,
        "percentage": 22.36
      }
    ],
    "totalVoters": 494023
  },
  {
    "id": "23703550",
    "name": "PELOTAS",
    "state": "RS",
    "coordinates": [
      -31.769974,
      -52.341016
    ],
    "votes": [
      {
        "candidate": "CESINHA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 4421,
        "percentage": 1.19
      },
      {
        "candidate": "EDER BLANK PATACA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 3597,
        "percentage": 0.97
      },
      {
        "candidate": "FERNANDA MIRANDA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 5885,
        "percentage": 1.59
      },
      {
        "candidate": "FERNANDO ESTIMA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 36122,
        "percentage": 9.76
      },
      {
        "candidate": "IRAJA RODRIGUES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 6785,
        "percentage": 1.83
      },
      {
        "candidate": "MARCELO BAGE",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5540,
        "percentage": 1.5
      },
      {
        "candidate": "MARCIANO PERONDI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 54736,
        "percentage": 14.79
      },
      {
        "candidate": "MARCIANO PERONDI",
        "party": "PL",
        "turno": 2,
        "totalVotes": 86474,
        "percentage": 23.36
      },
      {
        "candidate": "MARRONI",
        "party": "PT",
        "turno": 1,
        "totalVotes": 68443,
        "percentage": 18.49
      },
      {
        "candidate": "MARRONI",
        "party": "PT",
        "turno": 2,
        "totalVotes": 87737,
        "percentage": 23.7
      },
      {
        "candidate": "MICHEL PROMOVE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 3935,
        "percentage": 1.06
      },
      {
        "candidate": "REGINALDO BACCI",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 6514,
        "percentage": 1.76
      }
    ],
    "totalVoters": 370189
  },
  {
    "id": "30837956",
    "name": "PORTO ALEGRE",
    "state": "RS",
    "coordinates": [
      -30.0325,
      -51.230377
    ],
    "votes": [
      {
        "candidate": "COMANDANTE NADIA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 18010,
        "percentage": 1.25
      },
      {
        "candidate": "FELIPE CAMOZZATO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 26603,
        "percentage": 1.84
      },
      {
        "candidate": "GRAZI OLIVEIRA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 14321,
        "percentage": 0.99
      },
      {
        "candidate": "JESSE SANGALLI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 22966,
        "percentage": 1.59
      },
      {
        "candidate": "JULIANA BRIZOLA",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 136783,
        "percentage": 9.46
      },
      {
        "candidate": "KAREN SANTOS",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 20207,
        "percentage": 1.4
      },
      {
        "candidate": "LUCIANO DO MLB",
        "party": "UP",
        "turno": 1,
        "totalVotes": 1476,
        "percentage": 0.1
      },
      {
        "candidate": "MARIA DO ROSARIO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 182553,
        "percentage": 12.63
      },
      {
        "candidate": "MARIA DO ROSARIO",
        "party": "PT",
        "turno": 2,
        "totalVotes": 254128,
        "percentage": 17.58
      },
      {
        "candidate": "RAMIRO ROSARIO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 16450,
        "percentage": 1.14
      },
      {
        "candidate": "SEBASTIAO MELO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 345420,
        "percentage": 23.9
      },
      {
        "candidate": "SEBASTIAO MELO",
        "party": "MDB",
        "turno": 2,
        "totalVotes": 406467,
        "percentage": 28.12
      }
    ],
    "totalVoters": 1445384
  },
  {
    "id": "26828688",
    "name": "SANTA MARIA",
    "state": "RS",
    "coordinates": [
      -29.686051,
      -53.806921
    ],
    "votes": [
      {
        "candidate": "ALEXANDRE VARGAS",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 3089,
        "percentage": 1.02
      },
      {
        "candidate": "ALICE CARVALHO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 4129,
        "percentage": 1.37
      },
      {
        "candidate": "PROFESSOR BURMANN",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 5234,
        "percentage": 1.73
      },
      {
        "candidate": "RIESGO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 15107,
        "percentage": 5.0
      },
      {
        "candidate": "ROBERTA LEITAO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 26838,
        "percentage": 8.88
      },
      {
        "candidate": "RODRIGO DECIMO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 37295,
        "percentage": 12.34
      },
      {
        "candidate": "RODRIGO DECIMO",
        "party": "PSDB",
        "turno": 2,
        "totalVotes": 76803,
        "percentage": 25.41
      },
      {
        "candidate": "RUDYS CONFIRMADISSIMO",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 3796,
        "percentage": 1.26
      },
      {
        "candidate": "SERGIO CECHIN",
        "party": "PP",
        "turno": 1,
        "totalVotes": 3220,
        "percentage": 1.07
      },
      {
        "candidate": "VALDECI OLIVEIRA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 58580,
        "percentage": 19.38
      },
      {
        "candidate": "VALDECI OLIVEIRA",
        "party": "PT",
        "turno": 2,
        "totalVotes": 64113,
        "percentage": 21.21
      },
      {
        "candidate": "VALDIR OLIVEIRA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 4036,
        "percentage": 1.34
      }
    ],
    "totalVoters": 302240
  },
  {
    "id": "32154552",
    "name": "BLUMENAU",
    "state": "SC",
    "coordinates": [
      -26.919557,
      -49.065802
    ],
    "votes": [
      {
        "candidate": "ALEXANDRE MATIAS",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 5037,
        "percentage": 2.37
      },
      {
        "candidate": "ALMIR VIEIRA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 5829,
        "percentage": 2.74
      },
      {
        "candidate": "ANA PAULA LIMA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 29071,
        "percentage": 13.67
      },
      {
        "candidate": "BRUNO CUNHA",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 5851,
        "percentage": 2.75
      },
      {
        "candidate": "DELEGADO EGIDIO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 95075,
        "percentage": 44.69
      },
      {
        "candidate": "ITO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 5609,
        "percentage": 2.64
      },
      {
        "candidate": "ODAIR TRAMONTIN",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 55968,
        "percentage": 26.31
      },
      {
        "candidate": "PROFESSOR GILSON",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 5422,
        "percentage": 2.55
      },
      {
        "candidate": "RICARDO ALBA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 3383,
        "percentage": 1.59
      },
      {
        "candidate": "ROSANE",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 1490,
        "percentage": 0.7
      }
    ],
    "totalVoters": 212735
  },
  {
    "id": "14500207",
    "name": "JOINVILLE",
    "state": "SC",
    "coordinates": [
      -26.30449,
      -48.848673
    ],
    "votes": [
      {
        "candidate": "ADRIANO SILVA",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 244321,
        "percentage": 69.84
      },
      {
        "candidate": "BRANDEL JUNIOR",
        "party": "PL",
        "turno": 1,
        "totalVotes": 6810,
        "percentage": 1.95
      },
      {
        "candidate": "CARLITO MERSS",
        "party": "PT",
        "turno": 1,
        "totalVotes": 23278,
        "percentage": 6.65
      },
      {
        "candidate": "DIEGO MACHADO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 8719,
        "percentage": 2.49
      },
      {
        "candidate": "LUIZ CLAUDIO GUBERT",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 4285,
        "percentage": 1.22
      },
      {
        "candidate": "NETO PETTERS DO NOVO",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 7586,
        "percentage": 2.17
      },
      {
        "candidate": "PASTOR ASCENDINO BATISTA",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 6880,
        "percentage": 1.97
      },
      {
        "candidate": "RODRIGO BORNHOLDT",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2946,
        "percentage": 0.84
      },
      {
        "candidate": "SARGENTO LIMA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 35667,
        "percentage": 10.2
      },
      {
        "candidate": "WILIAN TONEZI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 9323,
        "percentage": 2.67
      }
    ],
    "totalVoters": 349815
  },
  {
    "id": "52526915",
    "name": "ARACAJU",
    "state": "SE",
    "coordinates": [
      -10.916206,
      -37.077466
    ],
    "votes": [
      {
        "candidate": "BRENO GARIBALDE",
        "party": "REDE",
        "turno": 1,
        "totalVotes": 7834,
        "percentage": 2.4
      },
      {
        "candidate": "EMILIA CORREA",
        "party": "PL",
        "turno": 2,
        "totalVotes": 165924,
        "percentage": 50.89
      },
      {
        "candidate": "IRAN BARBOSA",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 5528,
        "percentage": 1.7
      },
      {
        "candidate": "LUIZ ROBERTO",
        "party": "PDT",
        "turno": 2,
        "totalVotes": 122842,
        "percentage": 37.67
      },
      {
        "candidate": "MOANA VALADARES",
        "party": "PL",
        "turno": 1,
        "totalVotes": 7216,
        "percentage": 2.21
      },
      {
        "candidate": "NITINHO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 5607,
        "percentage": 1.72
      },
      {
        "candidate": "RICARDO VASCONCELOS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 11120,
        "percentage": 3.41
      }
    ],
    "totalVoters": 326071
  },
  {
    "id": "93092751",
    "name": "ITABAIANA",
    "state": "SE",
    "coordinates": [
      -10.68562,
      -37.427052
    ],
    "votes": [
      {
        "candidate": "ALEX HENRIQUE",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 3375,
        "percentage": 4.49
      },
      {
        "candidate": "BRENO DE VARDO DA LOTERICA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2572,
        "percentage": 3.42
      },
      {
        "candidate": "EDSON PASSOS",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 25346,
        "percentage": 33.73
      },
      {
        "candidate": "JOAOZINHO DO LAGAMAR",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 3107,
        "percentage": 4.14
      },
      {
        "candidate": "PEDRO DA AGROVILA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2630,
        "percentage": 3.5
      },
      {
        "candidate": "VALMIR DE FRANCISQUINHO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 35897,
        "percentage": 47.78
      },
      {
        "candidate": "WAGUINHO DE LEITOA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 2207,
        "percentage": 2.94
      }
    ],
    "totalVoters": 75134
  },
  {
    "id": "41669677",
    "name": "LAGARTO",
    "state": "SE",
    "coordinates": [
      -10.914501,
      -37.67111
    ],
    "votes": [
      {
        "candidate": "AMILTON FONTES",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2101,
        "percentage": 2.81
      },
      {
        "candidate": "ANDERSON SILVA",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 1712,
        "percentage": 2.29
      },
      {
        "candidate": "GORDINHO DE JORGE DA LARANJA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 1951,
        "percentage": 2.61
      },
      {
        "candidate": "MARCELO DE DENILSON",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1688,
        "percentage": 2.26
      },
      {
        "candidate": "MATHEUS CORREA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 2179,
        "percentage": 2.91
      },
      {
        "candidate": "PROFESSOR BENIZARIO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 1458,
        "percentage": 1.95
      },
      {
        "candidate": "RAFAELA ",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 30352,
        "percentage": 40.56
      },
      {
        "candidate": "SERGIO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 33387,
        "percentage": 44.62
      }
    ],
    "totalVoters": 74828
  },
  {
    "id": "35107778",
    "name": "NOSSA SENHORA DO SOCORRO",
    "state": "SE",
    "coordinates": [
      -10.855311,
      -37.126486
    ],
    "votes": [
      {
        "candidate": "ADRIANO DA PIABETA",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2691,
        "percentage": 21.44
      },
      {
        "candidate": "BETINHO",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 2090,
        "percentage": 16.65
      },
      {
        "candidate": "ELIEL FELIPE",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 2832,
        "percentage": 22.56
      },
      {
        "candidate": "LALO",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 2721,
        "percentage": 21.68
      },
      {
        "candidate": "LEOZINHO FILHO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 2219,
        "percentage": 17.68
      }
    ],
    "totalVoters": 12553
  },
  {
    "id": "60875217",
    "name": "CAMPINAS",
    "state": "SP",
    "coordinates": [
      -22.905639,
      -47.059564
    ],
    "votes": [
      {
        "candidate": "ANGELINA DIAS",
        "party": "PCO",
        "turno": 1,
        "totalVotes": 997,
        "percentage": 0.17
      },
      {
        "candidate": "DARIO SAADI",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 355800,
        "percentage": 60.71
      },
      {
        "candidate": "HIGOR DIEGO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 11391,
        "percentage": 1.94
      },
      {
        "candidate": "MARIANA CONTI",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 14356,
        "percentage": 2.45
      },
      {
        "candidate": "NICK SCHNEIDER",
        "party": "PL",
        "turno": 1,
        "totalVotes": 7993,
        "percentage": 1.36
      },
      {
        "candidate": "PEDRO TOURINHO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 123500,
        "percentage": 21.07
      },
      {
        "candidate": "RAFA ZIMBALDI",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 42557,
        "percentage": 7.26
      },
      {
        "candidate": "RODRIGO DA FARMADIC",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 9006,
        "percentage": 1.54
      },
      {
        "candidate": "VINI",
        "party": "CIDADANIA",
        "turno": 1,
        "totalVotes": 11423,
        "percentage": 1.95
      },
      {
        "candidate": "WILSON MATOS",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 10013,
        "percentage": 1.71
      }
    ],
    "totalVoters": 586039
  },
  {
    "id": "90081423",
    "name": "SANTOS",
    "state": "SP",
    "coordinates": [
      -23.933599,
      -46.32864
    ],
    "votes": [
      {
        "candidate": "DEBORA CAMILO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 8016,
        "percentage": 1.65
      },
      {
        "candidate": "DR. CASEIRO",
        "party": "PT",
        "turno": 1,
        "totalVotes": 4989,
        "percentage": 1.03
      },
      {
        "candidate": "FABRICIO CARDOSO",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 6106,
        "percentage": 1.26
      },
      {
        "candidate": "NANDO PINHEIRO",
        "party": "AVANTE",
        "turno": 1,
        "totalVotes": 1565,
        "percentage": 0.32
      },
      {
        "candidate": "PAULO MIYASIRO",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 4864,
        "percentage": 1.0
      },
      {
        "candidate": "ROGERIO SANTOS",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 101498,
        "percentage": 20.92
      },
      {
        "candidate": "ROGERIO SANTOS",
        "party": "REPUBLICANOS",
        "turno": 2,
        "totalVotes": 118562,
        "percentage": 24.44
      },
      {
        "candidate": "ROSANA VALLE",
        "party": "PL",
        "turno": 1,
        "totalVotes": 99999,
        "percentage": 20.61
      },
      {
        "candidate": "ROSANA VALLE",
        "party": "PL",
        "turno": 2,
        "totalVotes": 103592,
        "percentage": 21.35
      },
      {
        "candidate": "SERGIO SANTANA",
        "party": "PL",
        "turno": 1,
        "totalVotes": 4562,
        "percentage": 0.94
      },
      {
        "candidate": "TELMA DE SOUZA",
        "party": "PT",
        "turno": 1,
        "totalVotes": 31423,
        "percentage": 6.48
      }
    ],
    "totalVoters": 485176
  },
  {
    "id": "33500841",
    "name": "SAO PAULO",
    "state": "SP",
    "coordinates": [
      -23.550651,
      -46.633382
    ],
    "votes": [
      {
        "candidate": "AMANDA PASCHOAL",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 108654,
        "percentage": 0.88
      },
      {
        "candidate": "ANA CAROLINA OLIVEIRA",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 129563,
        "percentage": 1.05
      },
      {
        "candidate": "DATENA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 112344,
        "percentage": 0.91
      },
      {
        "candidate": "DR. MURILLO LIMA",
        "party": "PP",
        "turno": 1,
        "totalVotes": 113820,
        "percentage": 0.92
      },
      {
        "candidate": "GUILHERME BOULOS",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 1776127,
        "percentage": 14.37
      },
      {
        "candidate": "GUILHERME BOULOS",
        "party": "PSOL",
        "turno": 2,
        "totalVotes": 2323901,
        "percentage": 18.81
      },
      {
        "candidate": "LUCAS PAVANATO",
        "party": "PL",
        "turno": 1,
        "totalVotes": 161386,
        "percentage": 1.31
      },
      {
        "candidate": "PABLO MARCAL",
        "party": "PRTB",
        "turno": 1,
        "totalVotes": 1719274,
        "percentage": 13.91
      },
      {
        "candidate": "RICARDO NUNES",
        "party": "MDB",
        "turno": 1,
        "totalVotes": 1801139,
        "percentage": 14.58
      },
      {
        "candidate": "RICARDO NUNES",
        "party": "MDB",
        "turno": 2,
        "totalVotes": 3393110,
        "percentage": 27.46
      },
      {
        "candidate": "SARGENTO NANTES",
        "party": "PP",
        "turno": 1,
        "totalVotes": 112484,
        "percentage": 0.91
      },
      {
        "candidate": "TABATA AMARAL",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 605552,
        "percentage": 4.9
      }
    ],
    "totalVoters": 12357354
  },
  {
    "id": "71793702",
    "name": "SOROCABA",
    "state": "SP",
    "coordinates": [
      -23.468484,
      -47.442413
    ],
    "votes": [
      {
        "candidate": "CAIO OLIVEIRA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 12090,
        "percentage": 3.0
      },
      {
        "candidate": "CALEBE HENRIQUE",
        "party": "PCO",
        "turno": 1,
        "totalVotes": 754,
        "percentage": 0.19
      },
      {
        "candidate": "DANILO BALAS",
        "party": "PL",
        "turno": 1,
        "totalVotes": 48445,
        "percentage": 12.04
      },
      {
        "candidate": "FAUSTO PERES",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 7103,
        "percentage": 1.76
      },
      {
        "candidate": "ITALO MOREIRA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 10292,
        "percentage": 2.56
      },
      {
        "candidate": "JOAO DONIZETI",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 7941,
        "percentage": 1.97
      },
      {
        "candidate": "PAULINHO DO TRANSPORTE",
        "party": "PT",
        "turno": 1,
        "totalVotes": 44447,
        "percentage": 11.04
      },
      {
        "candidate": "RAUL MARCELO",
        "party": "PSOL",
        "turno": 1,
        "totalVotes": 8377,
        "percentage": 2.08
      },
      {
        "candidate": "RODRIGO MANGA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 263063,
        "percentage": 65.36
      }
    ],
    "totalVoters": 402512
  },
  {
    "id": "99098516",
    "name": "GURUPI",
    "state": "TO",
    "coordinates": [
      -11.72794,
      -49.068046
    ],
    "votes": [
      {
        "candidate": "COLEMAR DA SABORELLE",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 1090,
        "percentage": 2.11
      },
      {
        "candidate": "CRISTIANO PISONI",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2846,
        "percentage": 5.5
      },
      {
        "candidate": "EDUARDO FORTES",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 17655,
        "percentage": 34.13
      },
      {
        "candidate": "JOSI NUNES",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 25533,
        "percentage": 49.36
      },
      {
        "candidate": "MARIO CEZAR LUSTOSA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1137,
        "percentage": 2.2
      },
      {
        "candidate": "MATHEUS MONTEIRO",
        "party": "PRD",
        "turno": 1,
        "totalVotes": 1275,
        "percentage": 2.46
      },
      {
        "candidate": "PEDRO MORAIS",
        "party": "PDT",
        "turno": 1,
        "totalVotes": 1174,
        "percentage": 2.27
      },
      {
        "candidate": "RODRIGO MACIEL",
        "party": "PSD",
        "turno": 1,
        "totalVotes": 1020,
        "percentage": 1.97
      }
    ],
    "totalVoters": 51730
  },
  {
    "id": "78638761",
    "name": "PALMAS",
    "state": "TO",
    "coordinates": [
      -10.183785,
      -48.333642
    ],
    "votes": [
      {
        "candidate": "CARLOS AMASTHA",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 2247,
        "percentage": 0.7
      },
      {
        "candidate": "EDUARDO SIQUEIRA CAMPOS",
        "party": "PODE",
        "turno": 1,
        "totalVotes": 51344,
        "percentage": 16.08
      },
      {
        "candidate": "EDUARDO SIQUEIRA CAMPOS",
        "party": "PODE",
        "turno": 2,
        "totalVotes": 78673,
        "percentage": 24.64
      },
      {
        "candidate": "FOLHA",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2645,
        "percentage": 0.83
      },
      {
        "candidate": "JANAD VALCARI",
        "party": "PL",
        "turno": 1,
        "totalVotes": 62126,
        "percentage": 19.46
      },
      {
        "candidate": "JANAD VALCARI",
        "party": "PL",
        "turno": 2,
        "totalVotes": 69684,
        "percentage": 21.83
      },
      {
        "candidate": "KARINA CAFE",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2643,
        "percentage": 0.83
      },
      {
        "candidate": "MARCIO REIS",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 2912,
        "percentage": 0.91
      },
      {
        "candidate": "MARILON BARBOSA",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 2640,
        "percentage": 0.83
      },
      {
        "candidate": "PROFESSOR JUNIOR GEO",
        "party": "PSDB",
        "turno": 1,
        "totalVotes": 44326,
        "percentage": 13.88
      }
    ],
    "totalVoters": 319240
  },
  {
    "id": "37851204",
    "name": "PORTO NACIONAL",
    "state": "TO",
    "coordinates": [
      -10.701979,
      -48.411095
    ],
    "votes": [
      {
        "candidate": "ALVARO DA A7",
        "party": "PSB",
        "turno": 1,
        "totalVotes": 328,
        "percentage": 0.79
      },
      {
        "candidate": "DUERITA NETA",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1281,
        "percentage": 3.09
      },
      {
        "candidate": "GEYLSON",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 866,
        "percentage": 2.09
      },
      {
        "candidate": "HEITOR ANDRADE",
        "party": "PP",
        "turno": 1,
        "totalVotes": 783,
        "percentage": 1.89
      },
      {
        "candidate": "JOAO JUSTINO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 806,
        "percentage": 1.94
      },
      {
        "candidate": "MIUDO",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 1061,
        "percentage": 2.56
      },
      {
        "candidate": "NELCIR FORMEHL",
        "party": "NOVO",
        "turno": 1,
        "totalVotes": 2108,
        "percentage": 5.08
      },
      {
        "candidate": "RONIVON MACIEL",
        "party": "UNIO",
        "turno": 1,
        "totalVotes": 23988,
        "percentage": 57.79
      },
      {
        "candidate": "TOINHO ANDRADE",
        "party": "REPUBLICANOS",
        "turno": 1,
        "totalVotes": 10287,
        "percentage": 24.78
      }
    ],
    "totalVoters": 41508
  }
];
