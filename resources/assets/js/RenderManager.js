
import React from 'react';
import ReactDOM from 'react-dom';

class RenderManager {
  constructor() {
    this._elements = new Map();
  }

  registerElement(id, component) {
    this._elements.set(id, component);
  }

  renderElements() {
    this._elements.forEach((value, key) => {
      let element = document.getElementById(key);
      if (element) {
        ReactDOM.render(value, element);
      }
    });
  }
}

export default new RenderManager();
