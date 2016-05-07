(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .filter('tehinguTuup', tehinguTuupFilter);

  /** @ngInject */
  function tehinguTuupFilter($sce) {
    return function(input) {
      if (input === 'tuhi')
        return $sce.trustAsHtml('<span class="fa fa-ban"></span>');
      if (input === 'toode')
        return $sce.trustAsHtml('<span class="fa fa-qrcode"></span>');
      if (input === 'liige')
        return $sce.trustAsHtml('<span class="fa fa-male"></span>');
      if (input === 'taara')
        return $sce.trustAsHtml('<span class="fa fa-recycle"></span>');
      if (input === 'sularaha')
        return $sce.trustAsHtml('<span class="fa fa-money"></span>');
      if (input === 'arvelRaha')
        return $sce.trustAsHtml('<span class="fa fa-bank"></span>');
      return input;
    }
  }
})();