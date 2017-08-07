import createContainer, { ecurry } from '../src/createFoolishContainer';
import React from 'react';
import { render } from 'react-dom';

let CounterTemplate = (props, state, handlers) => <div>
  <h2>{state.counter}</h2>
  <button onClick={handlers.sub}>-</button>
  <button onClick={handlers.add}>+</button>
</div>;

let CounterContainer = createContainer({ counter: 0.5, },
  { add: () => (prevState) => ({ counter: prevState.counter + 1, }),
    sub: () => (prevState) => ({ counter: prevState.counter - 1, }),
  })(CounterTemplate);

let InputTemplate = (props, state, handlers) => <div>
  <input onChange={handlers.change}/>
  <p>{state.text}</p>
</div>;
let InputContainer = createContainer({ text: "My Cat is the cutest cat in the world", },
  { change: ecurry((e, prevState) => ({ text: e.target.value, })),
  }
)(InputTemplate);

let container = document.createElement('div');
document.body.appendChild(container);
render(
  <div>
    <CounterContainer />
    <InputContainer />
  </div>
  , container);
