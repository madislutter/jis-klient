(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .directive('prohibitZero', prohibitZero);

  /** @ngInject */
  function prohibitZero() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if (parseFloat(viewValue) === 0) {
            ctrl.$setValidity('zero', false);
          } else {
            ctrl.$setValidity('zero', true);
          }
          return viewValue;
        });
      }
    }
  }
})();