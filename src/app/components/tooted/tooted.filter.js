(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .filter('tooted', tootedFilter);

  /** @ngInject */
  function tootedFilter() {
    return function(tooted, filter) {
      var output = [];

      angular.forEach(tooted, function(t) {
        var passesArhiveeritud = false;

        if (filter.arhiveeritud) {
          passesArhiveeritud |= t.arhiveeritud;
        }
        if (filter.kasutuses) {
          passesArhiveeritud |= !t.arhiveeritud;
        }

        var passesKategooria = false;
        if (t.kategooriad.length === 0) {
          passesKategooria = true;
        } else {
          angular.forEach(filter.kategooriad, function(v, k) {
            if (v)
              passesKategooria |= t.kategooriad.some(function (tk) { return tk.nimi == k; });
          });
        }

        if (passesArhiveeritud && passesKategooria)
          output.push(t);
      });

      return output;
    };
  }
})();