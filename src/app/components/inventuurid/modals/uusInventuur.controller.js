(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('UusInventuurController', UusInventuurController);

  /** @ngInject */
  function UusInventuurController($uibModalInstance, inventuur, inventuuridService, liikmedService, $scope, $filter) {
    var vm = this;

    vm.inventuur = inventuur;
    vm.onKaubaKogusChanged = onKaubaKogusChanged;
    vm.tuhiTaaraVordne = tuhiTaaraVordne;
    vm.sularahaVordne = sularahaVordne;
    vm.uuendaLoetudKokku = uuendaLoetudKokku;

    vm.liikmed = [];
    vm.liigeAutoComplete = liigeAutoComplete;

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
      liikmedService.getList().then(function(liikmed) {
        // Tegelikult peaks fetchima ainult liikmed, kelle roll on 'joogivanem' või 'revisjon'
        vm.liikmed = liikmed;
      });

      vm.inventuur.aeg = new Date();

      var eeldatavKaubaTaara = 0;
      angular.forEach(vm.inventuur.tooted, function(t) {
        t.badge = [t.taara, t.uhikuKogus].filter(function(e) {return e;}).join(', ');
        if (t.taara) {
          eeldatavKaubaTaara += 0.1 * t.eeldatavKogus;
        }
      });
      vm.inventuur.eeldatav.kaubaTaara = eeldatavKaubaTaara;
      vm.inventuur.eeldatav.tuhiTaara = vm.inventuur.eeldatav.taara - eeldatavKaubaTaara;
      vm.inventuur.loetud.kaubaTaara = 0;
      
      $scope.$watch('vm.inventuur.loetud.tuhiTaara', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          var kt = vm.inventuur.loetud.kaubaTaara || 0;
          var tt = newValue || 0;
          vm.inventuur.loetud.taara = kt + tt;
          uuendaLoetudKokku();
        }
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
      inventuuridService.post(vm.inventuur).then(function(data) {
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

    function liigeAutoComplete(query) {
      return $filter('filter')(vm.liikmed, {nimi: query});
    }
  }
})();