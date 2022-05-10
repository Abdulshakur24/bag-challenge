import { render, screen } from "@testing-library/react";
import Register from "../components/Register/Register";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";

beforeAll(() => {});
afterAll(() => {});
beforeEach(() => {});
afterEach(() => {});

describe("/login page", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  it("expect an email input", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    const links = screen.getByText(/Don't have an account/i);
    expect(links).toBeInTheDocument();
  });
  it("expect a password input", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    const links = screen.getByText(/Don't have an account/i);
    expect(links).toBeInTheDocument();
  });
});

describe("/register page", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  it("has four inputs", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );

    const name = screen.getByPlaceholderText(/Name/i);
    const email = screen.getAllByPlaceholderText(/Email/i);
    const password = screen.getAllByPlaceholderText(/Password/i);
    const repassword = screen.getByPlaceholderText(/Re-Passsword/i);
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(repassword).toBeInTheDocument();
  });
  // it("expect a password input", async () => {
  //   store = mockStore(initialState);
  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <Registration />
  //       </Router>
  //     </Provider>
  //   );
  //   const links = screen.getByText(/Don't have an account/i);
  //   expect(links).toBeInTheDocument();
  // });
});
