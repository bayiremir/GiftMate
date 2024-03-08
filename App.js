import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {AppNavigator, AuthNavigator, TabNavigator} from './Navigator';
import {storage} from './src/utils/storage';
import {setIsLogin} from './src/redux/slices/isLoginSlice';

// App komponenti
const App = () => {
  const isLogin = useSelector(state => state.isLoginSlice);
  const isLog = isLogin.isLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    log = async () => {
      const isLogin = await storage.getBoolean('isLogin');
      if (isLogin) {
        dispatch(setIsLogin(true));
      }
    };
    log();
  }, []);

  return isLog === true ? <AppNavigator /> : <AuthNavigator />;
};

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
