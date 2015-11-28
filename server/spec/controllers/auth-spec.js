var request = require('supertest');
var app = require('./app').app;

describe('AuthenticationController', function() {

  it('should authenticate the user', function (done) {
    request(app).post('/api/login')
    .send({
      email: 'firstuser@gmail.com',
      password: 'firsteveruser'
    });
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      expect(err).toBeNull();
      done();
    });
  });

  it('should not authenticate the user', function (done) {
    request(app).post('/api/login')
    .send({
      email: 'secondeuser',
      password: 'secondeveruser'
    });
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function(err, res){
      expect(err).toBeDefined();
      done();
    });
  });
});