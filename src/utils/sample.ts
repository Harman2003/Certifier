 const data: EventProps[] = [
   {
     id: "m5gr84i9",
     amount: 316,
     eventid: "1234",
     name: "Cycling Competition",
     type: "Sports",
     created: 1682160000000,
     duration: 1799713890,
     lastUpdated: 1683360795104,
     count: 10,
   },
   {
     id: "3u1reuv4",
     amount: 242,
     eventid: "2249",
     name: "FastestFrontend",
     type: "Educational",
     created: 1682695603457,
     duration: 1799713890,
     lastUpdated: 1684753003149,
     count: 60,
   },
   {
     id: "derv1ws0",
     amount: 837,
     eventid: "6553",
     name: "Bowling Champ",
     type: "Workshop",
     created: 1686438337361,
     duration: 1799713890,
     lastUpdated: 1686661183407,
     count: 110,
   },
   {
     id: "5kma53ae",
     amount: 874,
     eventid: "4322",
     name: "Intro To OOPs",
     type: "Competition",
     created: 1683998765472,
     duration: 1799713890,
     lastUpdated: 1684916648470,
     count: 33,
   },
   {
     id: "bhqecj4p",
     amount: 721,
     eventid: "3211",
     name: "Industrial Training",
     type: "Training",
     created: 1685109381712,
     duration: 1799713890,
     lastUpdated: 1687201981712,
     count: 120,
   },
   {
     id: "3abcvd6i",
     amount: 731,
     eventid: "5721",
     name: "Marathon",
     type: "Sports",
     created: 1683144800000,
     duration: 1799713890,
     lastUpdated: 1687080193977,
     count: 95,
   },
   {
     id: "p1werzt7",
     amount: 423,
     eventid: "8775",
     name: "Coding Workshop",
     type: "Workshop",
     created: 1685970245777,
     duration: 1799713890,
     lastUpdated: 1687181394660,
     count: 10,
   },
   {
     id: "s4f56z1x",
     amount: 598,
     eventid: "9462",
     name: "Math Olympiad",
     type: "Competition",
     created: 1683531263926,
     duration: 1799713890,
     lastUpdated: 1687114709661,
     count: 10,
   },
   {
     id: "j8csd9at",
     amount: 189,
     eventid: "5124",
     name: "Art Exhibition",
     type: "Educational",
     created: 1685086500140,
     duration: 1799713890,
     lastUpdated: 1687185019746,
     count: 10,
   },
   {
     id: "n2v34qer",
     amount: 589,
     eventid: "1938",
     name: "Basketball Tournament",
     type: "Sports",
     created: 1683850974749,
     duration: 1687935827255,
     lastUpdated: 1687519044933,
     count: 10,
   },
   {
     id: "m5c6rvh7",
     amount: 123,
     eventid: "6925",
     name: "Web Development Workshop",
     type: "Workshop",
     created: 1683677801484,
     duration: 1687808089740,
     lastUpdated: 1687541094111,
     count: 10,
   },
   {
     id: "a4czd1ep",
     amount: 355,
     eventid: "4326",
     name: "Science Fair",
     type: "Educational",
     created: 1684690559714,
     duration: 1687492960353,
     lastUpdated: 1687048401466,
     count: 10,
   },
   {
     id: "p3werfd1",
     amount: 456,
     eventid: "9913",
     name: "Chess Championship",
     type: "Competition",
     created: 1685766849421,
     duration: 1689056939059,
     lastUpdated: 1687282601625,
     count: 10,
   },
   {
     id: "s2weras7",
     amount: 653,
     eventid: "2678",
     name: "Programming Contest",
     type: "Competition",
     created: 1684911400000,
     duration: 1689101549353,
     lastUpdated: 1688370327669,
     count: 10,
   },
   {
     id: "d8cvfgh3",
     amount: 579,
     eventid: "7521",
     name: "Photography Workshop",
     type: "Workshop",
     created: 1685219854637,
     duration: 1688351036081,
     lastUpdated: 1688148767201,
     count: 10,
   },
   {
     id: "q7werzv2",
     amount: 862,
     eventid: "1235",
     name: "Hackathon",
     type: "Competition",
     created: 1683475200000,
     duration: 1686562824154,
     lastUpdated: 1686871859867,
     count: 10,
   },
   {
     id: "h5werjk9",
     amount: 397,
     eventid: "5678",
     name: "Dance Performance",
     type: "Arts",
     created: 1684371300000,
     duration: 1686521764070,
     lastUpdated: 1687398990837,
     count: 10,
   },
 ];
export type EventProps = {
  id: string;
  amount: number;
  eventid: string;
  name: string;
  type: string;
  created: number;
  duration: number;
  lastUpdated: number;
  count: number;
};
export default data;

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





