import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import { Provider } from "react-redux";
import store from "./redux-app/store";
import Theme from "./styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCountries } from "./redux-app/slicers/toVisit";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistStore } from "reduxjs-toolkit-persist";

store.dispatch(fetchCountries("europe"));

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={true} persistor={persistor}>
      <Theme>
        <Router>
          <ToastContainer />
          <App />
        </Router>
      </Theme>
    </PersistGate>
  </Provider>
);
