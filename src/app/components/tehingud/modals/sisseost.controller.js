(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('SisseostController', SisseostController);

  /** @ngInject */
  function SisseostController($uibModalInstance, tehingudService, toode, tootedService, $q, moment) {
    var vm = this;

    vm.tehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'arvelRaha',
        summa: null
      },
      deebet: {
        tuup: 'toode',
        kogus: null,
        summa: null,
        uhikuHind: null,
        aegumiskuupaev: null,
        toode: toode
      }
    }

    vm.taaraTehing = {
      aeg: new Date(),
      selgitus: null,
      kreedit: {
        tuup: 'arvelRaha',
        summa: null
      },
      deebet: {
        tuup: 'taara',
        summa: null
      }
    }

    vm.toodeReadonly = !!toode;
    vm.tooted = [];

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    vm.uuendaUhikuHind = uuendaUhikuHind;
    vm.syncSumma = syncSumma;
    vm.syncMakseviis = syncMakseviis;
    vm.datepickerOpen = false;
    vm.datepickerToggle = datepickerToggle;
    vm.datepickerOptions = {
      datepickerMode: 'month',
      maxMode: 'month',
      showWeeks: false
    };
    vm.datePlaceholder = moment().add(6, 'months').format();
    vm.inputFormats = [
      'dd. MMMM yyyy',
      'd.M.yyyy',
      'd.MM.yyyy',
      'dd.M.yyyy',
      'dd.MM.yyyy'
    ];

    activate();

    function activate() {
      if (!toode) { // Kui kasutaja saab toodet valida
        tootedService.getList().then(function(tooted) {
          vm.tooted = tooted;
        });
      }
    }

    function datepickerToggle() {
      vm.datepickerOpen = !vm.datepickerOpen;
    }

    function uuendaUhikuHind() {
      vm.tehing.deebet.uhikuHind = vm.tehing.deebet.summa / vm.tehing.deebet.kogus;
    }

    function syncSumma() {
      uuendaUhikuHind();
      vm.tehing.kreedit.summa = vm.tehing.deebet.summa;
      vm.taaraTehing.kreedit.summa = vm.tehing.deebet.kogus * 0.1;
      vm.taaraTehing.deebet.summa = vm.tehing.deebet.kogus * 0.1;
    }

    function syncMakseviis() {
      vm.taaraTehing.kreedit.tuup = vm.tehing.kreedit.tuup;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      $q.all([tehingudService.post(vm.tehing), tehingudService.post(vm.taaraTehing)], function(tehingud) {
        $uibModalInstance.close(tehingud);
      }).catch(function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();