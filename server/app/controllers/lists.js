//:LIST: //:ITEM: //:BOARD: MODELS
var List = require('./app/models/list');
var Item = require('./app/models/item');
var Board = require('./app/models/item');

//DEPENDENCIES
var bodyParser  = require('body-parser');
    // cookieParser = require('cookieParser');


//get request to show :list: of :lists:
exports.showLists = function (req, res) {
    List.find({board_id: req.query.board_id}, function (error, lists) {
        if(lists) {
            res.json(lists);
        } else if(error) {
            console.log("errorrrrrr" + error.stack);
        }
    });
};

//*submit* *post* request to create :list:
exports.submitList = function (req, res) {
    var list = new List({
        list_name: req.body.list_name,
        board_id: req.body.board_id
    });
    list.save(function (error, list) {
        if(list) {
           List.find({board_id: req.body.board_id}, function (error, lists) {
                if(lists) {
                    res.json(lists);
                }
                else if(error) {
                    console.error('Failed To Save' + error.stack);
                }
            });
        }
    });
};


//*post* request *updates* :list: by list_id
exports.editList = function (req, res) {
    var list = {_id: req.params.list_id};
    List.update(list, {list_name: req.query.list_name}, function (error, updatedList) {
        if(updatedList) {
            List.find({_id: req.params.list_id}, function (error, list) {
                if(list) {
                    res.json(list);
                } else if(error) {
                    console.log(error.stack);
                    res.redirect('/error');
                }
            })
        } else if(error) {
            console.log(error.stack);
            res.redirect('/error');
        }
    });
};


//*post* request *deletes* :list: by list_id
exports.deleteList = function (req, res) {
    var list = new List({_id: req.params.list_id});
    list.remove(function (error, list) {
        if(list) {
            List.find({}, function (error, lists) {
                if (lists) {
                    res.json(lists);
                }
                else if (error) {
                    console.log (error.stack);
                    res.redirect ('/error');
                }
            }) ;
        }
        else if(error){
            console.error('Failed To Save' + error.stack);
        }
    });
};

//KIRK'S EXAMPLE
// var List = require('../models/list');

// exports.index = function (req, res, next) {
//   List.find({}, function(err, lists) {
//     if (lists) {
//       res.json(lists); 
//     } else {
//       res.status(404).json({ message: err.message });
//     }
//   });
// };

// exports.create = function(req, res, next) {
//   list = List.create({
//     body: req.body.body,
//     user_id: req.body.user_id,
//     list_id: req.body.list_id
//   }, function(err, newList) {
//     if (newList) {
//       res.json(newList);
//     } else {
//        res.status(422).json({ message: err.message });
//     }
//   });
// };