var request = require('supertest'),
    app = require('./app');

var User = require('./app/models/user');

describe('Authentication Controller', function() {

  describe('with user', function() {
    var user;

    beforeEach(function(done) {
      User.create({
        name: 'Test User',
        email: 'user@test.com',
        password: 'password'
      }, function(err, newUser) {
        user = newUser;
        done();
      });
    });

    afterEach(function(done) {
      User.remove({ _id: user.id }, function(err, removedUser) {
        done();
      });
    });

    it('should authenticate the user', function(done) {
      request(app).post('/authenticate')
      .send({
        email: 'firsteusers',
        password: 'imfirst'
      })      
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body.token).toBeDefined();
        done();
      });
    });
  });
  


//EXAMPLE
//   it('should not authenticate the user', function(done) {
//     request(app).post('/authenticate')
//     .send({
//       email: 'user@test.com',
//       password: 'password1'
//     })     
//     .expect('Content-Type', /json/)
//     .expect(404)
//     .end(function(err, res){
//       expect(err).toBeDefined();
//       done();
//     }); 
//   });
// });

// var request = require('supertest'),
//   app = require('../../app');

// var User = require('../../app/models/user');

// describe('Authentication Controller', function() {

//   describe('with user', function() {
//     var user;

//     beforeEach(function(done) {
//       User.create({
//         name: 'Test User',
//         email: 'user@test.com',
//         password: 'password1'
//       }, function(err, newUser) {
//         user = newUser;
//         done();
//       });
//     });

//     afterEach(function(done) {
//       User.remove({ _id: user.id }, function(err, removedUser) {
//         done();
//       });
//     });

//     it('should authenticate the user', function(done) {
//       request(app).post('/authenticate')
//       .send({
//         email: 'user@test.com',
//         password: 'password1'
//       })      
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res){
//         expect(err).toBeNull();
//         expect(res.body.token).toBeDefined();
//         done();
//       });    
//     });

//   });
  

//   it('should not authenticate the user', function(done) {
//     request(app).post('/authenticate')
//     .send({
//       email: 'user@test.com',
//       password: 'password1'
//     })      
//     .expect('Content-Type', /json/)
//     .expect(404)
//     .end(function(err, res){
//       expect(err).toBeDefined();
//       done();
//     });  
//   });
// });