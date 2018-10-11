import Actions from '../AppActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Axios from 'axios';
import Router, { checkStatus, parseJSON } from '../../router.js';

import { REGISTER } from '../../constants.js';

Actions.register(REGISTER, payload => {
  Axios(Router.request('POST', REGISTER, {
    data: payload.values
  }))
  .then(checkStatus)
  .then(response => {
    Router.relocateTo(response.request.responseURL);
  }).catch(error => {
    AuthStore.setErrors(error.response.data.errors);
    Actions.finish(payload);
  });
});
