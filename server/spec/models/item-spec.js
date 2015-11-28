var mongoose = require('mongoose');
var Item = require('./app/models/item'),
    List = require('./app/models/list'),
    User = require('./app/models/user');

beforeEach(function() {
  mongoose.connect('mongodb://localhost/mytodo');
});

afterEach(function(done) {
  mongoose.disconnect(done);
});

describe ('Item', function() {
  describe('without data', function() {

    it('should return an empty item', function(done) {
      Item.find({}, function(err, items) {
        if (err) {
          done.fail(err);
        } else {
          expect(items).toEqual([]);
          done();
        }
      });
    });

    it('should not create an Item', function(done) {
      Item.create({
        body: 'Test creating an Item'
      }, function(err, newItem) {
        expect(err).toBeDefined();
        expect(newItem).toBeUndefined();
        done();
      });
    });

  });

  describe('with a user', function() {
    var user, list;

    beforeEach(function(done) {
      User.create({
        name: 'IAmUser',
        email: 'testuser@gmail.com',
        password: '123456'
      }, function(err, newUser) {
        user = newUser;

        Item.create({
          body: 'Test Item',
          user_id: user._id
        }, function(err, newItem) {
          list = newList;
          done();
        });
      });
    });

    afterEach(function(done) {
      Item.remove({ _id: list._id }, function(err, removedList) {
        User.remove({ _id: user._id }, function(err, removedUser) {
          done();
        });
      });
    });

    it('should create an item', function(done) {
      Item.create({
        body: 'Test creating an item',
        user_id: user._id,
        list_id: list._id
      }, function(err, newItem) {
        expect(err).toBeNull();
        expect(newItem._id).toBeDefined();
        newTodo.remove();
        done();
      });
    });

  });
});