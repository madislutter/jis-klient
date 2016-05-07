(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .filter('liige', liigeFilter);

  /** @ngInject */
  function liigeFilter() {
    return function(liikmed, filter) {
      var output = [];

      angular.forEach(liikmed, function(l) {
        var passesArhiveeritud = false;
        if (filter.arhiveeritud)
          passesArhiveeritud |= l.arhiveeritud;
        if (filter.kasutuses)
          passesArhiveeritud |= !l.arhiveeritud;

        var passesSaldo = false;
        if (l.saldo < 0) {
          if (filter.volaga) passesSaldo = true;
        } else if (l.saldo > 0) {
          if (filter.ettemaksuga) passesSaldo = true;
        } else {
          if (filter.nullis) passesSaldo = true;
        }

        if (passesArhiveeritud && passesSaldo)
          output.push(l);
      });

      return output;
    }
  }
})();