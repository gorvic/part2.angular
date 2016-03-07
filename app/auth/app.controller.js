(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('app', app);

    app.$inject = ['USER_ROLES', 'authservice']

    function app(USER_ROLES, authservice) {
        
        var vm = this;

        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = authservice.isAuthorized;

        vm.setCurrentUser = setCurrentUser;

        function setCurrentUser(user) {
            vm.currentUser = user;
        }


    }

})();