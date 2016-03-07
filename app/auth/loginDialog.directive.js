(function() {
    'use strict';

    angular
        .module('app.auth')
        .directive('loginDialog', loginDialog);

    loginDialog.$inject = ['AUTH_EVENTS'];

    function loginDialog(AUTH_EVENTS) {

        return {
            restrict: 'A',
            template: '<div ng-if="visible" ng-include = "\'loginForm.html\'" > ',
            link: function (scope) {
                var showDialog = function () {
                    scope.visible = true;
                };

                scope.visible = false;
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
            }
        };
    }
})();