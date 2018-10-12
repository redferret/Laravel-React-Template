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
    this._elements.forEach((component, key) => {
      let element = document.getElementById(key);
      if (element) {
        ReactDOM.render(component, element);
      }
    });
  }
}

export default new RenderManager();
