(function() {
  'use strict';

  angular.module('mytodo')
    .factory('ItemService', ['$http','$q', function ($http, $q) {
      var service = {};

      //SHOW ITEMS
      service.getItems = function(listId){
        console.log('getItems: ', listId);
        var deferred = $q.defer();
        $http.get('/api/items?list_id=' + listId)
           .success(function (data) {
               console.log(data);
               deferred.resolve(data);
           })
           .error(function(data) {
            console.log('Error: ', data);
            deferred.reject('Error: ' + data);
           });
           return deferred.promise;
      };

      //CREATE ITEM
      service.createItem = function (formData) {
        var deferred = $q.defer();
        $http.post('/api/item/create', formData)
           .success(function (data) {
              deferred.resolve(data);
              console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };

      //UPDATE ITEM
      service.editItem = function (id, item_name, listId) {
        var deferred = $q.defer();
        $http.post('/api/item/edit/' + id + '?item_name=' + item_name + '&list_id=' + listId)
           .success(function (data) {
               deferred.resolve(data);
               console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };

      //DELETE ITEM
      service.removeItem = function (id, listId) {
        var deferred = $q.defer();
        $http.post('/api/item/delete/' + id + '?list_id=' + listId)
           .success(function (data) {
              deferred.resolve(data);
               console.log(data);
           })
           .error(function (data) {
              deferred.reject(data);
              console.log('Error: ' + data);
           });
           return deferred.promise;
      };
        

      return service;
    }]);
})();

//EXAMPLE
// (function() {
//   'use strict';

//   angular.module('mytodo')
//     .factory('TodoService', ['$http', function($http) {
//       var _currentList = 0,
//         service = {};
      
//       service.getTodos = function() {
//         // $http.get('/api/todos')
//       }

//       service.setList = function(list) {
//         _currentList = list;
//         return this.getList();
//       }

//       return service;
//     }]);
// })();
