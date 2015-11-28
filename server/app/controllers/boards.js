//MODEL DEPENDENCIES
var User = require('./app/models/user');
var Board = require('./app/models/board');
var List = require('./app/models/list');

//GET REQUEST TO -SHOW- :LIST: OF :BOARDS:
exports.showBoards = function (req, res) {
    var board = new Board({_id: req.params.board_id});
    Board.find({}, function (error, boards) {
        if(boards) {
            res.json(boards);
        }else if(error){
            console.log("Error Error Error" + error.stack);
        }
    });
};

//SUBMIT POST REQUEST TO -CREATE- NEW BOARD 
exports.submitBoard = function (req, res) {
    var board = new Board({
        board_name: req.body.board_name
    });
    board.save(function (error, board) {
        if(board) {
           Board.find({}, function (error, boards) { 
                if(boards) {
                    res.json(boards);
                } else if(error) {
                    console.error('Unable To Save' + error.stack);
                }
            });
        }
    });
};


//POST REQUEST TO -UPDATE- :BOARD: BY BOARD_ID
exports.editBoard = function (req, res) {
    var board = {_id: req.params.board_id};
    Board.update(board, {board_name: req.query.board_name}, function (error, board) {
        if(board) {
            Board.find({}, function (error, board) {
                res.json(board);
            });
        } else if(error) {
            console.log(error.stack);
            res.redirect('/error');
        }
    });
};


//POST REQUEST TO -DELETE- :BOARD: BY BOARD_ID
exports.deleteBoard = function (req, res) {
    var board = new Board({_id: req.params.board_id});
    board.remove(function (error, board) {
        if(board) {
            Board.find({}, function (error, boards) {
                if(boards) {
                    res.json(boards);
                }
                else if(error) throw error;
            });
        } else if(error) {
            console.error('Unable To Save' + error.stack);
        }
    });
};