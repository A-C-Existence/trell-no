(function() {
  'use strict';

  angular.module('mytodo')
    .controller('LoginController', ['AuthenticationService','$location', function (AuthenticationService, $location) {
        var vm = this;   
        vm.login = login;

        (function initController() {
            //RESET LOGIN STATUS
            AuthenticationService.ClearCredentials();
        })();

        
        vm.login = function () {
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                vm.dataLoading = true;
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    $location.path('/boards');
                } else {
                    //SHOULD LOGIN FAIL, DO THIS
                    var notification = document.getElementById('notification');
                    notification.innerHTML = 'Invalid Email/Password Entry. Please try again.';
                    notification.style.display = 'block';
                    
                    console.log(response);
                    vm.dataLoading = false;
                }
            });
        }

    }]);
})();

//EXAMPLE LOGIN CONTROLLER
// (function () {
//   'use strict';
 
//   angular
//     .module('mytodo')
//     .controller('LoginController', ['$location', 'AuthenticationService', function ($location, AuthenticationService) {
//     var vm = this;

//     vm.login = login;

//     // Each time the Login controller is initialized clear the old credentials.
//     (function initController() {
//       // reset login status
//       AuthenticationService.clearCredentials();
//     })();

//     function login() {
//       vm.dataLoading = true;
//       AuthenticationService.login(vm.email, vm.password, function (credentials) {
//         if (res.success) {
//           AuthenticationService.setCredentials(credentials.email, credentials.token);
//           $location.path('/');
//         } else {
//           console.log(res.message);
//           vm.dataLoading = false;
//         }
//       });
//     }
//   }]);
 
// })();