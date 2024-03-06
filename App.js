import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {AppNavigator, AuthNavigator, TabNavigator} from './Navigator';

// App komponenti
const App = () => {
  const isLogin = useSelector(state => state.isLoginSlice);
  const isLog = isLogin.isLogin;

  return isLog === true ? <AppNavigator /> : <AuthNavigator />;
};

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
