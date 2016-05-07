(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .directive('focusIf', focusIf);

  /** @ngInject */
  function focusIf($timeout) {
    return {
      restrict: 'A',
      scope: {
        focusIf: '='
      },
      link: function(scope, element) {
        if (scope.focusIf) {
          $timeout(function () {
            element[0].focus();
          });
        }
      }
    }
  }
})();