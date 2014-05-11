define([
    'angular',
    'mock',
    'app',
    'components/product/controllers/ProductController',
], function (angular, mock, App, ProductController, Events) {

    module(App.initialize);

    describe('Product-page controller', function () {
        var scope, subject;

        beforeEach(function () {
            inject(function ($q, $rootScope, $controller, $injector) {
                scope = $rootScope.$new();
                subject = $controller(ProductController.controller, {
                    '$scope': scope,
                    '$product': null
                });
            });

        });

        it("should to be defined, as well as its scope", function () {
            expect(subject).not.toBe(undefined);
            expect(scope).not.toBe(null);
        });


    });
});
