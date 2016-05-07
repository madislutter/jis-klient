(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('TehingudController', TehingudController);

  /** @ngInject */
  function TehingudController(tehingudService, inventuuridService, toastr, moment, _, $uibModal) {
    var vm = this;

    vm.tehingud = [];
    vm.inventuurideAjad = [];

    vm.daterangeFilter = {
      alates: new Date(moment().add(-7, "days")),
      kuni: new Date()
    };
    vm.daterangeAlatesOptions = {
      showWeeks: false,
      maxDate: vm.daterangeFilter.kuni,
      customClass: ajafilterKlassid
    };
    vm.daterangeKuniOptions = {
      showWeeks: false,
      minDate: vm.daterangeFilter.alates,
      maxDate: new Date(),
      customClass: ajafilterKlassid
    };
    vm.inputFormats = [
      'dd. MMMM yyyy',
      'd.M.yyyy',
      'd.MM.yyyy',
      'dd.M.yyyy',
      'dd.MM.yyyy'
    ];

    vm.tehinguLiikFilter = {
      'tuhi': true,
      'sularaha': true,
      'arvelRaha': true,
      'liige': true,
      'toode': true,
      'taara': true,
      'kasumlik': true,
      'kahjumlik': true,
      'neutraalne': true,
      'susteem': true,
      'revisjon': true
    }

    vm.tehinguKlass = tehinguKlass;
    vm.kustuta = kustuta;
    vm.muuda = muuda;

    vm.lisaUusTehing = lisaUusTehing;
    vm.taaraViimine = taaraViimine;
    vm.sulaArvele = sulaArvele;
    vm.sulaArvelt = sulaArvelt;
    vm.kulu = kulu;
    vm.tulu = tulu;
    vm.tarbimine = tarbimine;
    vm.ettemaks = ettemaks;
    vm.mahaKandmine = mahaKandmine;
    vm.sisseost = sisseost;

    activate();

    function activate() {
      tehingudService.getList().then(function(data) {
        vm.tehingud = data;
      });

      inventuuridService.getList().then(function(data) {
        vm.inventuurideAjad = _.map(data, function(i) { return i.aeg; });
      });

    }

    function ajafilterKlassid(data) {
      if (data.mode === 'day') {
        if (vm.inventuurideAjad.some(function(it) { return moment(data.date).isSame(it, 'day'); }))
          return 'inventuur'
      }
      return '';
    }

    function tehinguKlass(tehing) {
      if (!tehing.muudetav) {
        return 'info';
      }
      if (!tehing.legaalne) {
        return 'warning';
      }
      if (tehing.deebet.summa > tehing.kreedit.summa) {
        return 'success';
      } else if (tehing.deebet.summa < tehing.kreedit.summa) {
        return 'danger';
      }
      return '';
    }

    function kustuta(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/kustuta.modal.html',
        controller: 'TehingKustutaController as vm'
      })
      .result.then(function() {
        vm.tehingud.one(id).remove().then(function() {
          var idx = _.findIndex(vm.tehingud, function(t) { return t.id === id; });
          vm.tehingud.splice(idx, 1);
          // Sellele järgnevad tehingud võisid muutuda legaalseks
          toastr.success('Tehing kustutati!');
        });
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei kustutatud!');
      });
    }

    function lisaUusTehing() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/uusTehing.modal.html',
        controller: 'UusTehingController as vm',
        size: 'lg2'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Uus tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function muuda(id) {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/tehing.modal.html',
        controller: 'TehingController as vm',
        size: 'lg2',
        resolve: {
          tehing: function() {
            return vm.tehingud.get(id);
          }
        }
      })
      .result.then(function(tehing) {
        var idx = _.findIndex(vm.tehingud, function(t) { return t.id === id; });
        vm.tehingud[idx] = tehing;
        // Sellele järgnevad tehingud võisid muutuda illegaalseks. Kontrollida.
        toastr.success('Muudatused salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Muudatusi ei salvestatud!');
      });
    }

    function tarbimine() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/tarbimine.modal.html',
        controller: 'TarbimineController as vm',
        resolve: {
          liige: undefined
        }
      })
      .result.then(function(tehingud) {
        angular.forEach(tehingud, function(t) {
          vm.tehingud.push(t);
        });
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        if (tehingud.length > 1) {
          toastr.success('Tehingud salvestati!');
        } else {
          toastr.success('Tehing salvestati!');
        }
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function ettemaks() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/ettemaks.modal.html',
        controller: 'EttemaksController as vm',
        resolve: {
          liige: undefined
        }
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function sisseost() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/sisseost.modal.html',
        controller: 'SisseostController as vm',
        resolve: {
          toode: undefined
        }
      })
      .result.then(function(tehingud) {
        angular.forEach(tehingud, function(t) {
          vm.tehingud.push(t);
        });
        // Sellele järgnevad tehingud võisid muutuda legaalseks
        toastr.success('Tehingud salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function mahaKandmine() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/mahaKandmine.modal.html',
        controller: 'MahaKandmineController as vm',
        resolve: {
          toode: undefined
        }
      })
      .result.then(function(tehingud) {
        angular.forEach(tehingud, function(t) {
          vm.tehingud.push(t);
        });
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        if (tehingud.length > 1) {
          toastr.success('Tehingud salvestati!');
        } else {
          toastr.success('Tehing salvestati!');
        }
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function taaraViimine() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/taaraViimine.modal.html',
        controller: 'TaaraViimineController as vm'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function sulaArvele() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/sularahaArvele.modal.html',
        controller: 'SularahaArveleController as vm'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function sulaArvelt() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/sularahaArvelt.modal.html',
        controller: 'SularahaArveltController as vm'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function tulu() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/tulu.modal.html',
        controller: 'TuluController as vm'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }

    function kulu() {
      $uibModal.open({
        templateUrl: 'app/components/tehingud/modals/kulu.modal.html',
        controller: 'KuluController as vm'
      })
      .result.then(function(tehing) {
        vm.tehingud.push(tehing);
        // Sellele järgnevad tehingud võisid muutuda illegaalseks
        toastr.success('Tehing salvestati!');
      }).catch(function(error) {
        if (error == 'backdrop click' || error == 'loobu')
          toastr.warning('Tehingut ei salvestatud!');
      });
    }
  }
})();