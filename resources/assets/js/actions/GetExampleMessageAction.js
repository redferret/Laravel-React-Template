import Actions from './AppActions.js';
import Axios from 'axios';
import ExampleStore from '../stores/ExampleStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import { GET_EXAMPLE_MESSAGE } from '../constants.js';

Actions.register(GET_EXAMPLE_MESSAGE, payload => {
  Axios(Router.request('GET', GET_EXAMPLE_MESSAGE, {
    args: {id: payload.id}
  }))
  .then(checkStatus)
  .then(response => {
    ExampleStore.setExampleMessage(response.data.message);
    Actions.finish(payload);
  }).catch(handleError);
});
