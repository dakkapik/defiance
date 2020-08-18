const express = require("express");
const router = express.Router();
const { validateOrder, Order } = require("../models/order");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const orders = await Order.find().select();
  res.send(orders);
});

router.post("/", async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    orderNumber: parseInt(req.body.orderNumber),
  });

  await order.save();
  res.send(order);
});

//use put to fix wrong orders on the fly
router.delete("/:id", validateObjectId, async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  res.send(`order ${order.orderNumber} has been deleted`);
});

module.exports = router;
