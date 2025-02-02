// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import {Switch} from '../switch';

function Toggle({children}) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, child => {
    return React.cloneElement(child, {on, toggle});
  });
}

/** <ToggleOn /> renders children when the on state is true */
const ToggleOn = ({on, children}) => (on ? children : null);

/** <ToggleOff /> renders children when the on state is false */
const ToggleOff = ({on, children}) => (on ? null : children);

/** <ToggleButton /> renders the <Switch /> with the on prop set to the on state and the onClick prop set to toggle. */
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />;

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
