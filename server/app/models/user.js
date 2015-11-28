//:USER: SCHEMA
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creates a schema for :user:
var userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  initials: { type: String, required: true},
  bio: { type: String},
  creator: {type: Boolean},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  created_at: Date,
  updated_at: Date
});

//creates model that will use :user: schema
var User = mongoose.model('User', userSchema);

//make this available to :user: in node app
module.exports = User;