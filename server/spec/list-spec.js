var request = require('supertest');
var List = require('./app/models/list');
var Board = require('./app/models/board');
var ListsController = require('./app/controllers/lists');
var app = require('./app').app;
  
describe('ListsController', function() {
  describe('without data', function(){
    
    //show lists
    it('should return a all lists', function (done) {
      request(app).get('/api/lists')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body).toBeDefined();
          done();
        }
      });
    });

  });

  describe('with data', function() {
    var list;
    var testBoard;

    beforeEach(function (done) {
      Board.create({name: 'test board name'}, function (err, newBoard){
        if(err){
          console.log(err);
        }else{
          testBoard = newBoard;
          List.create({list_name: 'test list name', _board: testBoard._id}, function (err, newList){
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              list = newList;
              done();
            }
          });
        }
      })
    });

    afterEach(function(done) {
      testBoard.remove(function (err, removedBoard){
        if(err){
          console.log(err);
        }else{
          list.remove(function (err, removedList){
            if(err){
              console.log(err);
              done.fail(err);
            } else{
              done();
            }
          });
        }
      });
    });

    //create a new list in a board
    it('should create a new list item for a specific board', function (done) {  
      request(app).post('/api/list/create')
      .send({
        list_name: 'new list for board',
        _board: testBoard._id
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_name: 'new list for board'}, function (err, newList){
            if(err){
              console.log(err)
            }else{
              newList.remove(function (err){
                if(err){
                  console.log(err);
                }else{
                  return done();
                }
              });
            }
            });
        }
      });
    });
    
    //delete a list
    it('should delete an list of a list', function (done) {
      request(app).post('/api/list/delete/' + list._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_name: 'test board name'}, function (err, deletedList){
            if(err){
              console.log(err);
            }else {
              return done();
            }
          })
        }
      })
    });

      //update an list of a board
    it('should udate an list of a list', function (done) {
      request(app).post('/api/list/edit/' + list._id + '?list_name=' + list.list_name)
      .send({list_name: 'updated the test list name', _list: list._id})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          List.findOne({list_name: 'updated the test list name', _board: testBoard._id}, function (err, updatedList){
            if(err){
              console.log(err);
            }else{
              return done();
            }
          });
        }
      });
    });


  });
});

//EXAMPLE LIST-CONTROLLER SPEC
// var request = require('supertest'),
//     app = require('../../app'),
//     LoginUser = require('../helpers/login_user');

// var User = require ('../../app/models/user'),
//     List = require ('../../app/models/list');

// describe ('ListsController', function() {
//   var user, auth = {};

//   beforeEach(function(done) {
//     User.create({ 
//       name: 'todo user',
//       email: 'todo@controllertest.com',
//       password: 'password1' 
//     }, function(err, newUser) {
//       if (err) {
//         console.log('beforeEach: ', err);
//       } else {
//         user = newUser;  
//         LoginUser.loginUser(auth, user.email, user.password, request(app), done);
//       }
//     });
//   });

//   afterEach(function(done) {
//     User.remove({ _id: user._id }, function(err, removeduser) {
//       if (err) {
//         console.log('afterEach: ', err);
//       }
//       done();
//     });
//   });

//   describe('without data', function() {

//     it('should return an empty list', function(done) {
//       request(app).get('/api/lists')
//       .set('X-ACCESS-TOKEN', auth.token)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res){
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body.length).toEqual(0);
//           done();
//         }
//       });
//     });

//   });

//   describe('with data', function() {
//     var list;

//     beforeEach(function(done) {
//       List.create({
//         body: 'ListController Test List',
//         user_id: user._id
//       }, function(err, newList) {
//         list = newList;
//         done();
//       });
//     });

//     afterEach(function(done) {
//       List.remove({ _id: list._id }, function(err, removedList) {
//         done();
//       });
//     });

//     it('should return a list of 1 todo', function(done) {
//       request(app).get('/api/lists')
//       .set('X-ACCESS-TOKEN', auth.token)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res){
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body.length).toEqual(1);
//           returnedList = res.body[0];
//           expect(returnedList).toBeDefined();
//           expect(returnedList.boyd).toEqual(list.name);
//           done();
//         }
//       });
//     });

//     it('should create a new todo', function(done) {
//       request(app).post('/api/lists')
//       .set('X-ACCESS-TOKEN', auth.token)
//       .send({
//         body: 'Create a list controller test',
//         user_id: user._id,
//         list_id: list._id
//       })
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res) {
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body.body).toEqual('Create a list controller test');
//           List.remove({ _id: res.body._id }, function(err, deletedList) {
//             if (err) {
//               done.fail.err('Failed to remove todo.');
//             } else {
//               done();
//             }
//           });
//         }
//       });
//     });

//   });
// });
