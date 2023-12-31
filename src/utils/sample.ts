export type EventProps = {
  id: string;
  name: string;
  type: string;
  created: string;
  duration: number;
  lastUpdated: string;
  count: number;
  description: string
  image:string
};

export const certificateSample:CertificatesProp[] = [
  {
    certificateID: "34534543254",
    name: "Harman Singh",
    userID: "21105003",
    grade: "Excellent",
    created: 1637000000,
    expiration: 1668536000,
    eventID: "0F13",
    status:"active"
  },
  {
    certificateID: "987654321",
    name: "Alice Johnson",
    userID: "12345678",
    grade: "Good",
    created: 1636000000,
    expiration: 1668000000,
    eventID: "1A23",
    status:"revoked"
  },
  {
    certificateID: "1234567890",
    name: "Bob Smith",
    userID: "87654321",
    grade: "Excellent",
    created: 1635000000,
    expiration: 1667000000,
    eventID: "2B34",
    status:"active"
  },
  {
    certificateID: "5678901234",
    name: "Eva Davis",
    userID: "55555555",
    grade: "Good",
    created: 1634000000,
    expiration: 1666000000,
    eventID: "3C45",
    status:"active"
  },
  {
    certificateID: "1111222233",
    name: "Chris Miller",
    userID: "99999999",
    grade: "Excellent",
    created: 1633000000,
    expiration: 1665000000,
    eventID: "4D56",
    status:"revoked"
  },
  {
    certificateID: "4444555566",
    name: "Sophie Brown",
    userID: "44444444",
    grade: "Good",
    created: 1632000000,
    expiration: 1664000000,
    eventID: "5E67",
    status:"active"
  },
  {
    certificateID: "7777888899",
    name: "Daniel White",
    userID: "33333333",
    grade: "Excellent",
    created: 1631000000,
    expiration: 1663000000,
    eventID: "6F78",
    status:"active"
  },
  {
    certificateID: "9999000011",
    name: "Olivia Taylor",
    userID: "66666666",
    grade: "Good",
    created: 1630000000,
    expiration: 1662000000,
    eventID: "7G89",
    status:"active"
  },
  {
    certificateID: "1212121212",
    name: "Liam Wilson",
    userID: "77777777",
    grade: "Excellent",
    created: 1629000000,
    expiration: 1661000000,
    eventID: "8H90",
    status:"active"
  },
  {
    certificateID: "3434343434",
    name: "Emma Johnson",
    userID: "88888888",
    grade: "Good",
    created: 1628000000,
    expiration: 1660000000,
    eventID: "9I01",
    status:"active"
  },
  {
    certificateID: "5656565656",
    name: "Jackson Davis",
    userID: "11111111",
    grade: "Excellent",
    created: 1627000000,
    expiration: 1659000000,
    eventID: "0J12",
    status:"active"
  },
  {
    certificateID: "7878787878",
    name: "Ava Martinez",
    userID: "22222222",
    grade: "Good",
    created: 1626000000,
    expiration: 1658000000,
    eventID: "1K23",
    status:"active"
  },
  {
    certificateID: "0101010101",
    name: "Noah Garcia",
    userID: "33333333",
    grade: "Excellent",
    created: 1625000000,
    expiration: 1657000000,
    eventID: "2L34",
    status:"active"
  },
  {
    certificateID: "2323232323",
    name: "Isabella Robinson",
    userID: "44444444",
    grade: "Good",
    created: 1624000000,
    expiration: 1656000000,
    eventID: "3M45",
    status:"active"
  },
  {
    certificateID: "4545454545",
    name: "Lucas Smith",
    userID: "55555555",
    grade: "Excellent",
    created: 1623000000,
    expiration: 1655000000,
    eventID: "4N56",
    status:"active"
  },
  {
    certificateID: "6767676767",
    name: "Mia Wilson",
    userID: "66666666",
    grade: "Good",
    created: 1622000000,
    expiration: 1654000000,
    eventID: "5O67",
    status:"active"
  },
  {
    certificateID: "8989898989",
    name: "Ethan Brown",
    userID: "77777777",
    grade: "Excellent",
    created: 1621000000,
    expiration: 1653000000,
    eventID: "6P78",
    status:"active"
  },
  {
    certificateID: "1212121212",
    name: "Lily Taylor",
    userID: "88888888",
    grade: "Good",
    created: 1620000000,
    expiration: 1652000000,
    eventID: "7Q89",
    status:"active"
  },
  {
    certificateID: "3434343434",
    name: "Logan Wilson",
    userID: "99999999",
    grade: "Excellent",
    created: 1619000000,
    expiration: 1651000000,
    eventID: "8R90",
    status:"active"
  },
  {
    certificateID: "5656565656",
    name: "Chloe Robinson",
    userID: "12345678",
    grade: "Good",
    created: 1618000000,
    expiration: 1650000000,
    eventID: "9S01",
    status:"active"
  },
];

export type CertificatesProp = {
  certificateID: string;
  name: string;
  userID: string;
  grade: string;
  created: number;
  expiration: number;
  eventID: string;
  status: "active" | "revoked";
};





