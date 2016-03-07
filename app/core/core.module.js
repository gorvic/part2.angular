(function () {
    'use strict';

    angular
        .module('app.core', [
            'blocks.exception', 'blocks.logger', 'blocks.router',
            'blocks.uirouterlogger',
            'ui.router',
            'ngAnimate', 'ngSanitize'
        ]);
})();
