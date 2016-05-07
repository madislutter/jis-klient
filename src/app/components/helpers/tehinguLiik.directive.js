(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .directive('tehinguLiik', tehinguLiik);

  /** @ngInject */
  function tehinguLiik($compile) {
    return {
      restrict: 'A',
      scope: {
        tehinguLiik: '='
      },
      link: function(scope, element) {
        switch (scope.tehinguLiik.tuup) {
          case 'tuhi':
            element.html('<span class="fa fa-ban"></span>');
            break;
          case 'sularaha':
            element.html('<span class="fa fa-money"></span>');
            break;
          case 'arvelRaha':
            element.html('<span class="fa fa-bank"></span>');
            break;
          case 'liige':
            element.html('<span class="fa fa-male" uib-tooltip="'+scope.tehinguLiik.liige.nimi+'" tooltip-placement="bottom-left"></span>');
            break;
          case 'toode':
            // element.html('<span class="fa fa-qrcode" uib-tooltip="'+scope.tehinguLiik.toode.nimi+'" tooltip-placement="bottom-left"></span>');
            element.html('<span class="fa fa-qrcode" uib-tooltip-template="\'app/components/helpers/tehinguLiikToode.html\'" tooltip-placement="bottom-left"></span>');
            break;
          case 'taara':
            element.html('<span class="fa fa-recycle"></span>');
            break;
        }
        $compile(element.contents())(scope);
      }
    }
  }
})();