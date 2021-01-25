const path = require('path')

module.exports = function (app) {
  const express = require("express");
  const orders = require("../API/orders");
  const users = require("../API/users");
  const react = require('../API/react');
  const stores = require('../API/stores');
  const directions = require("../API/directions")
  const places = require("../API/places")
  const error = require("../middleware/error");
  
  //this is main
  app.use(express.static(path.join(__dirname, '../client/build')));
  // app.use(express.static(path.join(__dirname, '../public')))
  
  app.use(express.json());
  
  app.use(express.urlencoded({ extended: true }));
  
  app.use("/api/stores", stores);
  app.use("/api/react", react);
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use("/api/directions", directions);
  app.use("/api/places", places);
  app.use(error);
  
  //this is if invalid params send react static view
  // app.get('*', (req, res)=>{
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'))
  // });
};
