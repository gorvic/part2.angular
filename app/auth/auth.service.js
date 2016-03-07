(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    authService.$inject = ['$http', 'session', 'exception', 'logger', 'APIUrl'];

    /* @ngInject */
    function authService($http, session, exception, logger, APIUrl) {

        var service = {
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            login: login
        };

        var apiBaseURL = APIUrl;    // 'http://localhost:8000';

        return service;


        function login(credentials) {
            return $http
                .post(apiBaseURL+'/login', credentials)
                .then(success);

            function success(res) {
                    Session.create(res.data.id, res.data.user.id,
                        res.data.user.role);
                    return res.data.user;
            }
        }

        function isAuthorized() {
            return !!Session.userId; //quick way to get boolean value
        }

        function isAuthenticated() {

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);

        }

    }


})();