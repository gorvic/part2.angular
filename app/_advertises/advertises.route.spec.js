(function () {
    'use strict';

    describe('testing of \'advertises\' state', function () {

        var $state,
            $rootScope,
            state = 'advertises';

        beforeEach(module('angulardevApp'));

        beforeEach(inject(function (_$rootScope_, _$state_, $templateCache) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('_advertises/advertises.html', '');
        }));

        it('should have home route with right template, controller (and resolve block)', function () {
            var stateRoute = $state.get('advertises');

            expect(stateRoute).toBeDefined();
            expect(stateRoute.controller).toEqual('AdvertisesController');
            expect(stateRoute.templateUrl).toEqual('_advertises/advertises.html');
        });

        //https://github.com/angular-ui/ui-router/issues/50
        //https://github.com/vojtajina/angular.js/commit/a4fe51da3ba0dc297ecd389e230d6664f250c9a6
        //it('should match route with and without trailing slash', function () {
        //    module(function ($routeProvider) {
        //        $routeProvider.when('/foo', {templateUrl: 'foo.html'});
        //        $routeProvider.when('/bar/', {templateUrl: 'bar.html'});
        //    });
        //
        //    inject(function ($route, $location, $rootScope) {
        //        $location.path('/foo');
        //        $rootScope.$digest();
        //        expect($location.path()).toBe('/foo');
        //        expect($route.current.templateUrl).toBe('foo.html');
        //
        //        $location.path('/foo/');
        //        $rootScope.$digest();
        //        expect($location.path()).toBe('/foo');
        //        expect($route.current.templateUrl).toBe('foo.html');
        //
        //        $location.path('/bar');
        //        $rootScope.$digest();
        //        expect($location.path()).toBe('/bar/');
        //        expect($route.current.templateUrl).toBe('bar.html');
        //
        //        $location.path('/bar/');
        //        $rootScope.$digest();
        //        expect($location.path()).toBe('/bar/');
        //        expect($route.current.templateUrl).toBe('bar.html');
        //    });
        //});

        // Test whether the url is correct
        it('should respond to URL', function () {
            expect($state.href(state)).toEqual('#/advertises');
        });

        // Test whether our state activates correctly
        it('should activate the state', function () {
            $state.go(state); //делаем переход к новому состоянию
            $rootScope.$digest(); //запускаем digest цикл по watch и evalAsync принудительно
            //$scope.$apply()  => $rootScope.$digest() for recursive watching each model in child scopes
            //http://www.sitepoint.com/understanding-angulars-apply-digest/#comment-1841923336 - разница $digest & $apply
            //http://stackoverflow.com/a/18697967/5807080
            expect($state.current.name).toBe(state);
            //expect($state.href("about.person", {person: "bob"})).toEqual("/about/bob");
        });

    })
    ;

})
();