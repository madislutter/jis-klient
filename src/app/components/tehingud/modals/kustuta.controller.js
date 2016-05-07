(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TehingKustutaController', TehingKustutaController);

  /** @ngInject */
  function TehingKustutaController($uibModalInstance) {
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