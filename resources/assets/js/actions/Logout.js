import Actions from './AppActions.js';
import Router from '../router.js';

import { LOG_OUT, LOG_IN } from '../constants.js';

Actions.register(LOG_OUT, payload => {
  fetch(Router.route(LOG_OUT),
    Router.method('POST')
  ).then( response => {
    window.location.href = Router.route(LOG_IN);
  });

});
