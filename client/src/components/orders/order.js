const Orderdata = [
  {
    _id: {
      $oid: "5fe36229a00b6286d0a20673",
    },
    status: "unassigned",
    orderNumber: 270,
    date: "10/07",
    time: "05:41pm",
    firstName: "KATHY",
    lastName: "na",
    phoneNumber: "(954) 599-4250",
    address: "6708 NW 22ND",
    city: "MARGATE",
    zip: "33073",
    __v: 0,
  },
  {
    _id: {
      $oid: "5fe3623fa00b6286d0a20674",
    },
    status: "unassigned",
    orderNumber: 272,
    date: "10/07",
    time: "05:43pm",
    firstName: "na",
    lastName: "KARA",
    phoneNumber: "(954) 422-7494",
    address: "6153 NW 41ST DRIVE",
    city: "Coral Springs",
    zip: "33067",
    __v: 0,
  },
  {
    _id: {
      $oid: "5fe36251a00b6286d0a20675",
    },
    status: "unassigned",
    orderNumber: 273,
    date: "10/07",
    time: "05:44pm",
    firstName: "LUIS",
    lastName: "LUIS",
    phoneNumber: "(240) 813-5918",
    address: "4691 NW 66TH DRIVE",
    city: "CORAL SPRINGS",
    zip: "33073",
    __v: 0,
  },
];

let ParseOrders = {
  Orders: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Orders",
      OrderIds: [],
    },
  },
  columnOrder: [],
};

console.log(ParseOrders);

// Orderdata.map((e, i) => console.log(e));

export default Orderdata;
