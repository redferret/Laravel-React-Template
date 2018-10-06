import * as Constants from './constants.js';
import Router from './router.js';

/**
 * Register the rest of your routes below. The following can be deleted or
 * used for future reference.
 */

Router.registerRoute(Constants.GET_EXAMPLE_MESSAGE, args => {
  return `/getExampleMessage/${args.id}`;
});

Router.registerRoute(Constants.LOG_IN, args => {
  return `/login`;
});
Router.registerRoute(Constants.LOG_OUT, args => {
  return `/logout`;
});
Router.registerRoute(Constants.REGISTER, args => {
  return `/register`;
});
Router.registerRoute(Constants.SHOW_PASSWORD_RESET, args => {
  return `/password/reset`;
});
Router.registerRoute(Constants.SEND_PASSWORD_RESET, args => {
  return `/password/email`;
});
Router.registerRoute(Constants.RESET_PASSWORD_REQUEST, args => {
  return `/password/reset`;
});
