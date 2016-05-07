(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('UusLiigeController', UusLiigeController);

  /** @ngInject */
  function UusLiigeController($uibModalInstance, liikmedService) {
    var vm = this;

    vm.uusLiige = {
        "nimi": null,
        "staatus": null,
        "koondis": null,
        "meiliaadress": null,
        "telefon": null
      };

    vm.loobu = loobu;
    vm.salvesta = salvesta;

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function salvesta() {
      liikmedService.post(vm.uusLiige).then(function(liige) {
        $uibModalInstance.close(liige);
      }, function() {
        $uibModalInstance.dismiss();
      })
    }
  }
})();