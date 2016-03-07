(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('LoginController', function ($rootScope, AUTH_EVENTS, authService) {

            //viewmodel instead $scope
            var vm = this;

            //Exposed functions
            vm.login = login;

            //credential's object
            vm.credentials = {
                username: '',
                password: ''
            };


            function login(credentials) {

                authService.login(credentials)
                    .then(success)
                    .catch(fail);

                function success(user) {
                    //notify about success
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

                    //setting autenticated user
                    vm.setCurrentUser(user);
                }

                function fail() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
            }
        })

})();