//MODEL DEPENDENCIES
var User = require('./app/models/user');
var Board = require('./app/models/board');
var List = require('./app/models/list');
var Item = require('./app/models/item');

//ENCRYPTION DEPENDENCIES
var AuthenticationMiddleware = require('../authentication_middleware'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs');

//POST REQUEST TO -CREATE- A NEW :USER:
exports.register = function (req, res) {
    var hash = bcrypt.hashSync(req.body.password);
    var salt = bcrypt.genSaltSync(10);

    var user = new User({
        initials: req.body.initials,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        // creator: 
        bio: req.body.bio
    });
    user.save(function (error, newUser) {
        if (newUser) {
            res.status(200).json(newUser);
        } else if(error) {
            console.error('Failed @ creating new user' + error.stack);
            res.status(422).json({message: error.message});
        }
    });
};

//POST REQUEST -UPDATE- :USER: by USER_ID
exports.editUser = function(req, res){
    var hash = bcrypt.hashSync(req.body.password);
    var user = {_id: req.params.user_id};
    User.update(user, {
        initials: req.body.initials,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        bio: req.body.bio
        // creator: 
    },
    function (error, updatedUser) {
        if(updatedUser) {
            res.status(200).json(updatedUser);
        }else if(error){
            console.error('Failed @ updating user' + error.stack);
            res.status(422).json({message: error.message});
        }
    });
};

//POST REQUEST TO -DELETE- :USER: by USER_ID
exports.deleteUser = function(req, res) {
    var user = new User({_id: req.params.user_id});
    user.remove(function (error, user) {
        if(user) {
            User.find({}, function (error, diffUsers) {
                if(diffUsers) {
                    res.status(200).json(diffUsers);
                } else {
                    console.error('Failed @ user deletion' + error.stack);
                    res.status(422).json({message: error.message});
                }
            });
        } else if(error) {
            console.error('Failed @ user deletion' + error.stack);
            res.status(422).json({message: error.message});
        }
    });
};


//KIRK'S EXAMPLE FOR REFERENCE--
// var User = require('../models/user');

// exports.index = function (req, res, next) {
//   User.find({}, function(err, users) {
//     if (users) {
//       res.json(users); 
//     } else {
//       res.status(404).json({ message: err.message });
//     }
//   });
// };

// exports.create = function(req, res, next) {
//   user = User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }, function(err, newUser) {
//     if (newUser) {
//       res.json(newUser);
//     } else {
//        res.status(422).json({ message: err.message });
//     }
//   });
// };

