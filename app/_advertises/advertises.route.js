(function () {
    'use strict';

    angular
        .module('app.advertises')
        .config(appConfig)
        //Run blocks - get executed after the injector is created and are used to kickstart
        // the application. Only instances and constants can be injected into run blocks.
        // This is to prevent further system configuration during application run time.
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    appConfig.$inject = ['$provide'];

    function appConfig($provide) {
        //http://stackoverflow.com/questions/21714655/reloading-current-state-refresh-data
        $provide.decorator('$state', function ($delegate, $stateParams) {
            $delegate.forceReload = function () {
                return $delegate.go($delegate.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            };
            return $delegate;
        });
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
                state: 'advertises',
                config: {
                    url: '/advertises',
                    controller: 'AdvertisesController',
                    controllerAs: 'vm',
                    templateUrl: '_advertises/advertises.html',
                    cache: false
                }
            },
            {
                state: 'advertise',
                config: {
                    url: '/advertises/:id',
                    controller: 'AdvertiseDetailController',
                    controllerAs: 'vm',
                    templateUrl: '_advertises/advertisedetail.html'
                }
            }
        ];
    }
})();

