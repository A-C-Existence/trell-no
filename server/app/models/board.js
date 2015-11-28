//:BOARD: SCHEMA
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creates :board: schema
var boardSchema = new Schema({
  board_name: { type: String, required: true },
  board_description: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  list_id: [{ type: mongoose.Schema.Types.ObjectId, ref:'List', required: true }],
  created_at: Date,
  updated_at: Date
});

//creates *model* that will use :board: schema 
var Board = mongoose.model('Board', boardSchema);

//makes this available to :user: in node app
module.exports = Board;