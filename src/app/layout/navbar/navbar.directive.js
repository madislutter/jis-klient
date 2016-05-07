(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .directive('jvNavbar', jvNavbar);

  /** @ngInject */
  function jvNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/navbar/navbar.html',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function NavbarController(varadService) {
      var vm = this;
      vm.sularaha = 0;
      vm.arvelRaha = 0;
      vm.krediit = 0;
      vm.tooted = 0;
      vm.taara = 0;
      vm.varadKokku = 0;

      activate();

      function activate() {
        varadService.getList().then(function(data) {
          var hiliseimSeis = data[0];
          vm.sularaha = hiliseimSeis.sularaha;
          vm.arvelRaha = hiliseimSeis.arvelRaha;
          vm.tooted = hiliseimSeis.tooted;
          vm.taara = hiliseimSeis.taara;
          vm.krediit = hiliseimSeis.krediit;
          vm.varadKokku = hiliseimSeis.sularaha + hiliseimSeis.arvelRaha + hiliseimSeis.tooted + hiliseimSeis.taara + hiliseimSeis.krediit;
        })
      }
    }
  }
})();