(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('ArhiveeriLiigeController', ArhiveeriLiigeController);

  /** @ngInject */
  function ArhiveeriLiigeController($uibModalInstance, liige) {
    var vm = this;

    vm.liige = liige;

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      liige.remove().then(function() {
        $uibModalInstance.close();
      }, function() {
        $uibModalInstance.dismiss();
      })
    }
  }
})();