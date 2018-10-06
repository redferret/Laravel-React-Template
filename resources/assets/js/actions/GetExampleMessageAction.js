
import Actions, { checkStatus, parseJSON } from './AppActions.js';
import Router from '../router.js';
import { GET_EXAMPLE_MESSAGE } from '../constants.js';
import ExampleStore from '../stores/ExampleStore.js';

Actions.register(GET_EXAMPLE_MESSAGE, payload => {
  fetch(Router.route(GET_EXAMPLE_MESSAGE, {id: payload.id}), Router.method('GET'))
  .then(checkStatus)
  .then(parseJSON)
  .then(data => {
    ExampleStore.setExampleMessage(data.message);
    Actions.finish(payload);
  }).catch((error) => {
    console.error('Request Failed', error);
  });
});
