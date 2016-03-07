(function () {
    'use strict';

    angular
        .module('app.auth')
        .config(appConfig)
        //Run blocks - get executed after the injector is created and are used to kickstart
        // the application. Only instances and constants can be injected into run blocks.
        // This is to prevent further system configuration during application run time.
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    appConfig.$inject = ['$provide'];

    function appConfig($provide) {
    }

    function appRun(routerHelper) {
        /*модуль для конфигурирования состояний
         *
         */
        var otherwisePath = '404';
        routerHelper.configureStates(getStates(), otherwisePath);
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    templateUrl: 'auth/login.html',
                    cache: false
                }
            }
            //{
            //    state: 'advertise',
            //    config: {
            //        url: '/advertises/:id',
            //        controller: 'AdvertiseDetailController',
            //        controllerAs: 'vm',
            //        templateUrl: '_advertises/advertisedetail.html'
            //    }
            //}
        ];
    }
})();

