(function() {
    'use strict';

    //http://stackoverflow.com/a/26086754/5807080

    angular
        .module('blocks.uirouterlogger')
        .factory('uirouterlogger', uirouterlogger);

    uirouterlogger.$inject = ['$rootScope', '$log'];

    function uirouterlogger($rootScope, $log) {

        var handler = {active: false};
        handler.toggle = function () {
            handler.active = !handler.active;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                $log.debug("$stateChangeStart --- event, toState, toParams, fromState, fromParams", arguments);
            }
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (handler.active) {
                $log.debug("$stateChangeError --- event, toState, toParams, fromState, fromParams, error", arguments);
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                $log.debug("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams", arguments);
            }
        });

        $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
            if (handler.active) {
                $log.debug("$viewContentLoading --- event, viewConfig", arguments);
            }
        });

        $rootScope.$on('$viewContentLoaded', function (event) {
            if (handler.active) {
                $log.debug("$viewContentLoaded --- event", arguments);
            }
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            if (handler.active) {
                $log.debug("$stateNotFound --- event, unfoundState, fromState, fromParams", arguments);
            }
        });

        return handler;
    }

})();