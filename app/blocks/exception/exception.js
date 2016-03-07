(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['$q', '$state', 'logger'];
    /* @ngInject */
    function exception($q, $state, logger ) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            //logger.info('Step 4 - exception. catcher');
            return function (e) {
                var thrownMessage;
                var newMessage;

                if (e.status <= 0 ) {
                    thrownMessage =  e.status + ' : Неизвестная ошибка!';
                    newMessage = message + thrownMessage;
                } else if(e.status = 404 ) {
                    $state.transitionTo('404');
                    return $q.reject();
                } else if (e.data ) {
                    thrownMessage = e.status + ' : ' + e.statusText;
                    newMessage = message + thrownMessage;
                }
                e.data.description = e.data.description ? '\n' +newMessage : newMessage;
                logger.error(newMessage);

                return $q.reject(e);
            };
        }
    }
})();
