import AppDispatcher from '../dispatcher.js';
import ExampleStore from '../stores/ExampleStore.js';
import React from 'react';

import { Label } from 'react-bootstrap';

import {
  GET_EXAMPLE_MESSAGE,
  MAIN_ID
} from '../constants.js';

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      exampleMessage: ExampleStore.getExampleMessage(),
      status: ExampleStore.getStatus()
    }
  }

  _onChange() {
    this.setState({
      exampleMessage: ExampleStore.getExampleMessage(),
      status: ExampleStore.getStatus()
    });
  }

  componentDidMount() {
    ExampleStore.on(MAIN_ID, this._onChange.bind(this));

    AppDispatcher.dispatch({
      action: GET_EXAMPLE_MESSAGE,
      id: 1,
      emitOn: [{
        store: ExampleStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentWillUnmount() {
    ExampleStore.removeListener(MAIN_ID, this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        <div>
          Your Laravel/React App!! This example will show a message...
        </div>
        <h3>
          <Label bsStyle={this.state.status}>
            {this.state.exampleMessage}
          </Label>
        </h3>
      </div>
    );
  }
}
