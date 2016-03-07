(function () {
    'use strict';

    angular
        .module('app.advertises')
        .controller('AdvertisesController', AdvertisesController);


    AdvertisesController.$inject = ['$q', '$location', '$state',
        'dataservice', 'logger'];

    function AdvertisesController($q, $location, $state,
                                  dataservice, logger) {

        var vm = this;
        vm.title = 'Advertises';
        vm.advertises = [];

        //functions
        //Важно не забывать expose functions to $scope для того, чтобы они были доступны и выполняемы во view
        vm.gotoAdvertise = gotoAdvertise;
        vm.deleteAdvertise = deleteAdvertise;
        vm.refresh = refresh;
        vm.getOrganizationForm = getOrganizationForm;

        activate();

        ///////////

        function activate() {
            var promises = [getAdvertises()];


            return $q.all(promises).then(function () {
                //logger.info('Activated Advertises View');
            });
        }

        function refresh() {
            $state.forceReload();
        }

        function getAdvertises() {
            // см. http://blog.ninja-squad.com/2015/05/28/angularjs-promises/
            // http://blog.ninja-squad.com/2015/06/04/angularjs-promises-2/
            // или http://terussell85.github.io/blog/2013/12/23/the-angularjs-promise-anti-pattern-that-makes-me-cry/ и
            // комменты

            //dataservice.getAdvertise -  возвращает промис. Т.е. оба обработчика возвращают значение в dataservice.
            //()
            //https://github.com/kriskowal/uncommonjs/blob/master/promises/specification.md#thenable-promises)
            //получается, что в случае успеха $http.get().success возвращает данные (response.data, и промис становится  resolve),
            //которые передаются в следующий successCallback как параметр.
            // Если же в фабрике был выполнен catch, то тогда вызывается  exception.catcher - который выводит сообщения,
            // и возвращает $q.reject(), а тогда промис становится rejected и прерывает дальнейшую цепочку (если она есть, если
            //промис последний  - то reject не нужен).
            //см. также http://plnkr.co/edit/KlrvP6GhrpThdwEW1iki?p=preview с тестами из ссылки

            return dataservice.getAdvertises()
                .then(function (data) {
                    // We don't handle the 'fail' because the dataservice will handle the fail.
                    vm.advertises = data;
                    return vm.advertises;

                    //Test of error propagation in promises
                    //}).catch(function (reason) {
                    //    logger.error('Здесь ловим ошибку от errback в dataservice.getAdvertise.fail. Значение ошибки ' + reason);
                });
        }

        function gotoAdvertise(advertise) {
            if (advertise && advertise.id) {
                //переходим по URL, следовательно не advertise, a advertiseS
                $location.path('/advertises/' + advertise.id);
            }
        }

        function deleteAdvertise(advertise) {

            //$ngBootBox.confirm("Вы действительно хотите удалить объявление: '" + advertise.title +'\'')
            //    .then(function (result) {
            //        return dataservice.deleteAdvertise(advertise);
            //    })
            //    .catch(function (reason) {
            //
            //    })

            if (confirm('Вы действительно хотите удалить объявление \'' + advertise.title + '\'?') && advertise.id) {

                return dataservice.deleteAdvertise(advertise)
                    .then(function (result) {
                        $state.forceReload();
                    });
            }
        }

        function getOrganizationForm(advertise) {
            if (!advertise.organization_form_id) {
                return '';
            }

            return 'warning';
        }
    }
})();
