(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('varadService', varadService);

  /** @ngInject */
  function varadService(Restangular) {
    return Restangular.service('varad');
  }
})();