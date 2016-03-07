(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    //TODO: Использовать ngResource для REST
    dataservice.$inject = ['$http', '$q', '$location', '$log', 'exception', 'logger', 'APIUrl'];

    /* @ngInject */
    function dataservice($http, $q, $location, $log, exception, logger, APIUrl) {

        var service = {
            getAdvertises: getAdvertises,
            getAdvertise: getAdvertise,
            getCities: getCities,
            getCategories: getCategories,
            save: save,
            deleteAdvertise: deleteAdvertise
        };

        var apiBaseURL = APIUrl; //'http://localhost:8000';

        return service;

        //var apiBaseURL = APIUrl; //'http://localhost:8888';

        function save(advertise) {

            if (advertise.id) {
                return updateAdvertise(advertise);
            } else {
                return createAdvertise(advertise);
            }

        }

        function updateAdvertise(advertise) {

            return $http.put(apiBaseURL + '/ads/' + advertise.id, advertise)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success('Advertise was successfully updated');
                $location.path('/advertises');
            }

            function fail(response) {
                return exception.catcher('XHR Failed updating advertise: ')(response);
            }

        }

        function createAdvertise(advertise) {

            return $http.post(apiBaseURL + '/ads', advertise)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success('Advertise was successfully created');
                $location.path('/advertises');
            }

            function fail(response) {
                return exception.catcher('XHR Failed creating advertise')(response);
            }

        }

        function deleteAdvertise(advertise) {

            return $http.delete(apiBaseURL + '/ads/' + advertise.id)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success('Advertise ' + advertise.title+ ' was successfully deleted');
                //$location.path('/advertises');
            }

            function fail(response) {
                return exception.catcher('XHR Failed updating advertise: ')(response);
            }

        }


        function getAdvertises() {

             return $http.get(apiBaseURL + '/ads')//возвращает промис, т.е. есть метод then
                .then(success)//возвращает промис. если errback - то отлавливается в catch. Если ошибка в success - то же в catch
                .catch(fail);  //возвращает промис и превращает промис в resolved, т.к. возвращает значение
                               // shorthand for promise.then(null, errorCallback)
            //https://github.com/kriskowal/qooqbooq/blob/master/tutorial.md#handling-errors

            function success(response) {

                //Test of error propagation in promises
                //logger.info('getAdvertises, callback');
                //return $q.reject('test reason'); //должны попасть в catch. А уже в catch зависит, попадём ли в коллбэк
                                                 //контроллера. И не попадём только если будет в catch - $q.reject
                return response.data;
            }

            function fail(response) { //reason

                //если в  errback есть return value - то попадаем в следующий callback в цепочке промисов.
                //промис становится resolved! (см. test, line #82 http://plnkr.co/edit/KlrvP6GhrpThdwEW1iki?p=preview)
                //т.е. попадаем в контроллер, в данном случае(?).
                //https://github.com/kriskowal/qooqbooq/blob/master/tutorial.md :
                //    If you return a value in a handler, outputPromise will get fulfilled.
                //    If you throw an exception in a handler, outputPromise will get rejected.
                //    If you return a promise in a handler, outputPromise will “become” that promise. Being able
                // to become a new promise is useful for managing delays, combining results, or recovering from errors.


                    //Test of error propagation in promises
                //logger.info('getAdvertises, errback. Значение reason: ' + response);
                //return $q.reject('no way'); //если не будет этого reject, то попадём в следующий then в любом случае
                                              //просто будет value === undefined(см. тест 5
                                              //(http://plnkr.co/edit/NqeA83rmKem6Qbvfim5U).
                                              // Т.е. попадаем в следующую часть цепи в любом случае
                return exception.catcher('XHR Failed for getAdvertises')(response);

            }
        }

        function getAdvertise(id) {

            return $http.get(apiBaseURL + '/ads/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(response) {
                return exception.catcher(' '+new Date()+' XHR Failed for getAdvertise ' + id+' '+response.status)(response);
            }
        }

        function getCities() {
            return $http.get(apiBaseURL + '/cities')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCities')(response);
            }
        }

        function getCategories() {
            return $http.get(apiBaseURL + '/categories')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getCategories')(e);
            }
        }

    }
})();
