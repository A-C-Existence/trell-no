//:LIST: SCHEMA
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create schema for :list:
var listSchema = new Schema({
  list_name: { type: String, required: true },
  body: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  board_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  created_at: Date,
  updated_at: Date
});

//creates *model* that will use :list: schema
var List = mongoose.model('List', listSchema);

//make available to :user: in node app
module.exports = List;