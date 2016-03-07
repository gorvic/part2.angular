(function () {
    'use strict';

    angular
        .module('angulardevApp', [
            'app.advertises',
            'app.core'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('ApplicationController', function () {
        });

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];
    function appConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        //http://stackoverflow.com/a/23198743
        //https://github.com/angular-ui/ui-router/wiki/URL-Routing#when-for-redirection
        $urlRouterProvider.when('', '/advertises');
        $urlRouterProvider.when('/#', '/advertises');

        //https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
        $urlMatcherFactoryProvider.strictMode(false);
    }

    appRun.$inject = [ 'uirouterlogger'];
    function appRun(uirouterlogger) {
        //http://stackoverflow.com/questions/20745761/what-is-the-angular-ui-router-lifecycle-for-debugging-silent-errors/20786262#20786262
        uirouterlogger.active = true; //пока включим дебаг ui-router
    }

})();


//TODO: 0. Использовать TODO и подобный функционал в редакторах
//TODO: 1. тестирование на jasmine
//TODO: 2. тестирование на protractor
//TODO: 3. разобраться с git flow и его применением в WS
//TODO: 4. разобраться полностью с promise ($q, native, angular)
//      4.1 specs
//      4.2 event loop, web workers, event loop tick (+ scopes, iife, closure - освежить)
//TODO: 5. сделать во второй части login/logout w/ Laravel + сделать pagination в списке
//TODO: 6. build процедуры с grunt
//TODO: 7. автоматический линтинг и JSCS
//TODO: 8. Аналог функционала по хоткеям, ливтемплейтам, макросам, плагинам в Саблайме
//TODO: 9. Выучить CSS3("Специалист") + bootstrap
//TODO: 10. Разобраться хорошо с ui-router
//TODO: 11. Перехватить categories через parent_id
//TODO: 12. Хорошо освежить regexp
//TODO: 13. Использование snippets








