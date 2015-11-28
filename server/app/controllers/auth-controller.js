var app = require('./app'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

//MODEL DEPENDENCIES
var User = require('./app/models/user'),
    Board = require('./app/models/board');


exports.authenticate = function (req, res){
    //FIND SPECIFIC USER
    User.findOne({
        email: req.body.email
    }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(200).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      //CHECK FOR PASSWORD MATCH
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({ success: false, message: 'Authentication failed. Password is incorrect.' });
      } else {

        //IF USER FOUND + PASSWORDS MATCH THEN CREATE TOKEN
        var token = jwt.sign(user, app.app.get('superSecret'), {
          expires: 1440*60 // expires in 24 hours
        });
        
        //RETURN WITH JSON TOKEN
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
};


//KIRK'S EXAMPLE CODE
// var jwt = require('jsonwebtoken'),
//     User = require('../models/user'),
//     app = require('../../app');

// exports.authenticate = function(req, res) {

//   // find the user
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {

//     if (err) throw err;

//     if (!user) {
//       res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {

//       // check if password matches
//       if (user.password != req.body.password) {
//         res.status(401).json({ success: false, message: 'Authentication failed.' });
//       } else {

//         // if user is found and password is right
//         // create a token
//         var token = jwt.sign(user, app.settings.superSecret, {
//           expiresIn: 86400 // expires in 24 hours (seconds)
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
//       }   

//     }

//   });
// };