const express = require("express");
const router = express.Router();
const { validateOrder, validateOrderStatus, Order } = require("../models/order");
// const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");

router.get('/', async(req, res)=>{
  const orders = await Order.find().sort('orderNumber')
  res.status(200).send(orders)
  //get all orders
})

// router.get('/:orderNumber', async(req, res)=>{
//   const order = await Order.findOne({orderNumber: req.params.orderNumber})
//   if(!order) return res.status(404).send({message: 'order not found'})
//   res.status(200).send(order)
//   //get order by order number
// })

router.get('/date/:month/:day/:year', async(req, res)=>{
  const orders = await Order.find({date: `${req.params.month}/${req.params.day}/${req.params.year}`});
  if(!orders) return res.status(404).send({message: 'no orders found on: ' + `${req.params.month}/${req.params.day}/${req.params.year}`});
  res.status(200).send(orders);
  // send all orders on this date
});

router.get('/today', async(req, res)=>{
  const order = await Order.find({date: moment().format("MM/DD/YYYY")})
  if(!order) return res.status(404).send({message: 'no orders found this day'})
  res.status(200).send(order)
  // send daily orders
});

router.get('/today/:orderNumber', async(req, res)=>{
  const order = await Order.findOne({orderNumber: req.params.orderNumber , date: moment().format("MM/DD/YYYY")});
  if(!order) return res.status(404).send({message: 'order not found'});
  res.status(200).send(order);
  // send daily orders
});

router.put('/today/updateStatus/:orderNumber', async(req, res)=>{

  if(!req.body.status) return res.status(400).send("status request not found");
  const { error } = validateOrderStatus(req.body.status)
  if(error) return res.status(422).send("cannot use status: " + req.body.status)
  
  try{
    const order = await Order.findOne({orderNumber: req.params.orderNumber, date: moment().format("MM/DD/YYYY")})
    
    const result = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          status: req.body.status
        }
      },
    );
    res.status(200).send(result)
  } catch (err){
    res.status(404).send(err)
  }
  //update status by order number
});

router.post('/', async(req, res)=>{
  const { error } = validateOrder(req.body)
  if(error) return res.status(400).send(`${error.details[0].message}`)

  let order = await Order.findOne({ orderNumber: req.body.orderNumber})
  if (order) return res.status(400).send(`order ${req.body.orderNumber} already exist`)

  order = new Order({
    orderNumber: req.body.orderNumber,
    date: req.body.date,
    time: req.body.time,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    marker: req.body.marker,
  })

  const result = await order.save();

  res.status(200).send(result)
  //post an order? maybe useless here
})

router.put('/:orderNumber', async(req, res)=>{
  const { error } = validateOrder(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  try{
    const order = await Order.findOne({orderNumber: req.params.orderNumber})

    const result = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          orderNumber: req.body.orderNumber,
          driver: req.body.driver,
          date: req.body.date,
          time: req.body.time,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          city: req.body.city,
          zip: req.body.zip,
          marker: req.body.marker,
        }
      },
      {new: true}
    );
    res.status(200).send(result)
  } catch (err){
    res.status(404).send('order number not found')
  }
  //updata an order by order number
})

router.put('/setMaker/:orderNumber', async(req, res)=>{
  //create it's own API
  try{
    const order = await Order.findOne({orderNumber: req.params.orderNumber})

    const result = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          marker: req.body.marker,
        }
      },
      {new: true}
    );
    res.status(200).send(result)
  } catch (err){
    res.status(404).send(err)
  }
  //set market and bind to phone later, to make order easier, send marker on request body
})

router.put('/updateStatus/:orderNumber', async(req, res)=>{
  if(!req.body.status) return res.status(400).send("status request not found");

  const { error } = validateOrderStatus(req.body.status);
  if(error) return res.status(422).send("cannot use status: " + req.body.status);
  
  try{
    const order = await Order.findOne({orderNumber: req.params.orderNumber})

    const result = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          status: req.body.status
        }
      }
    );
    res.status(200).send(result);

  } catch (err){
    res.status(404).send(err)
  }
  //update status by order number
});

router.put('/updateDriver/:orderNumber', async(req, res)=>{
  try{
    const order = await Order.findOne({orderNumber: req.params.orderNumber})

    if(req.body.status){
      const result = await Order.findByIdAndUpdate(
        order._id,
        {
          $set: {
            driver: req.body.driver
          }
        },
        {new: true}
      );
    }

    res.status(200).send(result)
  } catch (err){
    res.status(404).send(err)
  }
  //update driver by order number
})

router.delete("/today", (req, res) => {
  Order.deleteMany({date: moment().format("MM/DD/YYYY")})
  .then(orders => res.status(200).send({deleted: orders}))
  .catch(err => res.status(404).send(err))
})

// router.delete('/:orderNumber', async(req, res)=>{
//   try{
//     const order = await Order.findOne({orderNumber: req.params.orderNumber});
//     if(!order) return res.status(404).send('order number not found')

//     const result = await Order.findByIdAndRemove(order._id)
//     res.status(200).send({deleted: result})
//   }catch(err){
//     res.status(404).send(err)
//   }
//   //delete order by order number
// })



module.exports = router;
