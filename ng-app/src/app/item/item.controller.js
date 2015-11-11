(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ItemController', function ($scope, $routeParams, $http) {
      //add properties to scope i.e: todos, list_title, later available for view
      $scope.formData = {};
      $scope.formData.list_id = $routeParams.list_id;
      $scope.todos = [];
      $scope.list_name = $routeParams.list_name;

      //SHOW ITEMS
      $http.get('/api/items/' + $routeParams.list_id)
         .success(function(data) {
             $scope.todos = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      //CREATE ITEM
      $scope.createItem = function () {
        $http.post('/api/item/create', $scope.formData)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //DELETE ITEM
      $scope.removeItem = function (id) {
        $http.post('/api/item/delete/' + id + '?list_id=' + $routeParams.list_id)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //UPDATE ITEM
      $scope.editItem = function (id, item_title) {
        $http.post('/api/edit/' + id + '?item_name=' + item_title + '&list_id=' + $scope.formData.list_id)
           .success(function(data) {
               $scope.todos = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();