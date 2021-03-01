 // in socket.utlis
 /*
      client register => Name, lastname, 
      client login => i generate a jwt token, only userID => 
      andrija will have a userID
      */

      /*

      id: userId? number
      role: "manager", // if he got to this point he's a manger
      store: storenumber number  

      */


//some feature

/*

DND OBJECT(_ID)

when manager clicks a store
client will get 
orderRoute: { driver: 3533, route: [{orderNumber: 1},{orderNumber: 2},{orderNumber: 3}]}




*/



const { Order } = require("../models/order");

module.exports = async function (io) {
  /*
  For documentation on .watch() method go here
  https://mongoosejs.com/docs/api.html#connection_Connection-watch
  */
  const checkIfOrdersChanged = Order.watch();

  const users = {};
  const rooms = {};

  checkIfOrdersChanged.on("change", async (res) => {
    console.log("Collection changed", res);

    /*
    
      client register => Name, lastname, 
      client login => i generate a jwt token, only userID => 
      andrija will have a userID
      */

      /*

      id: userId? number
      role: "manager", // if he got to this point he's a manger
      store: storenumber number  

    */



    /* 
    **** 
    (*Important* Royal Palms not found bug I commited a working version in def-66 branch )

     Task 1: /api/orders/royalPalms  <- not created yet.... nor coconut nor the others...

    You don't have to send me all the order 
    the client can just do /api/orders/royalPalms  <- not created yet....
    on inital load
     ***
    */
     // FOR ORDERS COLUMN ONLY
    /*
    Task 2: 

     If status changed   emit 1 object (for deletion)
      
     Write MONGO QUERY GOES HERE ...
     const status_changed = await Order.findOne({ status: "completed" });
    
     Write socket code here
     io.emit("delete-order", status_changed);

    */

    /*
    Task 3:

    If the order was added  emit 1 object (for adding)

    MONGO QUERY GOES HERE ...

    Write socket code here
    io.emit("add-order", status_changed);
    */
       
       
     /*

     when i drag order to new user

     socket.emit('update-order' OrderRoute: { driver: 3533, route: [{orderNumber: 1},{orderNumber: 2},{orderNumber: 3}]})
     



      {status: 0}        {status: 1}      {status: 2}
     |standingby(green), returning(red), onRoute(yellow)|

      
      
      
      // would be in the database
      
     driver database

     4545: {

     orders:[{orders:50,status:unassigned},{order:101, status:unassigned}]

     }





     */
  });


