const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

//GET route for profile
router.get('/profile', function(req, res, next){ 
  if(! req.session.userId) {
    let err = new Error (" You are not authorized to view this page. Please Sign In.");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
  .exec(function(error, user){
    if(error) {
      return next(error);
    } else {
      return res.render('profile', { title : 'Profile', name : user.name });
    }
  });
});

// Log Out logic
router.get('logout', function(req, res, next) {
  
});


//login route
router.get('/signin', function(req, res, next) {
  return res.render('signin', {title : 'Sign In'});
});

//login route and checking existance in database
router.post('/signin', function(req, res, next) {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user){
        let err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id; //express creating cookies for us 
        return res.render('profile');
      }
    });
    
  } else {
      let err = new Error('email and password is required');
      err.status = 401;
      return next(err);
  }
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email && req.body.name && req.body.password && req.body.confirmPassword) {
      // confirm that user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        let err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      let userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      };

      // use create method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          //req.session.userId = user._id; //express creating cookies for us and keeps new users signed in
          return res.render('profile');
        }
      });
      
    } else {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});



// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});


module.exports = router;