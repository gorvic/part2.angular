(function() {
    'use strict';

    //https://docs.angularjs.org/error/ngModel/numfmt
    angular
        .module('app.advertises')
        .directive('adStringToNumber', adStringToNumber);

    function adStringToNumber() {
        return {
            require: 'ngModel',
            restrict: 'A',
            //TODO: см. ниже, найти причину.  Посмотреть здесь: https://nozzle.io/devblog/relative-angularjs-modules/
            //при добавлении templateUrl ругается на  failed to load template (хотя адрес в Network
            //идентичный тому, который грузится, когда этот ключ убрать)
            //templateUrl: 'advertisedetail.html',
            //если не добавить контроллер - то не работает директива (выдаётся ошибка numfmt для type="number"
            //controller: 'AdvertiseDetailController',  //в итоге, обновил ui-router, убрал контроллер, иначе грузит контроллер дважды
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
                });
            }
        };
    }
})();