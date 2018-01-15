import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import LigthViewContainer from './components/LightView';

import { Provider } from 'react-redux';
import store from './store';

import './index.css';

/*ReactDOM.render(
    <App />,
    document.getElementById('root')
);*/

ReactDOM.render(
  <Provider store={store}>
    <LigthViewContainer />
  </Provider>,
  document.getElementById('root')
);