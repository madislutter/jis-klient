(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .controller('LiigeController', LiigeController);

  /** @ngInject */
  function LiigeController($uibModalInstance, liige) {
    var vm = this;

    vm.liige = liige;

    vm.loobu = loobu;
    vm.salvesta = salvesta;

    function loobu() {
      $uibModalInstance.dismiss('loobu');
    }

    function salvesta() {
      vm.liige.save().then(function(liige) {
        $uibModalInstance.close(liige);
      }, function() {
        $uibModalInstance.dismiss();
      });
    }
  }
})();