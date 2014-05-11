define([
    'angular',
    'mock'
  ], function(angular,mock) {

  describe('Environment', function() {

    it('should have loaded angular mock', function(){
      expect(angular.mock).not.toBe(undefined);
    });

  });
});