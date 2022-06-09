import { screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "src/App";
import { render } from "../setupTests";

describe("Form on initial render.", () => {
  test("Must have an email input.", async () => {
    render(<App />);
    const result = screen.getByPlaceholderText(/Email/i);
    expect(result).toBeInTheDocument();
  });

  test("Must have a password input.", () => {
    render(<App />);
    const result = screen.getByPlaceholderText(/Password/i);
    expect(result).toBeInTheDocument();
  });

  test("Expects the submit button to be disabled.", async () => {
    render(<App />);
    const result = await screen.findByRole("button", { name: /submit/i });
    expect(result).toBeDisabled();
  });
});

describe("A form on error", () => {
  test("Expect an error when email input is invalid.", async () => {
    render(<App />);
    const invalidEmail = /Invalid email/i;

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user123.com" } });
    fireEvent.change(passwordInput, { target: { value: "123.5" } });

    const button = await screen.findByRole("button", { name: /submit/i });

    fireEvent.click(button);

    expect(screen.getByText(invalidEmail)).toBeInTheDocument();
  });

  test("Expect an error when password is short.", async () => {
    render(<App />);
    const invalidPassword = "Password must contain at least 6 character(s)";

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user123.com" } });
    fireEvent.change(passwordInput, { target: { value: "123.5" } });

    const button = await screen.findByRole("button", { name: /submit/i });

    fireEvent.click(button);

    expect(screen.getByText(invalidPassword)).toBeInTheDocument();
  });
});

describe("A form on fulfilled", () => {
  test("Expect no invalid email and password when submit button is triggered.", async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user123@.com" } });
    fireEvent.change(passwordInput, { target: { value: "user123" } });

    const button = await screen.findByRole("button", { name: /submit/i });

    fireEvent.click(button);

    expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument();
  });

  test("Expect submit button to be enabled when the form is filled out.", async () => {
    render(<App />);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user123@.com" } });
    fireEvent.change(passwordInput, { target: { value: "user123" } });

    const button = screen.getByTestId("button");

    expect(button).toBeEnabled();
  });
});
