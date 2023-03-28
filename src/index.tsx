import React from 'react';
import { render } from 'react-dom';
//import { createSignal } from 'solid-js';
import App from './App';

const root = document.getElementById('root');

if (root) {
  //const [count, setCount] = createSignal(0);

  render(
    <App/>,
    root
  );
}
