import createContainer, { ecurry } from 'create-foolish-container';
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

let InputContainer = createContainer({ cookies: 3, },
  { change: ecurry((e, prevState) => ({ cookies: parseInt(e.target.value), })),
  }
)((props, state, handlers) => <p>
  When you eat <input type="number" onChange={handlers.change} value={state.cookies} /> cookies, you consume {state.cookies * 50} calories.
</p>
);

let container = document.createElement('div');
document.body.appendChild(container);
render(
  <div>
    <CounterContainer />
    <InputContainer />
  </div>
  , container);
