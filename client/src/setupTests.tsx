import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeProvider";
import { ReactNode } from "react";
import ToggleProvider from "./contexts/ToggleProvider";
import PathProvider from "./contexts/PathProvider";

const AllProviders = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Provider store={store}>
      <ToggleProvider>
        <ThemeProvider>
          <PathProvider>
            <Router>{children}</Router>
          </PathProvider>
        </ThemeProvider>
      </ToggleProvider>
    </Provider>
  );
};

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
