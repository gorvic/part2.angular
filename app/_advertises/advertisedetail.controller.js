(function () {
    'use strict';

    angular
        .module('app.advertises')
        .controller('AdvertiseDetailController', AdvertiseDetailController);

    AdvertiseDetailController.$inject = [
        '$q', '$location', '$stateParams', '$window',
        'logger', 'dataservice'];

    function AdvertiseDetailController($q, $location, $stateParams, $window,
                                       logger, dataservice) {

        /*jshint validthis: true */
        var vm = this;
        vm.advertise = null;
        vm.isSaving = false;

        //exposed functions
        vm.cancel = cancel;
        vm.goBack = goBack;
        vm.save = save;


        //http://www.jomendez.com/2015/02/25/optimizing-code-object-defineproperty-scope-watch-angularjs/
        //vm = controller.prototype, canSave - controller's property name,
        //get = функция
        //Object.defineProperty(vm, 'canSave', {get: canSave});

        activate();

        /////////////////////
        function activate() {
            //получаем промисы, в массив
            //и далее обрабатываем через q и если не ловится ничего - то активируем view
            //TODO: возможно лучше сделать через resolve in state, now allowing to go to controller

            // get cities, categories, advertises from remote data source, in parallel
            var promises = [getRequestedAdvertise(), getCities(), getCategories()];

            return $q.all(promises).then(function () {
            })
        }

        function getCities() {
            return dataservice.getCities()
                .then(function (data) {
                    vm.cities = data;
                    return vm.cities;
                });
        }

        function getCategories() {
            return dataservice.getCategories().then(function (data) {

                vm.categories = data;
                return vm.categories;
            });
        }


        function getRequestedAdvertise() {
            var val = $stateParams.id;

            if (val === 'new') {

                vm.advertise = {
                    organization_form_id: 0 //проставим изначальное значение для радиокнопки
                };
                return vm.advertise;
            }

            return dataservice.getAdvertise(val)
                .then(function (data) {
                    vm.advertise = data;
                    return vm.advertise;
                })
                .catch(function (error) {
                    logger.error(' '+new Date() +' Error while getting advertise id = ' + val + '; ' + error);
                    gotoAdvertises();
                });
        }

        function cancel() {
            gotoAdvertises();
        }

        function goBack() {
            $window.history.back();
        }

        function gotoAdvertises() {
            $location.path('/advertises');
        }

        function save() {

            vm.isSaving = true;
            return dataservice.save(vm.advertise).then(function (saveResult) {
                vm.isSaving = false;
            }).catch(function (error) {
                vm.isSaving = false;
            });
        }
    }
})();