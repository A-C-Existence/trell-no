//EXAMPLE CODE
// (function() {
//   'use strict';

//   angular.module('mytodo')
//     .factory('ListService', ['$http', '$q', function($http, $q) {
//       var _currentList = 0,
//         service = {
//           getLists: getLists,
//           setList: setList
//         };
      
//       return service;

//       // Note the code does not use $q to create a promise. Instead it returns the promise created by $http.get.
//       // $q is only used to explicitly call reject() in the case of an error.
//       function getLists() {
//         return $http.get('/api/lists')
//           .then(function(response) {
//             return response.data;
//           })
//           .catch(function (err) {
//             $q.reject(err.message);
//           });
//       }

//       function setList(list) {
//         _currentList = list;
//         return this.getLists();
//       }
//     }]);
// })();