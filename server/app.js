var express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcryptjs'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

//MONGODB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytodo');

//SETS SECRET VARIABLE 
app.set('superSecret', 'thisismysuperdupertopsecret');

//MODELS
var User = require('./app/models/user');
// var Item = require('./app/models/item');
// var List = require('./app/models/list');
// var Board = require('./app/models/board');


//CONTROLLERS
var UsersController = require('./app/controllers/users');
var BoardsController = require('./app/controllers/boards');
var ListsController = require('./app/controllers/lists');
var ItemsController = require('./app/controllers/items');
var AuthenticationController = require('./app/controllers/authentication');

//REQUIRE AUTHENTICATION MIDDLEWARE
var AuthenticationMiddleware = require('./app/authentication_middleware');


//DEPENDENCIES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));


//on routes including /api, apply authentication middleware
app.use('/api', AuthenticationMiddleware.isAuthenticated);


//USER ROUTES
//authenticate on login
app.post('/api/login', AuthenticationController.authenticate);
//create new user account
app.post('/api/user/register', UsersController.register);
//delete a user
app.post('/api/user/delete/:user_id', UsersController.deleteUser);
// update a user
app.post('/api/user/edit/:user_id', UsersController.editUser);

//ITEM ROUTES
//show items
app.get('/api/items', ItemsController.showItems);
//create an item
app.post('/api/item/create', ItemsController.submitItem);
//delete an item
app.post('/api/item/delete/:item_id', ItemsController.deleteItem);
//update an item
app.post('/api/item/edit/:item_id', ItemsController.editItem);

//LIST ROUTES
//show lists
app.get('/api/lists', ListsController.showLists);
//create a list
app.post('/api/list/create', ListsController.submitList);
//delete a list
app.post('/api/list/delete/:list_id', ListsController.deleteList);
//update a list
app.post('/api/list/edit/:list_id', ListsController.editList);;


//BOARD ROUTES
//show boards
app.get('/api/boards', BoardsController.showBoards);
//create a board
app.post('/api/board/create', BoardsController.submitBoard);
//delete a board
app.post('/api/board/delete/:board_id', BoardsController.deleteBoard);
//update a board
app.post('/api/board/edit/:board_id', BoardsController.editBoard);


//port
app.listen(3000);
console.log('listening on port 3000');
exports.app = app;
