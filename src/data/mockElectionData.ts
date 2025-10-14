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
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Ana Oliveira",
  "Carlos Mendes"
];

export const parties = ["PT", "PSDB", "MDB", "PP", "PDT"];

export const mockElectionData: MunicipalityData[] = [
  {
    id: "3550308",
    name: "São Paulo",
    state: "SP",
    coordinates: [-23.5505, -46.6333],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 2800000, percentage: 45 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 1900000, percentage: 30 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 950000, percentage: 15 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 3200000, percentage: 52 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 2950000, percentage: 48 },
    ],
    totalVoters: 9200000
  },
  {
    id: "3304557",
    name: "Rio de Janeiro",
    state: "RJ",
    coordinates: [-22.9068, -43.1729],
    votes: [
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 1500000, percentage: 38 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 1200000, percentage: 30 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 800000, percentage: 20 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 2100000, percentage: 54 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 1800000, percentage: 46 },
    ],
    totalVoters: 5100000
  },
  {
    id: "5300108",
    name: "Brasília",
    state: "DF",
    coordinates: [-15.7939, -47.8828],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 450000, percentage: 42 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 350000, percentage: 33 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 200000, percentage: 19 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 580000, percentage: 55 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 475000, percentage: 45 },
    ],
    totalVoters: 2200000
  },
  {
    id: "2927408",
    name: "Salvador",
    state: "BA",
    coordinates: [-12.9714, -38.5014],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 650000, percentage: 48 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 450000, percentage: 33 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 250000, percentage: 19 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 750000, percentage: 56 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 590000, percentage: 44 },
    ],
    totalVoters: 2100000
  },
  {
    id: "2304400",
    name: "Fortaleza",
    state: "CE",
    coordinates: [-3.7172, -38.5433],
    votes: [
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 580000, percentage: 44 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 420000, percentage: 32 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 300000, percentage: 23 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 690000, percentage: 53 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 610000, percentage: 47 },
    ],
    totalVoters: 1950000
  },
  {
    id: "3106200",
    name: "Belo Horizonte",
    state: "MG",
    coordinates: [-19.9167, -43.9345],
    votes: [
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 520000, percentage: 40 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 450000, percentage: 35 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 320000, percentage: 25 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 680000, percentage: 52 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 620000, percentage: 48 },
    ],
    totalVoters: 1900000
  },
  {
    id: "1302603",
    name: "Manaus",
    state: "AM",
    coordinates: [-3.1190, -60.0217],
    votes: [
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 380000, percentage: 41 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 320000, percentage: 34 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 230000, percentage: 25 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 490000, percentage: 53 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 440000, percentage: 47 },
    ],
    totalVoters: 1450000
  },
  {
    id: "4106902",
    name: "Curitiba",
    state: "PR",
    coordinates: [-25.4284, -49.2733],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 420000, percentage: 39 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 380000, percentage: 35 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 280000, percentage: 26 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 560000, percentage: 52 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 520000, percentage: 48 },
    ],
    totalVoters: 1550000
  },
  {
    id: "2611606",
    name: "Recife",
    state: "PE",
    coordinates: [-8.0476, -34.8770],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 350000, percentage: 46 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 260000, percentage: 34 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 150000, percentage: 20 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 410000, percentage: 54 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 350000, percentage: 46 },
    ],
    totalVoters: 1200000
  },
  {
    id: "4314902",
    name: "Porto Alegre",
    state: "RS",
    coordinates: [-30.0346, -51.2177],
    votes: [
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 320000, percentage: 38 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 290000, percentage: 34 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 240000, percentage: 28 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 440000, percentage: 52 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 410000, percentage: 48 },
    ],
    totalVoters: 1100000
  },
  {
    id: "5208707",
    name: "Goiânia",
    state: "GO",
    coordinates: [-16.6869, -49.2648],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 280000, percentage: 43 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 220000, percentage: 34 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 150000, percentage: 23 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 350000, percentage: 54 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 300000, percentage: 46 },
    ],
    totalVoters: 980000
  },
  {
    id: "3518800",
    name: "Guarulhos",
    state: "SP",
    coordinates: [-23.4538, -46.5333],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 240000, percentage: 47 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 180000, percentage: 35 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 90000, percentage: 18 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 280000, percentage: 55 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 230000, percentage: 45 },
    ],
    totalVoters: 850000
  },
  {
    id: "3509502",
    name: "Campinas",
    state: "SP",
    coordinates: [-22.9099, -47.0626],
    votes: [
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 210000, percentage: 41 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 180000, percentage: 35 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 120000, percentage: 24 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 270000, percentage: 53 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 240000, percentage: 47 },
    ],
    totalVoters: 820000
  },
  {
    id: "3547809",
    name: "São Bernardo do Campo",
    state: "SP",
    coordinates: [-23.6914, -46.5646],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 180000, percentage: 48 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 130000, percentage: 35 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 65000, percentage: 17 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 210000, percentage: 56 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 165000, percentage: 44 },
    ],
    totalVoters: 620000
  },
  {
    id: "2211001",
    name: "Teresina",
    state: "PI",
    coordinates: [-5.0892, -42.8016],
    votes: [
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 160000, percentage: 42 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 130000, percentage: 34 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 90000, percentage: 24 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 200000, percentage: 53 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 180000, percentage: 47 },
    ],
    totalVoters: 580000
  },
  {
    id: "3304904",
    name: "Duque de Caxias",
    state: "RJ",
    coordinates: [-22.7858, -43.3055],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 170000, percentage: 45 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 140000, percentage: 37 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 68000, percentage: 18 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 200000, percentage: 53 },
      { candidate: "Maria Santos", party: "PSDB", turno: 2, totalVotes: 178000, percentage: 47 },
    ],
    totalVoters: 550000
  },
  {
    id: "1501402",
    name: "Belém",
    state: "PA",
    coordinates: [-1.4558, -48.5039],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 280000, percentage: 49 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 190000, percentage: 33 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 100000, percentage: 18 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 320000, percentage: 56 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 250000, percentage: 44 },
    ],
    totalVoters: 950000
  },
  {
    id: "2704302",
    name: "Maceió",
    state: "AL",
    coordinates: [-9.6658, -35.7350],
    votes: [
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 190000, percentage: 44 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 150000, percentage: 35 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 90000, percentage: 21 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 230000, percentage: 53 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 205000, percentage: 47 },
    ],
    totalVoters: 720000
  },
  {
    id: "2507507",
    name: "João Pessoa",
    state: "PB",
    coordinates: [-7.1195, -34.8450],
    votes: [
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 150000, percentage: 40 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 135000, percentage: 36 },
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 90000, percentage: 24 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 195000, percentage: 52 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 180000, percentage: 48 },
    ],
    totalVoters: 650000
  },
  {
    id: "2800308",
    name: "Aracaju",
    state: "SE",
    coordinates: [-10.9472, -37.0731],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 120000, percentage: 43 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 95000, percentage: 34 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 65000, percentage: 23 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 150000, percentage: 54 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 128000, percentage: 46 },
    ],
    totalVoters: 480000
  },
  {
    id: "1100205",
    name: "Porto Velho",
    state: "RO",
    coordinates: [-8.7612, -63.9004],
    votes: [
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 95000, percentage: 42 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 80000, percentage: 35 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 52000, percentage: 23 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 115000, percentage: 51 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 110000, percentage: 49 },
    ],
    totalVoters: 380000
  },
  {
    id: "1400100",
    name: "Boa Vista",
    state: "RR",
    coordinates: [2.8235, -60.6758],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 65000, percentage: 38 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 58000, percentage: 34 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 48000, percentage: 28 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 88000, percentage: 51 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 85000, percentage: 49 },
    ],
    totalVoters: 280000
  },
  {
    id: "1600303",
    name: "Macapá",
    state: "AP",
    coordinates: [0.0389, -51.0664],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 85000, percentage: 45 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 70000, percentage: 37 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 34000, percentage: 18 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 100000, percentage: 53 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 89000, percentage: 47 },
    ],
    totalVoters: 320000
  },
  {
    id: "1721000",
    name: "Palmas",
    state: "TO",
    coordinates: [-10.2491, -48.3243],
    votes: [
      { candidate: "Pedro Costa", party: "MDB", turno: 1, totalVotes: 55000, percentage: 40 },
      { candidate: "Ana Oliveira", party: "PP", turno: 1, totalVotes: 48000, percentage: 35 },
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 34000, percentage: 25 },
      { candidate: "Pedro Costa", party: "MDB", turno: 2, totalVotes: 72000, percentage: 52 },
      { candidate: "Ana Oliveira", party: "PP", turno: 2, totalVotes: 66000, percentage: 48 },
    ],
    totalVoters: 240000
  },
  {
    id: "1200401",
    name: "Rio Branco",
    state: "AC",
    coordinates: [-9.9747, -67.8243],
    votes: [
      { candidate: "João Silva", party: "PT", turno: 1, totalVotes: 72000, percentage: 46 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 1, totalVotes: 58000, percentage: 37 },
      { candidate: "Maria Santos", party: "PSDB", turno: 1, totalVotes: 27000, percentage: 17 },
      { candidate: "João Silva", party: "PT", turno: 2, totalVotes: 85000, percentage: 54 },
      { candidate: "Carlos Mendes", party: "PDT", turno: 2, totalVotes: 72000, percentage: 46 },
    ],
    totalVoters: 260000
  }
];
