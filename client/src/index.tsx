import React from "react";
import { createRoot } from "react-dom/client";
import { persistStore } from "reduxjs-toolkit-persist";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ToggleProvider from "./contexts/ToggleProvider";
import SearchModal from "src/components/SearchModal/SearchModal";
import PathProvider from "./contexts/PathProvider";
import ThemeProvider from "./contexts/ThemeProvider";

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={true}>
      <ToggleProvider>
        <PathProvider>
          <ThemeProvider>
            <SearchModal />
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </PathProvider>
      </ToggleProvider>
    </PersistGate>
  </Provider>
);
