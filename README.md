# Create 'Foolish' Container

We Redux Users often create smart containers, containers connected to Redux or
Flux for reactive interactions, which means changing one elments changes other
elements as well.  However, in developing view components, putting too much 
variables into Redux is not a good idea in development. 

Let us say the containers connected with Redux as the smart containers, and we 
need to create some 'foolish' containers which provides reactive actions without 
Redux.  Therefore, we could keep the Redux state neat and clean. 

This package provides a `createContainer()` method with a similar interface of 
Redux's connect, and it is not connected to Redux. 


## Usage

### `createContainer(defaultState, handlers)`

`createContainer` creates a Container Component in two steps: 

```jsx
let newContainer = createContainer(defaultState, handlers)(template = (props, state, handlers) => JSX)
```

In the first step, `createContainer(defaultState, handlers)` defines the
container's intial state (`defaultState`) and state change methods
(`handlers`).   In the second step, we map the container's `props`, `state` and
state change method `handlers` to a JSX template. 

#### Arguments of `createContainer`
`defaultState : Object` The initialization of the React State;

`handlers : { method_name: (...args) => stateChange}` 
The `stateChange` here could be any arguments accepted by React's `this.setState(stateChange)`, 
so `(...args) => StateChange`, as values of handlers, could be 

1. `(*...args) => newState`
2. `(...args) => (prevState, Props) => (newState)`
3. `(event, ...args) => {e.persist(); return (prevState, Props)=> (newState); }`

#### Arguments of `createContainer(defaultState, handlers)`
`template = (props, state, handlers) => JSX` 
The template to map `props`, `state` and state change methods `handlers` 
to a React DOM.  `props` is the `props` accepted by the container; `state`
is the `this.state` of the container. `handler` are state change methods 

More details could be seen in the following Example Code. 

### `ecurry`
```jsx
ecurry((e, prevState, Props) => {newState})
```

`ecurry` is a curry function to transit `SyntheticEvent` from child component
to parent compoents with `event.persist()`, which works as
`ecurry(f)(e) === (...args) => {e.persist(); f(e,...args)}`


## Example Code

These example codes could be seen in `demo/`.  You could run `npm run demo` to see the result of following codes.

### Counter 

This example shows creating a simple Counter Component with `createContainer`

```jsx
import createContainer from 'create-foolish-container';
import React from 'react';

let CounterTemplate = (props, state, handlers) => <div>
  <h2>{state.counter}</h2>
  <button onClick={handlers.sub}>-</button>
  <button onClick={handlers.add}>+</button>
</div>;

let CounterContainer = createContainer({ counter: 0.5, },
  { add: () => (prevState) => ({ counter: prevState.counter + 1, }),
    sub: () => (prevState) => ({ counter: prevState.counter - 1, }),
  })(CounterTemplate);
```

### When you eat 3 cookies, you consume 150 calories.

This example shows the usage of `eccury`, a curry wrapper with `e.persist` of the React;

```jsx
import createContainer, { ecurry } from 'create-foolish-container';
import React from 'react';

let InputContainer = createContainer({ cookies: 3, },
  { change: ecurry((e, prevState) => ({ cookies: parseInt(e.target.value), })),
  }
)((props, state, handlers) => <p>
  When you eat 
  <input type="number" onChange={handlers.change} value={state.cookies} /> cookies,
  you consume {state.cookies * 50} calories.
</p>
);
```

When the `<input />` 3 cookies are changed, the amount of consumed calories is also changed. 

