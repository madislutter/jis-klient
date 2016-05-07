(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('SularahaArveleController', SularahaArveleController);

  /** @ngInject */
  function SularahaArveleController($uibModalInstance, tehingudService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: "sularaha",
        summa: null
      },
      deebet: {
        tuup: "arvelRaha",
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