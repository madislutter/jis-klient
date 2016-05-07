(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .factory('_', lodash)
    .factory('moment', moment);

  /** @ngInject */
  function lodash($window) {
    return $window._;
  }

  function moment($window) {
    return $window.moment;
  }
})();