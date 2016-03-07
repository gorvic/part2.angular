(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('Four0FourController', Four0FourController);

    Four0FourController.$inject = ['previousState'];
    function Four0FourController(previousState) {

        //http://stackoverflow.com/questions/16635381/angular-ui-router-get-previous-state
        var vm = this;
        vm.params = previousState.URL;

    }

})();