(function() {
  'use strict';

  angular
    .module('avalikjoodik')
    .service('tehingudService', tehingudService);

  /** @ngInject */
  function tehingudService(Restangular) {
    return Restangular.withConfig(configurer).service('tehingud');

    function configurer(RestangularConfigurer) {
      RestangularConfigurer.addResponseInterceptor(rikasta);
    }

    function rikasta(data, operation) {
      if (operation === 'getList') {
        angular.forEach(data, rikastaTehingut);
      } else if (operation === 'get') {
        rikastaTehingut(data);
      }

      return data;
    }

    function rikastaTehingut(t) {
      if (t.kreedit.tuup === 'toode') {
        t.kreedit.toode.badge = [t.kreedit.toode.taara, t.kreedit.toode.uhikuKogus].filter(function(e) {return e;}).join(', ');
      }
      if (t.deebet.tuup === 'toode') {
        t.deebet.toode.badge = [t.deebet.toode.taara, t.deebet.toode.uhikuKogus].filter(function(e) {return e;}).join(', ');
      }
    }
  }
})();