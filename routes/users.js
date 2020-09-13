const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const users = await User.find().sort("firstName");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ employeeId: req.body.employeeId });
  if (user) return res.status(400).send("User already exists.");

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    employeeId: req.body.employeeId,
  });

  console.log(user);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

module.exports = router;
