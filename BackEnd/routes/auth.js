const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_secret = "Citsc@178";
const fetchUser = require("../Middleware/fetchuser")


// Create a user by: POST "/api/auth/createuser". No need of login
router.post("/createuser", async (req, res) => {
  try {
    success = false;
    let user = await User.findOne({ email: req.body.email });     // checking whether any user exists in the mongo database with this email or not
    if (user) {
      return res.status(400).json({ success, error: "Sorry a User with this email already exists." })
    }
    user = await User(req.body);
    user.save();      // save user's information in mongodb

    // selecting user from user's id present in MongoDB because user id is unique for every user
    const data = {
      user: {
        id: user.id
      }
    }
    // generating token 
    const auto_token = jwt.sign(data, JWT_secret);
    success = true;
    res.status(201).json({ success, auto_token });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


// login by: POST "/api/auth/login". 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;   // destructuring email and password from req.body

  try {
    success = false;
    let user = await User.findOne({ email });     // checking whether any user exists in the mongo database with this email or not
    if (!user) {
      return res.status(400).json({ success, error: "Please try to login with correct email id and password." })
    }

    const ComparePassword = await bcrypt.compare(password, user.password); // comaparing the hash of entered password and store password. 

    if (!ComparePassword) {
      return res.status(401).json({ success, error: "Please try to login with correct email and password." });
    }
    const data = {
      user: {
        id: user.id
      }
    }

    const auto_token = jwt.sign(data, JWT_secret);
    success = true;
    res.status(200).json({ success, auto_token });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Get user's data by: GET "/api/auth/getUserData". login required
// fetchuser is a middleware that verified the token and get the user's id from token
router.get("/getUserData", fetchUser, async (req, res) => {
  try {
    success = false;
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    success = true;
    res.status(200).json({ success, user });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports = router; 