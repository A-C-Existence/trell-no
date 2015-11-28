//MODEL DEPENDENCIES 
var request = require('supertest');
var Board = require('./app/models/board');
var List = require('./app/models/list');
var Item = require('./app/models/item');
var ItemsController = require('./app/controllers/items');
var app = require('./app').app;

describe('ItemsController', function() {

  describe('without data', function(){

    //show item
    it('should show list of list items', function (done) {
      request(app).get('/api/items')
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
    var item;
    var list;

    beforeEach(function (done) {
      List.create({list_name: 'test list name'}, function (err, newList){
        if (err) {
          console.log(err);
        } else {
          list = newList;
          Item.create({item_name: 'test item name', _list: list.id}, function (err, newItem) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              item = newItem;
              done();
           }
          });
        }
      });
    });

    afterEach(function (done) {
      list.remove(function (err, removedList){
        if(err){
          console.log(err);
        } else{
          item.remove(function (err, removedItem) {
            if (err) {
              done.fail(err);
            } else {
              done();
            }
          });
        }
      });
    });


    //new item test
    it('should create a new item for a list', function (done) {  
      request(app).post('/api/item/create')
      .send({
        item_name: 'test item',
        _list: list._id
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        expect(res.body.item_name).toEqual('test item');
        if(err){
          done.fail(err);
        }else {
          Item.findOne({item_name: 'test item'}, function (err, newItem){
            if(err){
              console.log(err)
            }else{
              newItem.remove(function (err){
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

    //delete an item test
    it('should delete an item from a list', function (done) {
      request(app).post('/api/item/delete/' + item._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          Item.findOne({item_name: 'Item Test Name'}, function (err, deletedItem){
            if(err){
              console.log(err);
            }else {
              return done();
            }
          });
        }
      });
    });

    //update item test
    it('should update an item on a list', function (done) {
      request(app).post('/api/item/edit/' + item._id + '?list_id=' + list._id)
      .send({item_name: 'updated test item name', _list: list._id})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res){
        if(err){
          done.fail(err);
        }else {
          Item.findOne({item_name:'updated test item name', _list: list._id}, function (err, updatedItem){
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


//EXAMPLE
// var request = require('supertest'),
//     app = require('../../app'),
//     LoginUser = require('../helpers/login_user');

// var User = require ('../../app/models/user'),
//     List = require ('../../app/models/list'),
//     Todo = require ('../../app/models/todo');

// describe ('TodosController', function() {
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
//     // Todo.remove({_id: todo._id }, function(err, removedTodo) {
//     //   if (err) {
//     //     console.log('afterEach: ', err);
//     //   }
//     //   done();
//     // });
//   });

//   describe('without data', function() {

//     it('should return an empty list', function(done) {
//       request(app).get('/api/todos')
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
//     var todo, list;

//     beforeEach(function(done) {
//       List.create({
//         body: 'TodoController Test List',
//         user_id: user._id
//       }, function(err, newList) {
//         list = newList;
//         Todo.create({
//           body: 'TodoController Test Todo',
//           user_id: user._id,
//           list_id: list._id
//         }, function(err, newTodo) {
//           if (err) {
//             console.log(err);
//           }

//           todo = newTodo;
//           done();
//         });
//       });
//     });

//     afterEach(function(done) {
//       Todo.remove({ _id: todo._id }, function(err, removedTodo) {
//         List.remove({ _id: list._id }, function(err, removedList) {
//           done();
//         });
//       });
//     });

//     it('should return a list of 1 todo', function(done) {
//       request(app).get('/api/todos')
//       .set('X-ACCESS-TOKEN', auth.token)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res){
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body.length).toEqual(1);
//           returnedTodo = res.body[0];
//           expect(returnedTodo).toBeDefined();
//           expect(returnedTodo.name).toEqual(todo.name);
//           done();
//         }
//       });
//     });

//     it('should create a new todo', function(done) {
//       request(app).post('/api/todos')
//       .set('X-ACCESS-TOKEN', auth.token)
//       .send({
//         body: 'Create a todo controller test',
//         user_id: user._id,
//         list_id: list._id
//       })
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err, res) {
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body.body).toEqual('Create a todo controller test');
//           Todo.remove({ _id: res.body._id }, function(err, deletedTodo) {
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