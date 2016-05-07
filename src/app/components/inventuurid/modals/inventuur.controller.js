(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('InventuurController', InventuurController);

  /** @ngInject */
  function InventuurController($uibModalInstance, inventuur, $scope) {
    var vm = this;

    vm.inventuur = inventuur;
    vm.onKaubaKogusChanged = onKaubaKogusChanged;
    vm.tuhiTaaraVordne = tuhiTaaraVordne;
    vm.sularahaVordne = sularahaVordne;
    vm.uuendaLoetudKokku = uuendaLoetudKokku;

    vm.datepickerOptions = {
      maxMode: 'month',
      showWeeks: false,
      maxDate: new Date()
    };
    vm.inputFormats = [
      'dd. MMMM yyyy',
      'd.M.yyyy',
      'd.MM.yyyy',
      'dd.M.yyyy',
      'dd.MM.yyyy'
    ];

    vm.loobu = loobu;
    vm.salvesta = salvesta;

    activate();

    function activate() {
      vm.inventuur.aeg = new Date(vm.inventuur.aeg);

      var eeldatavKaubaTaara = 0;
      var loetudKaubaTaara = 0;
      angular.forEach(vm.inventuur.tooted, function(t) {
        t.badge = [t.taara, t.uhikuKogus].filter(function(e) {return e;}).join(', ');
        if (t.taara) {
          eeldatavKaubaTaara += 0.1 * t.eeldatavKogus;
          loetudKaubaTaara += 0.1 * t.loetudKogus;
        }
      });
      vm.inventuur.eeldatav.kaubaTaara = eeldatavKaubaTaara;
      vm.inventuur.eeldatav.tuhiTaara = vm.inventuur.eeldatav.taara - eeldatavKaubaTaara;
      vm.inventuur.loetud.kaubaTaara = loetudKaubaTaara;
      vm.inventuur.loetud.tuhiTaara = vm.inventuur.loetud.taara - loetudKaubaTaara;

      $scope.$watch('vm.inventuur.loetud.tuhiTaara', function(newValue) {
        vm.inventuur.loetud.taara = vm.inventuur.loetud.kaubaTaara + newValue;
        uuendaLoetudKokku();
      });
    }


    function onKaubaKogusChanged() {
      var kt = kaubaTaara();
      var tt = vm.inventuur.loetud.tuhiTaara || 0;
      vm.inventuur.loetud.kaubaTaara = kt;
      vm.inventuur.loetud.taara = kt + tt;

      vm.inventuur.loetud.tootedKokku = kaup();
      uuendaLoetudKokku();
    }

    function tuhiTaaraVordne() {
      var delta = 0.001;
      return Math.abs(vm.inventuur.eeldatav.tuhiTaara - vm.inventuur.loetud.tuhiTaara) < delta;
    }

    function sularahaVordne() {
      var delta = 0.001;
      return Math.abs(vm.inventuur.eeldatav.sularaha - vm.inventuur.loetud.sularaha) < delta;
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function salvesta() {
      vm.inventuur.save().then(function(data) {
        $uibModalInstance.close(data);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }

    function kaubaTaara() {
      var kaubaTaara = 0;
      angular.forEach(vm.inventuur.tooted, function(t) {
        if (t.taara) {
          var kogus = t.loetudKogus || 0;
          kaubaTaara += 0.1 * kogus;
        }
      });
      return kaubaTaara;
    }

    function kaup() {
      var summa = 0;
      angular.forEach(vm.inventuur.tooted, function(t) {
        var kogus = t.loetudKogus || 0;
        summa += t.omahind * kogus;
      });
      return summa;
    }

    function uuendaLoetudKokku() {
      var sularaha = vm.inventuur.loetud.sularaha || 0;
      var tootedKokku = vm.inventuur.loetud.tootedKokku || 0;
      var taara = vm.inventuur.loetud.taara || 0;
      vm.inventuur.loetud.kokku = sularaha + vm.inventuur.eeldatav.arvelRaha + vm.inventuur.eeldatav.krediit + taara + tootedKokku;
    }
  }
})();