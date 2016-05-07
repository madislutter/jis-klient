(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .filter('tehinguLiik', tehinguLiik);

  /** @ngInject */
  function tehinguLiik() {
    return function(tehingud, filter) {
      var output = [];

      var passesFiltration;
      angular.forEach(tehingud, function(tehing){
        passesFiltration = true;

        if (tehing.deebet.tuup == 'tuhi' || tehing.kreedit.tuup == 'tuhi') {
          passesFiltration &= filter.tuhi;
        }
        if (tehing.deebet.tuup == 'sularaha' || tehing.kreedit.tuup == 'sularaha') {
          passesFiltration &= filter.sularaha;
        }
        if (tehing.deebet.tuup == 'arvelRaha' || tehing.kreedit.tuup == 'arvelRaha') {
          passesFiltration &= filter.arvelRaha;
        }
        if (tehing.deebet.tuup == 'liige' || tehing.kreedit.tuup == 'liige') {
          passesFiltration &= filter.liige;
        }
        if (tehing.deebet.tuup == 'toode' || tehing.kreedit.tuup == 'toode') {
          passesFiltration &= filter.toode;
        }
        if (tehing.deebet.tuup == 'taara' || tehing.kreedit.tuup == 'taara') {
          passesFiltration &= filter.taara;
        }

        if (passesFiltration) output.push(tehing);
      });

      return output;
    }
  }
})();