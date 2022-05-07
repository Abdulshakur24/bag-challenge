import React from "react";
import { createRoot } from "react-dom/client";
import Theme from "./components/Theme";
import { persistStore } from "reduxjs-toolkit-persist";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={true}>
      <Theme>
        <Router>
          <App />
        </Router>
      </Theme>
    </PersistGate>
  </Provider>
);
