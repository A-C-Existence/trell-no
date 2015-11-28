var mongoose = require('mongoose');
var List = require('./app/models/list'),
    User = require('./app/models/user');

beforeEach(function() {
  mongoose.connect('mongodb://localhost/mytodo');
});

afterEach(function(done) {
  mongoose.disconnect(done);
});

describe ('List', function() {
  describe('without data', function() {

    it('should return an empty list', function(done) {
      List.find({}, function(err, lists) {
        if (err) {
          done.fail(err);
        } else {
          expect(lists).toEqual([]);
          done();
        }
      });
    });

    it('should not create an List', function(done) {
      List.create({
        body: 'Test creating a list'
      }, function(err, newList) {
        expect(err).toBeDefined();
        expect(newList).toBeUndefined();
        done();
      });
    });

  });

  describe('with a user', function() {
    var user;

    beforeEach(function(done) {
      User.create({
        name: 'IamListMaker',
        email: 'testlistuser@gmail.com',
        password: 'hellolist'
      }, function(err, newUser) {
        user = newUser;
        done();
      });
    });

    afterEach(function(done) {
      User.remove({ _id: user._id }, function(err, removedUser) {
        done();
      });
    });

    it('should create an List', function(done) {
      List.create({
        body: 'Test creating a list',
        user_id: user._id
      }, function(err, newList) {
        expect(err).toBeNull();
        expect(newList._id).toBeDefined();
        newList.remove();
        done();
      });
    });

  });
});