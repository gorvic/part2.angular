(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);


    /* @ngInject */
    function appRun(routerHelper) {
        //var otherwise = '/404';
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'core/four0four.html',
                    controller: 'Four0FourController',
                    controllerAs: 'vm',
                    title: '404',
                    resolve: {
                        previousState: [
                            "$state",
                            function ($state) {
                                console.log('current state ' + $state.current.name +' '+ $state.params[0]);
                                var currentStateData = {
                                    Name: $state.current.name,
                                    Params: $state.params,
                                    URL: $state.href($state.current.name, $state.params)
                                };
                                return currentStateData;
                            }
                        ]
                    }
                }
            }
        ];
    }
})();
