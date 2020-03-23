import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app";
import configureStore from "./configureStore";
import { PersistGate } from 'redux-persist/integration/react'

const {store,persistor} = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>  
    </Provider>
  );
}
export default Root;
