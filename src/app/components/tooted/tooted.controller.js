(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TootedController', TootedController);

  /** @ngInject */
  function TootedController(tootedService, kategooriadService, toastr, _, $filter, $uibModal) {
    var vm = this;

    vm.tooted = [];
    vm.kategooriad = [];
    vm.filter = {
      kasutuses: true,
      arhiveeritud: false,
      kategooriad: {}
    }

    vm.lisaToode = lisaToode;
    vm.muuda = muuda;
    vm.arhiveeri = arhiveeri;
    vm.kustuta = kustuta;
    vm.ennista = ennista;
    vm.sisseost = sisseost;
    vm.mahaKandmine = mahaKandmine;

    activate();

    function activate() {
      tootedService.getList().then(function(tooted) {
        vm.tooted = tooted;
      });

      uuendaKategooriaid();
    }

    function uuendaKategooriaid() {
      kategooriadService.getList().then(function(kategooriad) {
        vm.kategooriad = kategooriad;

        angular.forEach(vm.kategooriad, function(k) {
          if (!vm.filter.kategooriad.hasOwnProperty(k.nimi))
            vm.filter.kategooriad[k.nimi] = true;
        });
      });
    }

    function lisaToode() {
      $uibModal.open({
        templateUrl: 'app/components/tooted/modals/uusToode.modal.html',
        controller: 'UusToodeController as vm',
        size: 'lg'
      })
      .result.then(function(toode) {
        vm.tooted.push(toode);
        uuendaKategooriaid();
        toastr.success('Uus toode salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Uut toodet ei salvestatud!');
      });
    }

    function arhiveeri(id) {
      vm.tooted.one(id).remove().then(function(t) {
        var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
        vm.tooted[idx] = t;
        toastr.success('Toode arhiveeriti!');
      });
    }

    function kustuta(id) {
      vm.tooted.one(id).remove().then(function() {
        var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
        vm.tooted.splice(idx, 1);
        toastr.success('Toode kustutati!');
      });
    }

    function ennista(id) {
      vm.tooted.one(id).get().then(function(t) {
        t.arhiveeritud = false;
        t.save().then(function() {
          var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
          vm.tooted[idx].arhiveeritud = false;
          toastr.success('Toode võeti uuesti kasutusse!');
        });
      });
    }

    function muuda(id) {
      $uibModal.open({
        templateUrl: 'app/components/tooted/modals/toode.modal.html',
        controller: 'ToodeController as vm',
        size: 'lg',
        resolve: {
          toode: function() {
            return vm.tooted.get(id);
          }
        }
      })
      .result.then(function(toode) {
        var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
        vm.tooted[idx] = toode;
        uuendaKategooriaid();
        toastr.success('Muudatused salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Muudatusi ei salvestatud!');
      });
    }

    function sisseost(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/sisseost.modal.html',
        controller: 'SisseostController as vm',
        resolve: {
          toode: function() {
            return vm.tooted.get(id);
          }
        }
      })
      .result.then(function() {
        vm.tooted.get(id).then(function(toode) {
          var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
          vm.tooted[idx] = toode;
          toastr.success('Tehing salvestati!');
        });
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function mahaKandmine(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/mahaKandmine.modal.html',
        controller: 'MahaKandmineController as vm',
        resolve: {
          toode: function() {
            return vm.tooted.get(id);
          }
        }
      })
      .result.then(function() {
        vm.tooted.get(id).then(function(toode) {
          var idx = _.findIndex(vm.tooted, function(t) { return t.id === id; });
          vm.tooted[idx] = toode;
          toastr.success('Tehing salvestati!');
        });
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }
  }
})();