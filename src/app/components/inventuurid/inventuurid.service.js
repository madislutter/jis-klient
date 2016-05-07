(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('inventuuridService', inventuuridService);

  /** @ngInject */
  function inventuuridService(Restangular) {
    return Restangular.service('inventuurid');
  }
})();