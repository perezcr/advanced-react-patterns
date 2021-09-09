// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.extra-1.js

import * as React from 'react';
import {Switch} from '../switch';

function callAll(...fns) {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args);
    });
  };
}

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // Destructure this so that I can grab the onClick if it's provided, and then we'll take the rest of the props
  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      // We will call all of the functions I pass: onClick and toggle. It'll call onClick, and then it'll call toggle. It'll only call onClick if that function actually exists.
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  // That's actually what we would recommend. We don't typically use prop collections. I defer to prop getters because they're more flexible in that they allow me to compose things together.
  return {on, toggle, getTogglerProps};
}

function App() {
  const {on, getTogglerProps} = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      {/* We'll just put everything inside of this object. Then getTogglerProps can be
        responsible for accepting all the props that I want to pass, composing them together
        in a way that works, and then returning all of those props composed together so
        I can spread them across that button.*/}
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;
