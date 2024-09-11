const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

const authController = {};

// Restrict access to root page
authController.home = function(req, res) {
  // res.render("index", { user: req.user });
};

// Go to registration page
authController.register = function(req, res) {
  console.log("authController goto register callback hit");
  res.render("register");
};

// CODE HERE TO DETERMINE IS MANAGER:

// Post registration
authController.doRegister = function(req, res) {
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    isManager: req.body.isManager,
    teamId: req.body.teamId
  });
  User.register(newUser, req.body.password, function(err, username) {
    console.log(newUser);
    if (err) {
      console.error(err);
      return res.json({ username: username });
    }
    console.log("authController doRegister callback hit");
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
};

// Go to login page
authController.login = function(req, res) {
  console.log("authController goto login callback hit");
  res.render("login");
};

// Post login
authController.doLogin = function(req, res) {
  console.log("In authController.doLogin");
  console.log(req.body);
  passport.authenticate("local")(req, res, function() {
    console.log("Login action successful!");
    // console.log(res.req.user._id);
    // console.log(res.req.user.teamId);
    // console.log(res.req.user.isManager);
    res.json(req.user);
  });
};

// logout
authController.logout = function(req, res) {
  req.logout();
  console.log("Logout action successful!");
  res.redirect("/");
};

module.exports = authController;
