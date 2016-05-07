(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('InventuuridController', InventuuridController);

  /** @ngInject */
  function InventuuridController(inventuuridService, $uibModal, toastr, _, $sce, moment) {
    var vm = this;
    vm.inventuurid = [];

    vm.uusInventuur = uusInventuur;
    vm.muuda = muuda;
    vm.kustuta = kustuta;

    vm.daterangeFilter = {
      alates: new Date(moment().add(-7, "days")),
      kuni: new Date()
    }
    vm.daterangeAlatesOptions = {
      showWeeks: false,
      maxDate: vm.daterangeFilter.kuni
    };
    vm.daterangeKuniOptions = {
      showWeeks: false,
      minDate: vm.daterangeFilter.alates,
      maxDate: new Date()
    };
    vm.inputFormats = [
      'dd. MMMM yyyy',
      'd.M.yyyy',
      'd.MM.yyyy',
      'dd.M.yyyy',
      'dd.MM.yyyy'
    ];

    activate();

    function activate() {
      inventuuridService.getList().then(function(inventuurid) {
        vm.inventuurid = inventuurid;
      });
    }

    function uusInventuur() {
      $uibModal.open({
        templateUrl: 'app/components/inventuurid/modals/uusInventuur.modal.html',
        controller: 'UusInventuurController as vm',
        size: 'lg2',
        resolve: {
          inventuur: function() {
            return inventuuridService.one('uus').get();
          }
        }
      })
      .result.then(function(info) {
        toastr.success(info);
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Inventuuri ei salvestatud!');
      });
    }

    function muuda(id) {
      $uibModal.open({
        templateUrl: 'app/components/inventuurid/modals/inventuur.modal.html',
        controller: 'InventuurController as vm',
        size: 'lg2',
        resolve: {
          inventuur: function() {
            return inventuuridService.one(id).get();
          }
        }
      })
      .result.then(function(inventuur) {
        // Uuenda
        var idx = _.findIndex(vm.inventuurid, function(i) { return i.id === id; });
        vm.inventuurid[idx] = inventuur;
        toastr.success('Muudatused salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Muudatusi ei salvestatud!');
      });
    }

    function kustuta(id) {
      $uibModal.open({
        templateUrl: 'app/components/inventuurid/modals/kustuta.modal.html',
        controller: 'InventuurKustutaController as vm'
      })
      .result.then(function() {
        var idx = _.findIndex(vm.inventuurid, function(i) { return i.id === id; });
        vm.inventuurid[idx].remove().then(function() {
          vm.inventuurid.splice(idx, 1);
          toastr.success('Inventuur kustutati!');
        });
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Inventuuri ei kustutatud!');
      });
    }
  }
})();