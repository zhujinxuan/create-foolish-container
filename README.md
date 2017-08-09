React developers often creates smart containers, in which changing one
element changes other elements as well.  The most common way to generate 
reactive containers are to use `connect()` in Redux.  However, putting too much
variables in the Redux is not a good idea.  In this package, we provided a
method `createContainer()` for creating smart containers like the Redux's
`connect()`, without connecting to the Redux.

## Usage

``` 
createContainer(defaultState, handlers)(template = (props, state, handlers) => JSX)
```

`createContainer` includes two steps.  In the first step,
`createContainer(defaultState, handlers)` define the container's intial state
(`defaultState`) and state change methods (`handlers`).   In the second step, 
we map the container's `props`, `state` and state change method `handlers` to 
a JSX template. 


`defaultState : Object` The initialization of the React State;

`handlers : { method_name: (...args) => StateChange}` 
The `StateChange` here could be any arguments accepted by React's `this.setState(stateChange)`, 
so `(...args) => StateChange`, as values of handlers, could be 

1. `(*...args) => newState`
2. `(...args) => (prevState, Props) => (newState)`
3. `(event, ...args) => {e.persist(); return (prevState, Props)=> (newState); }`

`template = (props, state, handlers) => JSX` 
The template to map `props`, `state` and state change methods `handlers` 
to a React DOM.  `props` is the `props` accepted by the container; `state`
is the `this.state` of the container. `handler` are state change methods 

More details could be seen in the following Example Code. 

```
ecurry((e, prevState, Props) => {newState})
```

`ecurry` is a curry function to transit `SyntheticEvent` from child component
to parent compoents with `event.persist()`, which works as
`ecurry(f)(e ) === (...args) => {e.persist(); f(e,...args)}`


## Example Code

These example codes could be seen in `demo/`.  You could run `npm run demo` to see the result of following codes.

### Counter 

This example shows creating a simple Counter Component with `createContainer`

```
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

```
let InputContainer = createContainer({ cookies: 3, },
  { change: ecurry((e, prevState) => ({ cookies: parseInt(e.target.value), })),
  }
)((props, state, handlers) => <p>
  When you eat <input type="number" onChange={handlers.change} value={state.cookies} /> cookies, you consume {state.cookies * 50} calories.
</p>
);
```

When the `<input />` 3 cookies are changed, the amount of consumed calories is also changed. 

