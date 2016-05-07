(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('LiikmedController', LiikmedController);

  /** @ngInject */
  function LiikmedController(liikmedService, toastr, _, $uibModal) {
    var vm = this;

    vm.liikmed = [];
    vm.liikmeKlass = liikmeKlass;
    vm.filter = {
      'ettemaksuga': true,
      'nullis': true,
      'volaga': true,
      'kasutuses': true,
      'arhiveeritud': false
    }

    vm.lisaLiige = lisaLiige;

    vm.tarbimine = tarbimine;
    vm.ettemaks = ettemaks;
    vm.muuda = muuda;
    vm.arhiveeri = arhiveeri;
    vm.kustuta = kustuta;
    vm.ennista = ennista;

    activate();

    function activate() {
      return liikmedService.getList().then(function(liikmed) {
        vm.liikmed = liikmed;
      })
    }

    function liikmeKlass(liige) {
      if (liige.saldo > 0) {
        return 'success';
      } else if (liige.saldo < 0) {
        return 'danger';
      }
      return '';
    }

    function lisaLiige() {
      $uibModal.open({
        templateUrl: 'app/components/liikmed/modals/uusLiige.modal.html',
        controller: 'UusLiigeController as vm',
        size: 'lg'
      })
      .result.then(function(liige) {
        vm.liikmed.push(liige);
        toastr.success('Loodi uus liige!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Liiget ei loodud!');
      });
    }

    function arhiveeri(id) {
      $uibModal.open({
        templateUrl: 'app/components/liikmed/modals/arhiveeri.modal.html',
        controller: 'ArhiveeriLiigeController as vm',
        resolve: {
          liige: function() {
            return vm.liikmed.get(id);
          }
        }
      })
      .result.then(function() {
        var idx = _.findIndex(vm.liikmed, function(l) { return l.id === id; });
        vm.liikmed[idx].arhiveeritud = true;
        toastr.success('Liige arhiveeriti!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Liiget ei arhiveeritud!');
      });
    }

    function kustuta(id) {
      vm.liikmed.one(id).remove().then(function() {
        var idx = _.findIndex(vm.liikmed, function(l) { return l.id === id; });
        vm.liikmed.splice(idx, 1);
        toastr.success('Liige kustutati!');
      });
    }

    function ennista(id) {
      vm.liikmed.one(id).get().then(function(l) {
        l.arhiveeritud = false;
        l.save().then(function() {
          var idx = _.findIndex(vm.liikmed, function(l) { return l.id === id; });
          vm.liikmed[idx].arhiveeritud = false;
          toastr.success('Liige võeti uuesti kasutusse!');
        });
      })
    }

    function muuda(id) {
      $uibModal.open({
        templateUrl: 'app/components/liikmed/modals/liige.modal.html',
        controller: 'LiigeController as vm',
        size: 'lg',
        resolve: {
          liige: function() {
            return vm.liikmed.get(id);
          }
        }
      })
      .result.then(function(liige) {
        var idx = _.findIndex(vm.liikmed, function(l) { return l.id === id; });
        vm.liikmed[idx] = liige;
        toastr.success('Muudatused salvestati!');
      })
      .catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Muudatusi ei salvestatud!');
      });
    }

    function tarbimine(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/tarbimine.modal.html',
        controller: 'TarbimineController as vm',
        resolve: {
          liige: function() {
            return _.find(vm.liikmed, function(l) { return l.id === id; });
          }
        }
      })
      .result.then(function() {
        // Uuenda liiget
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function ettemaks(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/ettemaks.modal.html',
        controller: 'EttemaksController as vm',
        resolve: {
          liige: function() {
            return _.find(vm.liikmed, function(l) { return l.id === id; });
          }
        }
      })
      .result.then(function() {
        // Uuenda liiget
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }
  }
})();