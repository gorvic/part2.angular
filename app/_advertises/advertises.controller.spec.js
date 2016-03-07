(function () {
    'use strict';

    describe('advertise controller', function () {

        var advertiseController;
        var mainController;
        var $location;
        var advertiseData = [
            {
            "id": 2,
            "seller_name": "Иванов",
            "allow_mails": 0,
            "phone": "",
            "title": "223232",
            "description": "23234",
            "price": "2000",
            "location_id": 1,
            "category_id": 226,
            "organization_form_id": 0,
            "email": ""
            },
            {
                "id": 3,
                "seller_name": "Имя",
                "allow_mails": 0,
                "phone": "",
                "title": "Име",
                "description": "Описание",
                "price": "1000",
                "location_id": 2,
                "category_id": 199,
                "organization_form_id": 1,
                "email": "2@mail.ru."
            }
         ];


        beforeEach(module('angulardevApp'));

        beforeEach(inject(function ($controller, _$location_) {
            advertiseController = $controller('AdvertisesController');
            $location = _$location_;
        }));

        it('should have AdvertisesController', function () {
            expect(advertiseController).toBeDefined();
        });

        it('should change path to certain advertise, when it\'s chosen', function () {
            $location.path('/');
            advertiseController.gotoAdvertise(advertiseData[0]);
            expect($location.path()).toEqual('/advertises/'+advertiseData[0].id);
        });

        it('should change path to new advertise, when new advertise is chosen', function () {

        });

        it('should throw error, when remote host is unavailable', function () {

        });
    });


})();