// Control Props
// http://localhost:3000/isolated/exercise/06.clean.js

import * as React from 'react';
import {Switch} from '../switch';

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
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

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  on: controlledOn,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn});
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isControlled = controlledOn != null;
  const on = isControlled ? controlledOn : state.on;

  function dispatchWithOnChange(action) {
    if (!isControlled) {
      dispatch(action);
    }
    // onChange only is executed it's provided
    onChange?.(reducer({...state, on}, action), action);
  }

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle});
  const reset = () =>
    dispatchWithOnChange({type: actionTypes.reset, initialState});

  return {
    on,
    reset,
    toggle,
  };
}

function Toggle({on: controlledOn, onChange}) {
  const {on, toggle} = useToggle({on: controlledOn, onChange});

  return <Switch onClick={toggle} on={on} />;
}

function App() {
  const [bothOn, setBothOn] = React.useState(false);
  const [timesClicked, setTimesClicked] = React.useState(0);

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked(c => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle />
      </div>
    </div>
  );
}

export default App;
// we're adding the Toggle export for tests
export {Toggle};
