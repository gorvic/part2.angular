(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authInterceptorService', authInterceptorService);

        authInterceptorService.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

    function authInterceptorService ($rootScope, $q, AUTH_EVENTS) {

        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);

                return $q.reject(response);
            }
        };
    }

})();