import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const muiTheme = getMuiTheme({});

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(state => state)
  ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>, div);
});
