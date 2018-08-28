
import Actions from './AppActions.js';
import Router from '../router.js';
import { GET_EXAMPLE_MESSAGE } from '../constants.js';
import ExampleStore from '../stores/ExampleStore.js';

Actions.register(GET_EXAMPLE_MESSAGE, payload => {
  fetch(Router.route(GET_EXAMPLE_MESSAGE, {id: payload.data.id}),
    Router.method('GET') // Get is not required here, but checkout post example action
  ).then(response => {
    return response.json();
  }).then(data => {
    ExampleStore.setExampleMessage(data.message);
    Actions.finish(payload);
  });
});
