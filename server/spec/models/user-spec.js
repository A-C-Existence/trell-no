var mongoose = require('mongoose');
var User = require('./app/models/user');

beforeEach(function() {
  mongoose.connect('mongodb://localhost/mytodo');
});

afterEach(function() {
  mongoose.disconnect();
});

describe ('User', function() {
  describe('without data', function() {

    it('should return an empty list', function(done) {
      User.find({}, function(err, lists) {
        expect(err).toBeNull();
        expect(lists).toEqual([]);
        done();
      });
    });

    it('should create an User', function(done) {
      User.create({
        name: 'TestUser',
        email: 'testuser@gmail.com',
        password: 'testpw'
      }, function(err, newUser) {
        if (newUser) {
          expect(newUser._id).toBeDefined();
          newUser.remove(function(err, removedUser) {
            done();
          });
        } else {
          done.fail(err);
        }
      });
    });

  });
});