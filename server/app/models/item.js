//:ITEM: SCHEMA
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creates schema for :item:
var itemSchema = new Schema({
  body: { type: String, required: true },
  item_name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  list_id: { type: mongoose.Schema.Types.ObjectId, ref:'List', required: true },
  created_at: Date,
  updated_at: Date
});

//creates *model* that will use :item: schema
var Item = mongoose.model('Item', itemSchema);

//make available to :user: in node app
module.exports = Item;