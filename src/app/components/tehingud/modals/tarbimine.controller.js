(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TarbimineController', TarbimineController);

  /** @ngInject */
  function TarbimineController($uibModalInstance, tehingudService, $q, liige, tootedService, liikmedService) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'toode',
        summa: null,
        kogus: 1,
        toode: null
      },
      deebet: {
        tuup: 'liige',
        summa: null,
        liige: liige
      }
    }

    vm.taaraTehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'taara',
        summa: null
      },
      deebet: {
        tuup: 'sularaha',
        summa: null
      }
    }

    vm.koosTaaraga = false;
    vm.tooted = [];
    vm.liikmed = [];
    vm.liigeReadonly = !!liige;
    vm.syncSumma = syncSumma;
    vm.syncMakseviis = syncMakseviis;

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    activate();

    function activate() {
      tootedService.getList().then(function(data) {
        vm.tooted = data;
      });

      liikmedService.getList().then(function(data) {
        vm.liikmed = data;
      });
    }

    function syncSumma() {
      if (vm.tehing.kreedit.toode) {
        vm.tehing.kreedit.summa = vm.tehing.kreedit.toode.omahind * vm.tehing.kreedit.kogus;
        vm.tehing.deebet.summa = vm.tehing.kreedit.toode.muugihind * vm.tehing.kreedit.kogus;
        if (vm.koosTaaraga) {
          vm.taaraTehing.kreedit.summa = vm.tehing.kreedit.kogus * 0.1;
          vm.taaraTehing.deebet.summa = vm.tehing.kreedit.kogus * 0.1;
        }
      } else {
        vm.tehing.kreedit.summa = null;
        vm.tehing.deebet.summa = null;
      }
    }

    function syncMakseviis() {
      vm.taaraTehing.deebet.tuup = vm.tehing.deebet.tuup;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      if (vm.koosTaaraga) {
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