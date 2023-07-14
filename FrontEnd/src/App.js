import React from "react";
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";

import { store } from './Redux/ReduxStore';
import Router from './Pages/Router';


const App = () => {

  return (
    <Provider store={store}>
      <PrimeReactProvider>

        <Router />

      </PrimeReactProvider>
    </Provider>
  );
};

export default App;