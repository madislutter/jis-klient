(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .directive('inventuurSummaLabel', inventuurSummaLabel);

  /** @ngInject */
  function inventuurSummaLabel($compile) {
    return {
      restrict: 'E',
      scope: {
        inventuur: '=',
        vara: '='
      },
      link: function(scope, element) {
        var ikoon = '';
        var labelClass = '';
        var varaCapital = '';
        switch (scope.vara) {
          case 'sularaha':
            ikoon = '<i class="fa fa-money"></i>';
            varaCapital = 'Sularaha';
            break;
          case 'tootedKokku':
            ikoon = '<i class="fa fa-qrcode"></i>';
            varaCapital = 'Tooteid';
            break;
          case 'taara':
            ikoon = '<i class="fa fa-recycle"></i>';
            varaCapital = 'Taarat';
            break;
        }

        if (scope.inventuur.loetud[scope.vara] < scope.inventuur.eeldatav[scope.vara]) {
          labelClass = 'label label-lg label-danger';
        } else if (scope.inventuur.loetud[scope.vara] > scope.inventuur.eeldatav[scope.vara]) {
          labelClass = 'label label-lg label-warning';
        } else {
          labelClass = 'label label-lg label-success';
        }

        if (scope.inventuur.loetud[scope.vara] !== scope.inventuur.eeldatav[scope.vara]) {
          element.html('<span class="'+labelClass+'" uib-tooltip="'+varaCapital+' pidanuks olema {{inventuur.eeldatav[vara] | currency}}" tooltip-placement="top-left">'+ikoon+' {{inventuur.loetud.'+scope.vara+' | currency}}</span>');
        } else {
          element.html('<span class="label label-lg label-success">'+ikoon+' {{inventuur.loetud.'+scope.vara+' | currency}}</span>');
        }

        $compile(element.contents())(scope);
      }
    }
  }
})();