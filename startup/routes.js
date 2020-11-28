const path = require('path')

module.exports = function (app) {
  const express = require("express");
  const index = require('../api/index')
  const orders = require("../API/orders");
  const users = require("../API/users");
  // const directions = require('../API/directions');
  const react = require('../API/react')
  const stores = require('../API/stores')
  const error = require("../middleware/error");
  
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(express.static(path.join(__dirname, '../public')))
  
  app.use(express.json());
  
  app.use(express.urlencoded({ extended: true }))
  
  
  app.use("/", index)
  app.use("/api/stores", stores);
  app.use("/api/react", react);
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  // app.use("/api/directions", directions);
  app.use(error);

  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  });
  // react static view ^
};
