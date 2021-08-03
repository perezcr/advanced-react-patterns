// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.extra-1.js

import * as React from 'react';
import {Switch} from '../switch';

const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

function Toggle({children}) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  const value = {on, toggle};
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

function useToggle() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error(`useToggle must be within a <Toggle />`);
  }
  return context;
}

function ToggleOn({children}) {
  const {on} = useToggle();
  return on ? children : null;
}

function ToggleOff({children}) {
  const {on} = useToggle();
  return on ? null : children;
}

function ToggleButton(props) {
  const {on, toggle} = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}

const App = () => <ToggleButton />;

export default App;

/*
eslint
  no-unused-vars: "off",
*/
