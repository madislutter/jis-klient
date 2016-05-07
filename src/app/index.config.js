(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, stConfig, RestangularProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.progressBar = true;

    // Smart-table configuration
    stConfig.sort.delay = 50;
    stConfig.sort.skipNatural = true;

    RestangularProvider.setBaseUrl('http://localhost:3002');
  }

})();
