(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('KuluController', KuluController);

  /** @ngInject */
  function KuluController($uibModalInstance, tehingudService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: "arvelRaha",
        summa: null
      },
      deebet: {
        tuup: "tuhi"
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