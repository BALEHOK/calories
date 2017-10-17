import '../favicon.ico';
import '../manifest.json';

import React from 'react';
import ReactDOM from 'react-dom';

// import Observables operators
import 'common/observables';

import { Provider } from 'react-redux';
import { ajaxConfig } from './common/ajax';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';

import AppComponent from 'components/app.connect';

injectTapEventPlugin();

ajaxConfig({ apiUrl: API_URL });

const rootComponent = (
  <MuiThemeProvider>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  rootComponent,
  document.getElementById('app')
);
