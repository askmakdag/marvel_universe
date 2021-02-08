import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import UserAgent from 'react-native-user-agent';
import TabStack from './src/navigation/TabStack';
import {NavigationContainer} from '@react-navigation/native';
import configureStore from './src/store/ConfigureStore';

const store = configureStore();

const AxiosInterceptors = () => {
  /** Print Every Request to the Console*/
  axios.interceptors.request.use(async (req) => {
    console.log('interceptor request: ', req);
    return req;
  });

  /** Error Handling*/
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log('interceptor err.response: ', err.response);
      console.log('interceptor err.response.status: ', err.response.status);
      if (err.response.status === 404) {
        throw new Error(`${err.config.url} not found`);
      }

      /** Unauthorized error*/
      if (err.response.status === 401) {
      }
      throw err;
    },
  );
};

const SetUserAgentHeader = (user_agent) => {
  axios.defaults.headers.common = {
    'User-Agent': user_agent,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Expect: 'application/json',
    Accept: '*/*',
  };
};

function App() {
  let init = async () => {
    await UserAgent.getWebViewUserAgent() //asynchronous
      .then((ua) => {
        SetUserAgentHeader(ua);
      })
      .catch((e) => {
        console.log('user agent error: ', e);
      });

    // …do multiple async tasks
    await AxiosInterceptors();
  };

  useEffect(() => {
    init().finally(() => {});
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
