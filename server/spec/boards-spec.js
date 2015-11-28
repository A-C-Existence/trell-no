//MODEL DEPENDENCIES
// var request = require('supertest');
// var Board = require('./app/models/board');
// var List = require('./app/models/list');
// var BoardsController = require('./app/controllers/boards');
// var app = require('./app').app;

// describe('BoardsController', function() {

//   describe('without data', function(){

//     //show list of boards
//     it('should show list of boards', function (done) {
//       request(app).get('/api/boards')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res){
//         if (err) {
//           done.fail(err);
//         } else {
//           expect(res.body).toBeDefined();
//           done();
//         }
//       });
//     });

//   })

//   describe('with data', function() {
//     var board;
//     var testUser;

//     beforeEach(function(done) {
//       Board.create({Name: 'Board Super Test Name'}, function (err, newBoard){
//         if (err) {
//           console.log(err);
//           done.fail(err);
//         } else {
//           board = newBoard;
//           done();
//         }
//       })
//     });

//     afterEach(function(done) {
//       board.remove(function (err, removedBoard){
//         if(err){
//           console.log(err);
//         } else{
//           done();
//         }
//       });
//     });
    

//     //create new board
//     it('should create a new board', function (done){
//       request(app).post('/api/board/create')
//       .send({name: 'board test name'})
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function (err, res){
//           if(err){
//             // done.fail(err);
//           }else {
//             Board.findOne({board_name: 'board test name'}, function (err, newBoard){
//               if(err){
//                 console.log(err)
//               }else{
//                 newBoard.remove(function (err){
//                   if(err){
//                     done.fail(err);
//                     console.log(err);
//                   }else{
//                     return done();
//                   }
//                 })
//               }
//             })
//           }
//         });
//     })

//     //delete existing board
//     it('should delete existing board', function (done) {
//       request(app).post('/api/board/delete/' + board._id)
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function (err, res){
//         if(err){
//           done.fail(err);
//         }else {
//           Board.findOne({board_name: 'Board Test Name'}, function (err, deletedBoard){
//             if(err){
//               console.log(err);
//             }else {
//               return done();
//             }
//           })
//         }
//       })
//     });

//     //update an a board
//     it('should update a board', function (done) {
//       request(app).post('/api/board/edit/' + board._id + '?board_name=' + board.name)
//       .send({name: 'Updated test board name'})
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function (err, res){
//         if(err){
//           done.fail(err);
//         }else {
//           Board.findOne({board_name:'Updated test board name'}, function (err, updatedBoard){
//             if(err){
//               console.log(err);
//             }else{
//               return done();
//             }
//           })
//         }
//       })
//     });

//   }); 
// });