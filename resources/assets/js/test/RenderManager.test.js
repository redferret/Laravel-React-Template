import RenderManager from '../RenderManager.js';
import React from 'react';

class TestComponent extends React.Component {
  render() {
    return <div id='foo'></div>;
  }
}

test('Render Manager Renders React Component when Div is present', () => {
  document.body.innerHTML = "<div id='test'></div>";
  RenderManager.registerElement('test', <TestComponent />);
  RenderManager.renderElements();

  let fooDiv = document.getElementById('foo');

  expect(fooDiv).not.toBeNull();
});

test('Render Manager Does not Render React Component when Div is not present', () => {
  document.body.innerHTML = "<div id='foobar'></div>";
  RenderManager.registerElement('test', <TestComponent />);
  RenderManager.renderElements();

  let fooDiv = document.getElementById('foo');

  expect(fooDiv).toBeNull();
});
