(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TuluController', TuluController);

  /** @ngInject */
  function TuluController($uibModalInstance, tehingudService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: "tuhi"
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