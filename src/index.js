import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App'
import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey700, pink500 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pink500,
    accent1Color: blueGrey700,
  },
  appBar: {
    height: 50,
  },
})

// Neded for onTouchTap
// http://stackoverflow.com/a/34015469/988041
injectTapEventPlugin()

import { Provider } from 'react-redux'
import store from './configureStore'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

