dragdrop = [
    { } 
 ]
 
 //Drag drop orders should be with their mongodbId
 
 
 
 // 1st
 client.on('order-new')
 
 let Ordernew = { orderNumber: 1, status:"unassigned" }
 
 dragdrop = [{ orders: [{status: "unassigned", orderNumber:1}] } ]
 
 
 //2nd
 
  // Triggers anytime it wants to 
  // it will only update status 
  // unassigned status does nothing lol
  // completed  status deletes the order from the ui
  // onroute    status updates text
 client.on('order-update')
 
 //When manager sends 
 client.emit('order-bundles')
 
 // it will trigger 
 client.on('order-updates')
 
 //find by MONGODBID
 
 let updateOrder = { _id: ObjectId('mongoId'), update: { status: "on_route" } }
 
 // Bery important status can be "on_route" or "completed" or 
 // "unassigned" <= default 
 dragdrop = [
     dragdrop = [{ status:"" , orders: [{status: "on_route", orderNumber:1}] } ]
 ]
 
 //3rd 
 
 // deletes it from the ui  
 client.on("order-delete")
 
 // server gives 
 //find by MONGODBID
 
 deleteOrder = { _id: ObjectId('mongoId')}
 
 
 
 dragdrop = [
     dragdrop = [{ status:"" , orders: []}] } ]
 ]