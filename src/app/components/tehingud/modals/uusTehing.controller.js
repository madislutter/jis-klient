(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('UusTehingController', UusTehingController);

  /** @ngInject */
  function UusTehingController($uibModalInstance, tehingudService, tootedService, liikmedService, _, moment) {
    var vm = this;

    vm.uusTehing = {
        "aeg": new Date(),
        "kell": new Date(),
        "selgitus": null,
        "kreedit": {
          "tuup": null,
          "summa": null
        },
        "deebet": {
          "tuup": null,
          "summa": null
        }
      };
    vm.tooted = [];
    vm.liikmed = [];

    vm.datepickerOptions = {
      maxMode: 'month',
      showWeeks: false,
      maxDate: new Date()
    };
    vm.aegumineDatepickerOptions = {
      datepickerMode: 'month',
      maxMode: 'month',
      showWeeks: false
    };
    vm.inputFormats = [
      'dd. MMMM yyyy',
      'd.M.yyyy',
      'd.MM.yyyy',
      'dd.M.yyyy',
      'dd.MM.yyyy'
    ];
    vm.arvutaKreeditSumma = arvutaKreeditSumma;
    vm.arvutaDeebetUhikuHind = arvutaDeebetUhikuHind;
    vm.syncDeebetSumma = syncDeebetSumma;
    vm.syncKreeditSumma = syncKreeditSumma;
    vm.onKreeditTuupChanged = onKreeditTuupChanged;
    vm.onDeebetTuupChanged = onDeebetTuupChanged;
    vm.inArray = inArray;

    vm.loobu = loobu;
    vm.kinnita = kinnita;

    activate();

    function activate() {
      tootedService.getList().then(function(tooted) {
        vm.tooted = tooted;
      });

      liikmedService.getList().then(function(liikmed) {
        vm.liikmed = liikmed;
      })
    }

    function arvutaKreeditSumma() {
      if (vm.uusTehing.kreedit.toode)
        vm.uusTehing.kreedit.summa = vm.uusTehing.kreedit.toode.omahind * vm.uusTehing.kreedit.kogus;
    }

    function arvutaDeebetUhikuHind() {
      vm.uusTehing.deebet.uhikuHind = vm.uusTehing.deebet.summa / vm.uusTehing.deebet.kogus;
    }

    function syncDeebetSumma() {
      if (vm.uusTehing.deebet.tuup !== 'tuhi')
        vm.uusTehing.deebet.summa = vm.uusTehing.kreedit.summa;
      if (vm.uusTehing.deebet.tuup === 'toode')
        arvutaDeebetUhikuHind();
    }

    function syncKreeditSumma() {
      if (vm.uusTehing.kreedit.tuup !== 'toode' && vm.uusTehing.kreedit.tuup !== 'tuhi')
        vm.uusTehing.kreedit.summa = vm.uusTehing.deebet.summa;
    }

    function onKreeditTuupChanged() {
      if (vm.uusTehing.kreedit.tuup === 'tuhi') {
        vm.uusTehing.kreedit.summa = 0;
      } else if (vm.uusTehing.kreedit.tuup === 'toode') {
        vm.uusTehing.kreedit.summa = 0;
        arvutaKreeditSumma();
      } else {
        syncKreeditSumma();
      }
    }

    function onDeebetTuupChanged() {
      if (vm.uusTehing.deebet.tuup === 'tuhi') {
        vm.uusTehing.deebet.summa = 0;
      } else if (vm.uusTehing.deebet.tuup === 'toode') {
        syncDeebetSumma();
        arvutaDeebetUhikuHind();
      } else {
        syncDeebetSumma();
      }
    }

    function inArray(needle, haystack) {
      return haystack.indexOf(needle) != -1;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function kinnita() {
      // Pane kellaaeg kuupäevaga kokku
      var kuupaev = moment(vm.uusTehing.aeg);
      var kell = moment(vm.uusTehing.kell);
      kuupaev.hours(kell.hours()).minutes(kell.minutes()).seconds(kell.seconds());
      vm.uusTehing.aeg = kuupaev.toISOString();
      // Tee päring serverile
      tehingudService.post(vm.tehing).then(function(data) {
        $uibModalInstance.close(data);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();