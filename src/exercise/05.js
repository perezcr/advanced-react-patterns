// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';
import {Switch} from '../switch';

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args));

const actionTypes = {
  toggle: 'TOGGLE',
  reset: 'RESET',
};

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case actionTypes.toggle: {
      return {on: !state.on};
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

function useToggle({initialOn = false, reducer = toggleReducer} = {}) {
  const {current: initialState} = React.useRef({on: initialOn});
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {on} = state;

  const toggle = () => dispatch({type: actionTypes.toggle});
  const reset = () => dispatch({type: actionTypes.reset, initialState});

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

// export {useToggle, toggleReducer, actionTypes};

// import {useToggle, toggleReducer, actionTypes} from './useToggle';

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0);
  const clickedTooMuch = timesClicked >= 4;

  /* function toggleStateReducer(state, action) {
    switch (action.type) {
      case actionTypes.toggle: {
        if (clickedTooMuch) {
          return {on: state.on};
        }
        return {on: !state.on};
      }
      default:
        return toggleReducer(state, action);
    }
  } */
  //  I can change the switch statement a bunch, but actually, it'll be a lot easier if I can instead say,
  // "If the action.type is 'toggle' AND I clicked 4 times, then I can return this right here."
  // Otherwise, I'll return the toggleReducer with that state and that action.
  function toggleStateReducer(state, action) {
    if (action.type === actionTypes.toggle && timesClicked >= 4) {
      return {on: state.on};
    }
    return toggleReducer(state, action);
  }

  const {on, getTogglerProps, getResetterProps} = useToggle({
    reducer: toggleStateReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
        Reset
      </button>
    </div>
  );
}

export default App;
