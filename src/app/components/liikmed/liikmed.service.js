(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('liikmedService', liikmedService);

  /** @ngInject */
  function liikmedService(Restangular) {
    return Restangular.service('liikmed');
  }
})();