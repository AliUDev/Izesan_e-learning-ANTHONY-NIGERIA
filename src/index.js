import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import './index.scss';
import { esanTheme } from './styles/Theme/Theme';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ViewportProvider } from './utils/hooks/useViewport';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={esanTheme}>
      <ViewportProvider>
        <App />
      </ViewportProvider>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
