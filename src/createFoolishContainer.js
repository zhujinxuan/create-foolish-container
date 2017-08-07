import { Component } from 'react';

function boundActiontoSetState(thisArg, handlers) {
  let result = {};
  for (const k of Object.keys(handlers)) {
    result[k] = (...args) => {
      thisArg.setState(handlers[k].call(thisArg, ...args));
    };
  }
  return result;
}

function createContainer (defaultState, handlers) {
  return function(template) {
    class WrappedComponent extends Component {
      constructor() {
        super();
        this.state = defaultState;
        this.handlers = boundActiontoSetState(this, handlers);
      }

      render() {
        return template.call(this, this.props, this.state, this.handlers);
      }
    }
    return WrappedComponent;
  };
}

function ecurry(f) {
  return (e) => {
    e.persist();
    return (...args) => f(e, ...args);
  };
}

export default createContainer;
export {ecurry};
