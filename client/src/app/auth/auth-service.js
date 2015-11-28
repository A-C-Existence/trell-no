(function () {
  'use strict';

  angular
      .module('mytodo')
      .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    // Use the email and password to login. The Callback will receive and object with the username and token
    function Login(email, password, callback) {

      $http.post('/api/login', { email: email, password: password })
         .success(function (res) {
            console.log('res: ', res);
            callback({ success: res.success, email: email, token: res.token });
         });

    }

    // Store credentials for reuse. They are stored in $rootScope for the current app session.
    // Stored in the $cookieStore for use if the app is reloaded
    function SetCredentials(email, token) {
      $rootScope.globals = {
        currentUser: {
          email: email,
          token: token
        }
      };

      $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
      $cookieStore.put('globals', $rootScope.globals);
    }

    //cleanup stored credentials
    function ClearCredentials() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }
})();

//EXAMPLE CODE
// (function () {
//   'use strict';

//   angular
//       .module('mytodo')
//       .factory('AuthenticationService', AuthenticationService);

//   AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
//   function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
//     var service = {};

//     service.login = login;
//     service.setCredentials = setCredentials;
//     service.clearCredentials = clearCredentials;

//     return service;

//     // Use the email and password to login. The Callback will receive and object with the username and token
//     function login(email, password, callback) {

//       $http.post('/authenticate', { email: email, password: password })
//          .success(function (res) {
//              callback({ email: email, token: res.body.token });
//          });

//     }

//     // Store credentials for reuse. They are stored in $rootScope for the current app session.
//     // Stored in the $cookieStore for use if the app is reloaded
//     function setCredentials(email, token) {
//       $rootScope.globals = {
//         currentUser: {
//           email: email,
//           token: token
//         }
//       };

//       $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
//       $cookieStore.put('globals', $rootScope.globals);
//     }

//     // Cleanup the stored credentials
//     function clearCredentials() {
//       $rootScope.globals = {};
//       $cookieStore.remove('globals');
//       $http.defaults.headers.common.Authorization = 'Basic';
//     }
//   }
// })();