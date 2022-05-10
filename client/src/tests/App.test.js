import { render, screen } from "@testing-library/react";
import App from "../components/Login/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { persistStore } from "reduxjs-toolkit-persist";
import { Provider } from "react-redux";
import store from "../redux/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

const persistor = persistStore(store);

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={true}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
  const linkElement = screen.getByText(/Don't have an account/i);
  expect(linkElement).toBeInTheDocument();
});
