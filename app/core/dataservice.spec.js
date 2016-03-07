(function () {
    'use strict';

    describe('In dataservice service', function () {

        var $httpBackend,
            $rootScope,
            dataservice,
            expectedUrl = 'http://localhost:8888/ads',
        //newAdvertiseUrl = 'http://localhost:8888/ads/new',
            advertiseData = [
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
            ],
            newAdvertiseData = {
                "seller_name": "Новое объявление",
                "allow_mails": 1,
                "phone": "8 917 234 23 43",
                "title": "Подано новое объявление",
                "description": "Тест нового объявления",
                "price": "20000",
                "location_id": 1,
                "category_id": 226,
                "organization_form_id": 0,
                "email": "myemail@mail.com"
            };

        beforeEach(module('app.core'));

        beforeEach(inject(function (_$rootScope_, _$httpBackend_, _dataservice_) {
            dataservice = _dataservice_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        }));

        it('should have a dataservice', function () {
            expect(dataservice).toBeDefined();
        });

        it('should return list of advertises', function () {
            var response;

            $httpBackend.when('GET', expectedUrl)
                .respond(200, advertiseData);

            dataservice.getAdvertises()
                .then(function (data) {
                    //dump(angular.mock.dump(data));
                    response = data;
                });

            $httpBackend.flush(); //resolve

            expect(response).toEqual(advertiseData);

        });

        fit('should get advertise by id', function () {
            var response;

            //с помощью функции в первом параметре и через dump можно посмотреть,
            //какой реальный url отсылает dataservice.getAdvertise(2)
            //аналогично можно пользоваться и в пост запросах для отсылаемого параметра. Удобно.
            var expectedUrlTest = function (urlData) {
                dump(angular.mock.dump('urlData '+urlData));
                return true;
            };

            var testedUrl = expectedUrl + '/' + advertiseData[0].id;
            dump(angular.mock.dump('testedUrl ' + testedUrl));

            $httpBackend.expectGET(expectedUrlTest)//2
                .respond(200, advertiseData[0]); //Тут должен быть не только статус, как в getAdvertises, а ещё и ответ.
                                                //если статус указать, положим 404, то тест не будет пройден

            dataservice.getAdvertise(2)
                .then(function (data) {
                    response = data;
                });

            //http://stackoverflow.com/questions/15048132/angularjs-promise-not-being-resolved-in-unit-test
            $httpBackend.flush();
            expect(response).toEqual(advertiseData[0]);

        });


        it('should create advertise', function () {

            var expectedData = function (data) {
                //'{"id":null,"seller_name":"Иванов","allow_mails":0,"phone":"","title":"223232","description":"23234","price":"2000","location_id":1,"category_id":226,"organization_form_id":0,"email":""}'
                //dump(angular.mock.dump(data));  //id исчезает
                return true;
            };

            //на запрос по данному адресу, с данными
            $httpBackend.expectPOST(expectedUrl, expectedData) //HTTP request body
                // or function that receives data string and returns true if the
                // data is as expected,
                // or Object if request body is in JSON format.

                .respond(201); //http header CREATED


            dataservice.save(newAdvertiseData);
            expect($httpBackend.flush).not.toThrow();

        });

        it('should update advertise', function () {

            var expectedData = function (data) {
                //dump(angular.mock.dump(data));
                //разные варианты обработки data: через объект, функцию и т.д. (см. документацию)
                return angular.fromJson(data).id === 2;
            };

            //на запрос по данному адресу, с данными
            $httpBackend.expectPUT(expectedUrl + '/' + advertiseData[0].id, expectedData)
                .respond(200); //http header Ok


            dataservice.save(advertiseData[0]);
            expect($httpBackend.flush).not.toThrow();

        });


        afterEach(function () {
            //проверяем на неотправленные запросы и не отработанные expectations
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

    });

})();