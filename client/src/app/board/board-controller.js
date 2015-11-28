(function() {
  'use strict';

  angular.module('mytodo')
    .controller('BoardController', function ($scope, $http) {
      
      $scope.formData = {};
      $scope.boards = [];

      //SHOW BOARDS
      $http.get('/api/boards')
         .success(function(data) {
             $scope.boards = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      //CREATE BOARD
      $scope.createBoard = function () {
        $http.post('/api/board/create', $scope.formData)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //DELETE BOARD
      $scope.removeBoard = function (id) {
        $http.post('/api/board/delete/' + id)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //UPDATE BOARD
      $scope.editBoard = function (id, name) {
        $http.post('/api/board/edit/' + id + '?name=' + name)
           .success(function(data) {
               $scope.boards = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();