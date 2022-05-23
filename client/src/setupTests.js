import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Theme from "./components/Theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Theme>
        <Router>{children}</Router>
      </Theme>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
