// Compound Components
// http://localhost:3000/isolated/exercise/02.extra-1js
import * as React from 'react';
import {Switch} from '../switch';

function Toggle({children}) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, child => {
    if (allowedTypes.includes(child.type)) {
      return React.cloneElement(child, {on, toggle});
    }
    return child;
  });
}

/** <ToggleOn /> renders children when the on state is true */
const ToggleOn = ({on, children}) => (on ? children : null);

/** <ToggleOff /> renders children when the on state is false */
const ToggleOff = ({on, children}) => (on ? null : children);

/** <ToggleButton /> renders the <Switch /> with the on prop set to the on state and the onClick prop set to toggle. */
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />;

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton];

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
        <span>I'm a DOM Component!</span>
      </Toggle>
    </div>
  );
}

export default App;
