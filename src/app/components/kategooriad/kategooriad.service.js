(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('kategooriadService', kategooriadService);

  /** @ngInject */
  function kategooriadService(Restangular) {
    return Restangular.service('kategooriad');
  }
})();