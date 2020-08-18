module.exports = function (app) {
  const express = require("express");
  const orders = require("../routes/orders");
  const error = require("../middleware/error");

  app.use(express.json());
  app.use("/api/orders", orders);
  app.use(error);
};
