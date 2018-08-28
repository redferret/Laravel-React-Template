
import Actions from './app-actions.js';
import Router from '../router.js';
import { GET_EXAMPLE_MESSAGE } from '../constants.js';
import ExampleStore from '../stores/factory-store.js';

Actions.register(GET_EXAMPLE_MESSAGE, payload => {
  fetch(Router.route(GET_EXAMPLE_MESSAGE, {id: payload.data.id}),
    Router.method('GET') // Get is not required here, but checkout post example action
  ).then(response => {
    return response.json();
  }).then(message => {
    ExampleStore.setExampleMessage(message);
    Actions.finish(payload);
  });
});
