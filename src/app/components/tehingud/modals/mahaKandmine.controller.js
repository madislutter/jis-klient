(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('MahaKandmineController', MahaKandmineController);

  /** @ngInject */
  function MahaKandmineController($uibModalInstance, tehingudService, $q, toode, tootedService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'toode',
        summa: null,
        kogus: null,
        toode: toode
      },
      deebet: {
        tuup: 'tuhi'
      }
    }

    vm.taaraPurunes = null;
    vm.taaraTehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'taara',
        summa: null
      },
      deebet: {
        tuup: 'tuhi'
      }
    }

    vm.toodeReadonly = !!toode;
    vm.tooted = [];

    vm.toode = toode;
    vm.summaTaaraga;
    vm.syncSumma = syncSumma;
    vm.syncSelgitus = syncSelgitus;

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    activate();

    function activate() {
      if (!toode) { // Kui kasutaja saab toodet valida
        tootedService.getList().then(function(tooted) {
          vm.tooted = tooted;
        });
      }
    }

    function syncSumma() {
      if (vm.tehing.kreedit.toode) {
        vm.tehing.kreedit.summa = vm.tehing.kreedit.kogus * vm.tehing.kreedit.toode.omahind;
        vm.taaraTehing.kreedit.summa = vm.tehing.kreedit.kogus * 0.1;

        vm.summaTaaraga = vm.tehing.kreedit.summa;
        if (vm.taaraPurunes && vm.tehing.kreedit.toode.taara)
          vm.summaTaaraga += vm.taaraTehing.kreedit.summa;
      } else {
        vm.summaTaaraga = null;
      }
    }

    function syncSelgitus() {
      vm.taaraTehing.selgitus = vm.tehing.selgitus;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      if (vm.taaraPurunes) {
        $q.all([tehingudService.post(vm.tehing), tehingudService.post(vm.taaraTehing)], function(tehingud) {
          $uibModalInstance.close(tehingud);
        }).catch(function() {
          $uibModalInstance.dismiss();
        });
      } else {
        tehingudService.post(vm.tehing).then(function(tehing) {
          $uibModalInstance.close([tehing]);
        }, function() {
          $uibModalInstance.dismiss();
        });
      }
    }
  }
})();