(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('tootedService', tootedService);

  /** @ngInject */
  function tootedService(Restangular, moment) {
    return Restangular.withConfig(configurer).service('tooted');

    function configurer(RestangularConfigurer) {
      RestangularConfigurer.addResponseInterceptor(rikasta);
    }

    function rikasta(tooted, operation) {
      if (operation === 'getList') {
        var kuuHiljem = moment().add(1, 'month');

        angular.forEach(tooted, function (t) {
          t.badge = [t.taara, t.uhikuKogus].filter(function(e) {return e;}).join(', ');
          t.aegumas = moment(t.aegumiskuupaev) < kuuHiljem;
        });
      }

      return tooted;
    }
  }
})();