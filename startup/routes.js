module.exports = function (app) {
  const express = require("express");
  const orders = require("../API/orders");
  const users = require("../API/users");
  const directions = require('../API/directions');
  const error = require("../middleware/error");

  app.set('view engine','ejs');
  app.use(express.json());
  app.use(express.static('./views/public'));
  app.use(express.urlencoded({ extended: true }))

  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use("/api/directions", directions);
  app.use(error);
};
