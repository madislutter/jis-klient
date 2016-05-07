(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('ToodeController', ToodeController);

  /** @ngInject */
  function ToodeController($uibModalInstance, toode, kategooriadService, $filter) {
    var vm = this;

    vm.toode = toode;
    vm.omabTaarat = !!vm.toode.taara;
    vm.kategooriad = [];
    vm.kategooriaAutoComplete = kategooriaAutoComplete;

    vm.loobu = loobu;
    vm.salvesta = salvesta;

    activate();

    function activate() {
      kategooriadService.getList().then(function(kategooriad) {
        vm.kategooriad = kategooriad;
      });
    }

    function kategooriaAutoComplete(query) {
      return $filter('filter')(vm.kategooriad, {nimi: query});
    }

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function salvesta() {
      vm.toode.save().then(function(toode) {
        $uibModalInstance.close(toode);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();