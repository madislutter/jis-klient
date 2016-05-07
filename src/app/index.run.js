(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Restangular, toastr) {
    Restangular.setErrorInterceptor(function(response) {
      $log.debug('Restangular error catched in config', response);
      toastr.error('Jama lugu! Server ütles: ' + response.data + '(' + response.status + ')');
    });

    // Siin võiks cache'ida tooted ja liikmed?
    $log.debug('runBlock end');
  }

})();
