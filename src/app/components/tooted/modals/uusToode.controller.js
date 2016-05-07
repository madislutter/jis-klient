(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('UusToodeController', UusToodeController);

  /** @ngInject */
  function UusToodeController($uibModalInstance, tootedService, kategooriadService, $filter) {
    var vm = this;

    vm.uusToode = {
        "nimi": null,
        "taara": null,
        "uhikuKogus": null,
        "kogus": null,
        "muugihind": null,
        "triipkood": null,
        "kategooriad": []
      };
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
      tootedService.post(vm.uusToode).then(function(toode) {
        $uibModalInstance.close(toode);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();