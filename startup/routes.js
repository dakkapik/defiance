module.exports = function (app) {
  const express = require("express");
  const orders = require("../routes/orders");
  const users = require("../routes/users");
  const ocr = require("../routes/ocr");
  const error = require("../middleware/error");

  app.use(express.json());
  app.use("/api/ocr", ocr)
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use(error);
};
