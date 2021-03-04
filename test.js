var _ = require("lodash");
//state
var a = [{ id: 20 }, { id: 15 }, { id: 10 }, { id: 17 }, { id: 23 }];
//payload
var b = [{ id: 90 }, { id: 15 }, { id: 17 }, { id: 23 }];

const x = _.differenceBy(b, a, "id");
console.log("add", x);
const y = _.differenceBy(a, b, "id");
console.log("remove", y);
// let arr1 = [1, 2, 3];
// let arr2 = [2, 3, 5];

// let difference = arr1.filter((x) => !arr2.includes(x));
// console.log("delete ", difference);
// let add = arr2.filter((x) => !arr1.includes(x));
// console.log("add", add);
