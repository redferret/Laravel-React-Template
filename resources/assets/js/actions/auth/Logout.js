import Actions from '../AppActions.js';
import Axios from 'axios';
import Router, { checkStatus, handleError } from '../../router.js';

import { LOG_OUT } from '../../constants.js';

Actions.register(LOG_OUT, payload => {
  Axios(Router.request('POST', LOG_OUT))
  .then(checkStatus)
  .then(response =>  {
    Router.relocateTo(response.request.responseURL);
  }).catch(handleError);
});
