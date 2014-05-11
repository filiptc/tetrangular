describe('pinefor homepage', function () {

    beforeEach(function () {
        browser().navigateTo('/');
    });

    it('the url should be that of home', function () {
        expect(browser().window().href()).toEqual('http://localhost:9876/');
    });

});
