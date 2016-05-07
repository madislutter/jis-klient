(function() {
  'use strict';

  describe('tootedService', function() {
    var tootedService, httpBackend;
    beforeEach(module('avalikjoodik'));
    beforeEach(inject(function(_tootedService_, $httpBackend) {
      tootedService = _tootedService_;
      httpBackend = $httpBackend;
    }));

    it('should registrate the dependencies', function() {
      expect(tootedService).not.toEqual(null);
      expect(httpBackend).not.toEqual(null);
    });
  });
})();