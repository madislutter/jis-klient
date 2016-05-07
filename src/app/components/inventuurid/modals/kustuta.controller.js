(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('InventuurKustutaController', InventuurKustutaController);

  /** @ngInject */
  function InventuurKustutaController($uibModalInstance) {
    var vm = this;

    vm.loobu = loobu;
    vm.kustuta = kustuta;

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kustuta() {
      $uibModalInstance.close();
    }
  }
})();