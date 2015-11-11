var express = require('express'),
    app = express(),
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    router = express.Router();

//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytodo');

//Models
// var Item = require('./app/models/item');

//Controllers
var ItemsController = require('./app/controllers/items');

//Dependendies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
    extended: true
}));

//--------------ROUTES--------------
//show items list
app.get('/api/items', ItemsController.list);

//create items
// app.get('/api/items/create', ItemsController.createItem);
app.post('/api/items/create', ItemsController.submitItem);

//delete an item
app.post('api/items/delete/:id', ItemsController.deleteItem);

//edit
app.post('api/items/edit/:id', ItemsController.editItem);



//Port
app.listen(3000);
console.log("App is listening on port 3000, and it's app's birthday!");