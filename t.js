let apiorders = [
  { orderNumber: 82 },
  { orderNumber: 83 },
  { orderNumber: 84 },
  { orderNumber: 85 },
];

let displayNumber = [];
let parseData = [];
for (const i in apiorders) {
  if (!displayNumber.includes(apiorders[i].orderNumber)) {
    parseData.push(apiorders[i].orderNumber);
  }
}
console.log(parseData);
