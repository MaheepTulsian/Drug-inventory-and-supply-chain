import { tokens } from "../theme";

export const mockOrderData = [
  {
    id: 101,
    buyerName: "Amit Sharma",
    buyerId: "B123",
    medicines: [
      { name: "Paracetamol", quantity: 50 },
      { name: "Ibuprofen", quantity: 30 },
    ],
    city: "Mumbai",
    gstn: "27AABCU9603R1ZP",
  },
  {
    id: 102,
    buyerName: "Sunita Verma",
    buyerId: "B124",
    medicines: [
      { name: "Amoxicillin", quantity: 100 },
      { name: "Metformin", quantity: 60 },
    ],
    city: "Delhi",
    gstn: "07AAACS1455P1ZQ",
  },
  {
    id: 103,
    buyerName: "Rajesh Iyer",
    buyerId: "B125",
    medicines: [
      { name: "Ibuprofen", quantity: 150 },
      { name: "Cefixime", quantity: 80 },
    ],
    city: "Chennai",
    gstn: "33AABCU9603R1ZS",
  },
  {
    id: 104,
    buyerName: "Priya Patel",
    buyerId: "B126",
    medicines: [
      { name: "Cefixime", quantity: 200 },
      { name: "Amlodipine", quantity: 50 },
    ],
    city: "Ahmedabad",
    gstn: "24AAACU9603P1ZW",
  },
  {
    id: 105,
    buyerName: "Rahul Gupta",
    buyerId: "B127",
    medicines: [
      { name: "Metformin", quantity: 80 },
      { name: "Atorvastatin", quantity: 30 },
    ],
    city: "Kolkata",
    gstn: "19AAACG1234M1ZX",
  },
];

export const mockDataSalesHistory = [
  {
    saleId: 1,
    medicineName: "Paracetamol",
    batch: "B123",
    quantity: 50,
    price: 250,
    buyerName: "Rahul Sharma",
    buyerId: 1001,
    buyerCity: "Mumbai",
    buyerPhone: "9876543210",
  },
  {
    saleId: 2,
    medicineName: "Azithromycin",
    batch: "A234",
    quantity: 30,
    price: 450,
    buyerName: "Anjali Singh",
    buyerId: 1002,
    buyerCity: "Delhi",
    buyerPhone: "9988776655",
  },
  {
    saleId: 3,
    medicineName: "Metformin",
    batch: "M789",
    quantity: 100,
    price: 1200,
    buyerName: "Vikas Patel",
    buyerId: 1003,
    buyerCity: "Ahmedabad",
    buyerPhone: "9123456789",
  },
  {
    saleId: 4,
    medicineName: "Amoxicillin",
    batch: "A789",
    quantity: 60,
    price: 900,
    buyerName: "Priya Kapoor",
    buyerId: 1004,
    buyerCity: "Chennai",
    buyerPhone: "9876543123",
  },
  {
    saleId: 5,
    medicineName: "Cetirizine",
    batch: "C456",
    quantity: 25,
    price: 300,
    buyerName: "Ravi Verma",
    buyerId: 1005,
    buyerCity: "Bangalore",
    buyerPhone: "9345678123",
  },
  {
    saleId: 6,
    medicineName: "Ibuprofen",
    batch: "I890",
    quantity: 40,
    price: 500,
    buyerName: "Sneha Gupta",
    buyerId: 1006,
    buyerCity: "Kolkata",
    buyerPhone: "9765432109",
  },
  {
    saleId: 7,
    medicineName: "Pantoprazole",
    batch: "P987",
    quantity: 20,
    price: 350,
    buyerName: "Amit Kumar",
    buyerId: 1007,
    buyerCity: "Pune",
    buyerPhone: "9845123456",
  },
  {
    saleId: 8,
    medicineName: "Dolo 650",
    batch: "D654",
    quantity: 75,
    price: 750,
    buyerName: "Lakshmi Iyer",
    buyerId: 1008,
    buyerCity: "Hyderabad",
    buyerPhone: "9988994455",
  },
  {
    saleId: 9,
    medicineName: "Clindamycin",
    batch: "C321",
    quantity: 10,
    price: 150,
    buyerName: "Arjun Menon",
    buyerId: 1009,
    buyerCity: "Kochi",
    buyerPhone: "9995554444",
  },
  {
    saleId: 10,
    medicineName: "Levothyroxine",
    batch: "L123",
    quantity: 80,
    price: 1000,
    buyerName: "Neha Desai",
    buyerId: 1010,
    buyerCity: "Surat",
    buyerPhone: "9865432123",
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    medicine_name: "Furosemide",
    total_sales: 1143.0,
  },
  {
    medicine_name: "Imatinib",
    total_sales: 1121.0,
  },
  {
    medicine_name: "Ipratropium",
    total_sales: 1072.0,
  },
  {
    medicine_name: "Dapoxetine",
    total_sales: 1050.0,
  },
  {
    medicine_name: "Sofosbuvir",
    total_sales: 1043.0,
  },
  {
    medicine_name: "Raltegravir",
    total_sales: 1008.0,
  },
  {
    medicine_name: "Anastrozole",
    total_sales: 1001.0,
  },
  {
    medicine_name: "Aripiprazole",
    total_sales: 956.0,
  },
  {
    medicine_name: "Trastuzumab",
    total_sales: 953.0,
  },
  {
    medicine_name: "Nifedipine",
    total_sales: 938.0,
  },
  {
    medicine_name: "Oseltamivir",
    total_sales: 922.0,
  },
  {
    medicine_name: "Zidovudine",
    total_sales: 911.0,
  },
  {
    medicine_name: "Acetylcholine",
    total_sales: 907.0,
  },
  {
    medicine_name: "Hydroxychloroquine",
    total_sales: 902.0,
  },
  {
    medicine_name: "Remdesivir",
    total_sales: 897.0,
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];

export const mockLineOneWeekData = [
  {
    id: "revenue",
    color: "hsl(205, 70%, 50%)",
    data: [
      { x: "Mon", y: 500 },
      { x: "Tue", y: 700 },
      { x: "Wed", y: 800 },
      { x: "Thu", y: 600 },
      { x: "Fri", y: 1000 },
      { x: "Sat", y: 1200 },
      { x: "Sun", y: 900 },
    ],
  },
];

export const mockLineOneMonthData = [
  {
    id: "revenue",
    color: "hsl(205, 70%, 50%)",
    data: [
      { x: "Day 1", y: 120 },
      { x: "Day 2", y: 140 },
      { x: "Day 3", y: 130 },
      { x: "Day 4", y: 145 },
      { x: "Day 5", y: 125 },
      { x: "Day 6", y: 135 },
      { x: "Day 7", y: 150 },
      { x: "Day 8", y: 160 },
      { x: "Day 9", y: 140 },
      { x: "Day 10", y: 130 },
      { x: "Day 11", y: 120 },
      { x: "Day 12", y: 145 },
      { x: "Day 13", y: 160 },
      { x: "Day 14", y: 150 },
      { x: "Day 15", y: 135 },
      { x: "Day 16", y: 140 },
      { x: "Day 17", y: 130 },
      { x: "Day 18", y: 145 },
      { x: "Day 19", y: 155 },
      { x: "Day 20", y: 165 },
      { x: "Day 21", y: 160 },
      { x: "Day 22", y: 150 },
      { x: "Day 23", y: 135 },
      { x: "Day 24", y: 145 },
      { x: "Day 25", y: 155 },
      { x: "Day 26", y: 165 },
      { x: "Day 27", y: 150 },
      { x: "Day 28", y: 145 },
      { x: "Day 29", y: 135 },
      { x: "Day 30", y: 125 },
      { x: "Day 31", y: 135 },
    ],
  },
];

export const mockLineOneQuarterData = [
  {
    id: "revenue",
    color: "hsl(205, 70%, 50%)",
    data: [
      { x: "January", y: 15000 },
      { x: "February", y: 12000 },
      { x: "March", y: 18000 },
    ],
  },
];

export const mockMedicineData = [
  { id: "Paracetamol", label: "Paracetamol", value: 500, quantity: 500 },
  { id: "Ibuprofen", label: "Ibuprofen", value: 300, quantity: 300 },
  { id: "Aspirin", label: "Aspirin", value: 250, quantity: 250 },
  { id: "Amoxicillin", label: "Amoxicillin", value: 150, quantity: 150 },
  { id: "Ciprofloxacin", label: "Ciprofloxacin", value: 100, quantity: 100 },
  { id: "Metformin", label: "Metformin", value: 200, quantity: 200 },
  { id: "Omeprazole", label: "Omeprazole", value: 400, quantity: 400 },
];

export const mockExpiryMedicineData = [
  {
    medicineName: "Aspirin",
    batch: "B12345",
    expiryDate: "2024-09-30",
  },
  {
    medicineName: "Paracetamol",
    batch: "P56789",
    expiryDate: "2024-10-15",
  },
  {
    medicineName: "Ibuprofen",
    batch: "I09876",
    expiryDate: "2024-10-20",
  },
];

export const mockMedicineInventoryData = [
  {
    medicine_id: "10001",
    medicine_name: "Paracetamol",
    batches: [
      {
        batch_id: "B001",
        manufacture_date: "2023-01-15",
        expiry_date: "2025-01-14",
        quantity: 200,
        current_stock: 180,
        expiry_status: "Valid",
        batch_status: "Active",
      },
      {
        batch_id: "B002",
        manufacture_date: "2023-03-10",
        expiry_date: "2025-03-09",
        quantity: 300,
        current_stock: 250,
        expiry_status: "Valid",
        batch_status: "Active",
      },
    ],
  },
  {
    medicine_id: "10002",
    medicine_name: "Ibuprofen",
    batches: [
      {
        batch_id: "B003",
        manufacture_date: "2022-08-20",
        expiry_date: "2024-08-19",
        quantity: 400,
        current_stock: 350,
        expiry_status: "Valid",
        batch_status: "Active",
      },
    ],
  },
  {
    medicine_id: "10003",
    medicine_name: "Amoxicillin",
    batches: [
      {
        batch_id: "B004",
        manufacture_date: "2022-06-15",
        expiry_date: "2024-06-14",
        quantity: 500,
        current_stock: 450,
        expiry_status: "Valid",
        batch_status: "Active",
      },
    ],
  },
];

export const mockReturnsData = [
  {
    id: 1,
    buyerName: "John Doe",
    buyerId: "B123",
    city: "New York",
    gstn: "22AAAAA0000A1Z5",
    returnReason: "Defective Product",
    medicines: [
      { name: "Paracetamol", quantity: 5 },
      { name: "Ibuprofen", quantity: 3 },
    ],
  },
  {
    id: 2,
    buyerName: "Jane Smith",
    buyerId: "B456",
    city: "Los Angeles",
    gstn: "22AAAAA0000A1Z6",
    returnReason: "Expired Medicine",
    medicines: [{ name: "Aspirin", quantity: 10 }],
  },
  // Add more return records as needed
];

export const mockMapManufacturerData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "1f6c8d9f1f7c4a9dbf12234a",
        profile_url: "http://example1.in",
        company_name: "Bharat Pharmaceuticals",
        email: "contact@bharatpharma.in",
        phone: "9876543210",
        website: "http://bharatpharma.in",
        GST_No: "27AABCU9603R1ZV",
        street: "4/5, Ghatkopar West",
        city: "Mumbai",
        state: "Maharashtra",
        postal_code: "400086",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6b5e7ede0e2126d5a6899",
            medicine_name: "Paracetamol",
          },
          {
            medicine_id: "66e6b6f645aa43ac9532b1e0",
            medicine_name: "Ibuprofen",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [72.909, 19.0822],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "5c8d1a2b7f6c45b5b12378a1",
        profile_url: "http://example2.in",
        company_name: "Zydus Lifesciences",
        email: "info@zydus.com",
        phone: "9833217890",
        website: "http://zydus.com",
        GST_No: "24AAGCZ4896L1ZA",
        street: "Ahmedabad-Gandhinagar Highway",
        city: "Ahmedabad",
        state: "Gujarat",
        postal_code: "382421",
        country: "India",
        medicines: [
          {
            medicine_id: "66e7b8e567aa43ac6543b9f1",
            medicine_name: "Amoxicillin",
          },
          {
            medicine_id: "66e7b9a567aa43ac9545b1g2",
            medicine_name: "Ciprofloxacin",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [72.5797, 23.0225],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "7f8c9d6f4b7a12c6d5b3f9e1",
        profile_url: "http://example3.in",
        company_name: "Cipla Ltd.",
        email: "support@cipla.com",
        phone: "9812345678",
        website: "http://cipla.com",
        GST_No: "29AABCC8888E1Z1",
        street: "Bellary Road",
        city: "Bengaluru",
        state: "Karnataka",
        postal_code: "560024",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6a1b345aa45a1234c9e1f",
            medicine_name: "Salbutamol",
          },
          {
            medicine_id: "66e7c1f6bbaa45a9876c4d2b",
            medicine_name: "Montelukast",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [77.5946, 12.9716],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "2e3b4f6f3c7d9a2b7b6f1a9e",
        profile_url: "http://example4.in",
        company_name: "Ranbaxy Laboratories",
        email: "sales@ranbaxy.com",
        phone: "9898765432",
        website: "http://ranbaxy.com",
        GST_No: "07AACCR9483K1Z1",
        street: "Okhla Phase III",
        city: "New Delhi",
        state: "Delhi",
        postal_code: "110020",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6b4f6bbaa43ab9874b6a1",
            medicine_name: "Azithromycin",
          },
          {
            medicine_id: "66e6b9e767aa43bc9532b3e0",
            medicine_name: "Levofloxacin",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [77.209, 28.6139],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "5f8a9b6c4b7a12c6d7b4f8e1",
        profile_url: "http://example5.in",
        company_name: "Sun Pharmaceuticals",
        email: "contact@sunpharma.com",
        phone: "9845612345",
        website: "http://sunpharma.com",
        GST_No: "33AACCS2933L1Z6",
        street: "Old Mahabalipuram Road",
        city: "Chennai",
        state: "Tamil Nadu",
        postal_code: "600119",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6b5e7ede0e2126d5b7898",
            medicine_name: "Metformin",
          },
          {
            medicine_id: "66e7c8b345aa43ac9534b1e9",
            medicine_name: "Amlodipine",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [80.2496, 13.0827],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "4b5a6c7d8e9f123b5c4e7a9f",
        profile_url: "http://example6.in",
        company_name: "Lupin Limited",
        email: "info@lupin.com",
        phone: "9871234560",
        website: "http://lupin.com",
        GST_No: "23AAACL5234P1ZA",
        street: "Industrial Area, Pithampur",
        city: "Indore",
        state: "Madhya Pradesh",
        postal_code: "452001",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6a2f567aa43bc9532c4a1",
            medicine_name: "Clopidogrel",
          },
          {
            medicine_id: "66e7d3b4aa543a9876f1b2c3",
            medicine_name: "Rosuvastatin",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [75.8577, 22.7196],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "6b8a9d7c4f5a12e6d7f1b6e3",
        profile_url: "http://example7.in",
        company_name: "Torrent Pharmaceuticals",
        email: "support@torrentpharma.com",
        phone: "9845098765",
        website: "http://torrentpharma.com",
        GST_No: "24AABCT4456R1ZV",
        street: "Sarkhej-Gandhinagar Highway",
        city: "Ahmedabad",
        state: "Gujarat",
        postal_code: "380051",
        country: "India",
        medicines: [
          {
            medicine_id: "66e7b4e6bbaa45bc9531d2f3",
            medicine_name: "Losartan",
          },
          {
            medicine_id: "66e7c1e567aa43bc9545e9g1",
            medicine_name: "Telmisartan",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [72.5714, 23.0339],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "5a7b8c6e7f9d12c5e6a4f7d8",
        profile_url: "http://example8.in",
        company_name: "Dr. Reddy's Laboratories",
        email: "sales@drreddys.com",
        phone: "9810987654",
        website: "http://drreddys.com",
        GST_No: "36AABCD4567G1ZV",
        street: "Banjara Hills",
        city: "Hyderabad",
        state: "Telangana",
        postal_code: "500034",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6f4e567aa43bc9543d6g1",
            medicine_name: "Omeprazole",
          },
          {
            medicine_id: "66e6b7f345aa45bc9532f7d9",
            medicine_name: "Pantoprazole",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [78.4867, 17.385],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "7d8a9b6e4f5a12c6d5e4f8e2",
        profile_url: "http://example9.in",
        company_name: "Aurobindo Pharma",
        email: "contact@aurobindo.com",
        phone: "9876012345",
        website: "http://aurobindo.com",
        GST_No: "36AAACZ1234E1ZV",
        street: "E Block, Sanath Nagar",
        city: "Hyderabad",
        state: "Telangana",
        postal_code: "500018",
        country: "India",
        medicines: [
          {
            medicine_id: "66e6b3e6bbaa43bc9521c5g2",
            medicine_name: "Hydroxychloroquine",
          },
          {
            medicine_id: "66e6f8e567aa43bc9537e1g3",
            medicine_name: "Remdesivir",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [78.4867, 17.4497],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "3e5f8a9b6d7a12c4b6f3d9a1",
        profile_url: "http://example10.in",
        company_name: "Biocon Limited",
        email: "info@biocon.com",
        phone: "9812234567",
        website: "http://biocon.com",
        GST_No: "29AACCB1234L1ZA",
        street: "Electronics City Phase 1",
        city: "Bengaluru",
        state: "Karnataka",
        postal_code: "560100",
        country: "India",
        medicines: [
          {
            medicine_id: "66e7f3e6bbaa43bc9522c5g4",
            medicine_name: "Insulin Glargine",
          },
          {
            medicine_id: "66e7f8e567aa43bc9539e4g5",
            medicine_name: "Trastuzumab",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [77.6784, 12.8411],
      },
    },
  ],
};

export const mockOrderHistoryData = [
  {
    order_id: "ORD123456",
    date_of_order: "2024-09-13",
    date_of_approval: "2024-09-15",
    medicines: [
      { medicine_id: "66e6b5e7ede0e2126d5a6899", medicine_name: "Paracetamol", quantity: 20 },
      { medicine_id: "66e6b6f645aa43ac9532b1e0", medicine_name: "Ibuprofen", quantity: 15 },
    ],
    status: "Approved", // Status can be Pending, Approved, Return Raised, Return Approved
  },
  {
    order_id: "ORD123457",
    date_of_order: "2024-08-22",
    date_of_approval: "2024-08-24",
    medicines: [
      { medicine_id: "66e6b5e7ede0e2126d5a6899", medicine_name: "Paracetamol", quantity: 10 },
      { medicine_id: "66e6b5e7ede0e2126d5a6721", medicine_name: "Amoxicillin", quantity: 30 },
    ],
    status: "Pending",
  },
  {
    order_id: "ORD123458",
    date_of_order: "2024-08-23",
    date_of_approval: "2024-08-25",
    medicines: [
      { medicine_id: "66e6b6f645aa43ac9532b1e0", medicine_name: "Ibuprofen", quantity: 25 },
      { medicine_id: "66e6b7f123aa45ac9532b2e2", medicine_name: "Aspirin", quantity: 40 },
    ],
    status: "Return Raised",
  },
  {
    order_id: "ORD123459",
    date_of_order: "2024-08-25",
    date_of_approval: "2024-08-27",
    medicines: [
      { medicine_id: "66e6b8f645bc43ac9532b1f3", medicine_name: "Cetirizine", quantity: 50 },
    ],
    status: "Return Approved",
  }
];