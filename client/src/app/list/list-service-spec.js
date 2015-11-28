(function() {
  'use strict';

  describe('ListService', function() {
    var service, httpBackend, handler, listData, errorMessage;

    // Configure module that contains the controller being tested
    beforeEach(module('mytodo'));

    beforeEach(inject(function (_$httpBackend_, _ListService_) {
      httpBackend = _$httpBackend_;
      service = _ListService_;
      listData = [];

      // Define an object with functions to handle success and error for our API calls
      // These functions simulate the functions written in controllers when a service is called
      handler = {
        success: function(lists) {
          listData = lists;
        },
        error: function(err) {
          errorMessage = err;
        }
      }; 

      // Use the Jasmine spyOn method to setup a callback using our handler mock object
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
    });

    it('should be 0', function() {
      var response = [
        {
          body: 'List Service Test List'
        }
      ];

      // Use the httpBackend mock service to capture the call to our API and return the data we specify in the response variable
      httpBackend.expectGET('/api/lists').respond(response);
      // setup the service to use the success and error handler functions we defined in the beforeEach block. 
      service.getLists().then(handler.success, handler.error);
      // execute the HTTP API call
      httpBackend.flush();

      // test the results
      expect(handler.success).toHaveBeenCalled();
      expect(listData).toEqual(response);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorMessage).toBeUndefined();
    });

    // it('should set current list to 1', function() {
    //   expect(service.setList(1)).toEqual(1);
    //   expect(service.getList()).toEqual(1);
    // });
  });
})();
// ------------------------------------------------------

//LIST-SERVICE
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