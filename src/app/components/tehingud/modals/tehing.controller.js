(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TehingController', TehingController);

  /** @ngInject */
  function TehingController($uibModalInstance, tehing, tootedService, liikmedService, _, moment) {
    var vm = this;

    vm.tehing = angular.copy(tehing);
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
      vm.tehing.aeg = new Date(vm.tehing.aeg);
      vm.tehing.kell = new Date(vm.tehing.aeg);
      if (vm.tehing.deebet.aegumiskuupaev) {
        vm.tehing.deebet.aegumiskuupaev = new Date(vm.tehing.deebet.aegumiskuupaev);
        vm.tehing.deebet.uhikuHind = vm.tehing.deebet.summa / vm.tehing.deebet.kogus;
      }

      tootedService.getList().then(function(tooted) {
        vm.tooted = tooted;
      });

      liikmedService.getList().then(function(liikmed) {
        vm.liikmed = liikmed;
      })
    }

    function arvutaKreeditSumma() {
      if (vm.tehing.kreedit.toode)
        vm.tehing.kreedit.summa = vm.tehing.kreedit.toode.omahind * vm.tehing.kreedit.kogus;
    }

    function arvutaDeebetUhikuHind() {
      vm.tehing.deebet.uhikuHind = vm.tehing.deebet.summa / vm.tehing.deebet.kogus;
    }

    function syncDeebetSumma() {
      if (vm.tehing.deebet.tuup !== 'tuhi')
        vm.tehing.deebet.summa = vm.tehing.kreedit.summa;
      if (vm.tehing.deebet.tuup === 'toode')
        arvutaDeebetUhikuHind();
    }

    function syncKreeditSumma() {
      if (vm.tehing.kreedit.tuup !== 'toode' && vm.tehing.kreedit.tuup !== 'tuhi')
        vm.tehing.kreedit.summa = vm.tehing.deebet.summa;
    }

    function onKreeditTuupChanged() {
      if (vm.tehing.kreedit.tuup === 'tuhi') {
        vm.tehing.kreedit.summa = 0;
      } else if (vm.tehing.kreedit.tuup === 'toode') {
        vm.tehing.kreedit.summa = 0;
        arvutaKreeditSumma();
      } else {
        syncKreeditSumma();
      }
    }

    function onDeebetTuupChanged() {
      if (vm.tehing.deebet.tuup === 'tuhi') {
        vm.tehing.deebet.summa = 0;
      } else if (vm.tehing.deebet.tuup === 'toode') {
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
      var kuupaev = moment(vm.tehing.aeg);
      var kell = moment(vm.tehing.kell);
      kuupaev.hours(kell.hours()).minutes(kell.minutes()).seconds(kell.seconds());
      vm.tehing.aeg = kuupaev.toISOString();
      // Tee päring serverile
      vm.tehing.save().then(function(data) {
        $uibModalInstance.close(data);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();