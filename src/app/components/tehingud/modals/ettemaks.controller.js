(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('EttemaksController', EttemaksController);

  /** @ngInject */
  function EttemaksController($uibModalInstance, tehingudService, liige, liikmedService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'liige',
        summa: null,
        liige: liige
      },
      deebet: {
        tuup: null,
        summa: null
      }
    }

    vm.liigeReadonly = !!liige;
    vm.liikmed = [];
    vm.syncSumma = syncSumma;

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    activate();

    function activate() {
      liikmedService.getList().then(function(data) {
        vm.liikmed = data;
      });
    }

    function syncSumma() {
      vm.tehing.kreedit.summa = vm.tehing.deebet.summa;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      // Kui summa oli negatiivne, siis vaheta deebet ja kreedit omavahel ära.
      if (vm.tehing.kreedit.summa < 0) {
        var temp = vm.tehing.kreedit;
        vm.tehing.kreedit = vm.tehing.deebet;
        vm.tehing.deebet = temp;
        vm.tehing.kreedit.summa *= -1;
        vm.tehing.deebet.summa *= -1;
      }

      tehingudService.post(vm.tehing).then(function(tehing) {
        $uibModalInstance.close(tehing);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();