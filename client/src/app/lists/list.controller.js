(function() {
  'use strict';

  angular.module('mytodo')
    .controller('ListController', function ($scope, $routeParams, $http) {
      
      $scope.formData = {};
      $scope.lists = [];
      $scope.boardId = $routeParams.board_id;
      $scope.board_title = $routeParams.board_name;
      console.log($scope.board_title);
      
      //SHOW LISTS
      $http.get('/api/lists?board_id=' + $routeParams.board_id)
         .success(function(data) {
             $scope.lists = data;
             console.log(data);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

      //CREATE LIST
      $scope.createList = function () {
        $scope.formData.board_id = $scope.boardId;
         console.log('blah', $scope.formData);
        $http.post('/api/list/create', $scope.formData)
           .success(function(data) {
               $scope.lists = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //DELETE LIST
      $scope.removeList = function (id) {
        $http.post('/api/list/delete/' + id)
           .success(function(data) {
               $scope.lists = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
        
      //UPDATE LIST 
      $scope.editList = function (id, list_name) {
        $http.post('/api/list/edit/' + id + '?list_name=' + list_name + '&board_id=' + $scope.boardId)
           .error(function(data) {
               console.log('Error: ' + data);
           });
      };
    });
})();

//EXAMPLE 
// (function() {
//   'use strict';

//   angular.module('mytodo')
//     .controller('ListsController', ['$log', 'ListService', function ($log, ListService) {
//       var vm = this;
//       vm.lists = [];

//       ListService.getLists()
//         .then(function(lists) {
//           vm.lists = lists;
//         })
//         .catch(function(err) {
//           $log.error('Error fetching lists: ', err);
//         });

//       vm.createList = function () {
//         vm.list_list.push(vm.list);
//         vm.list = '';
//       };

//       vm.removeList = function (index) {
//         vm.list_list.splice(index, 1);
//       };
//     }]);
// })();