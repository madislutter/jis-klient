(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TaaraViimineController', TaaraViimineController);

  /** @ngInject */
  function TaaraViimineController($uibModalInstance, tehingudService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: "taara",
        summa: null
      },
      deebet: {
        tuup: "sularaha",
        summa: null
      }
    }

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      tehingudService.post(vm.tehing).then(function(data) {
        $uibModalInstance.close(data);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();