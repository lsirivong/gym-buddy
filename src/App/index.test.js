import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(state => state)
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
});
