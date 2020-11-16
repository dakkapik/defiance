path = require('path')

module.exports = function (app) {
  const express = require("express");
  const orders = require("../API/orders");
  const users = require("../API/users");
  const directions = require('../API/directions');
  const react = require('../API/react')
  const stores = require('../API/stores')
  const error = require("../middleware/error");
  
  // app.set('view engine','ejs');
  app.use(express.json());

  app.use(express.static(path.join(__dirname, '../../', 'build')))

  app.use(express.static('./public'));
  
  app.use(express.urlencoded({ extended: true }))

  app.use("/api/stores", stores);
  app.use("/api/react", react);
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use("/api/directions", directions);
  app.use(error);
};
