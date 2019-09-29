import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Routes from './routes';
import store from './store';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Provider {...store}>
      <BrowserRouter>
        <MainLayout>
          <div className="hero-body">
            <Routes />
          </div>
        </MainLayout>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
