(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tooted', {
        url: '/tooted',
        templateUrl: 'app/components/tooted/tooted.html',
        controller: 'TootedController as vm'
      })
      .state('liikmed', {
        url: '/liikmed',
        templateUrl: 'app/components/liikmed/liikmed.html',
        controller: 'LiikmedController as vm'
      })
      .state('tehingud', {
        url: '/tehingud',
        templateUrl: 'app/components/tehingud/tehingud.html',
        controller: 'TehingudController as vm'
      })
      .state('inventuurid', {
        url: '/inventuurid',
        templateUrl: 'app/components/inventuurid/inventuurid.html',
        controller: 'InventuuridController as vm'
      })
      .state('seaded', {
        url: '/seaded',
        templateUrl: 'app/components/seaded/seaded.html',
        controller: 'SeadedController as vm'
      });

    $urlRouterProvider.otherwise('/tooted');
  }

})();
