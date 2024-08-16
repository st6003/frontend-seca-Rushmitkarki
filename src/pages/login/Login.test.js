import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Login from "./Login";

// Mocking API calls and dependencies
jest.mock("../../apis/api");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: jest.fn(() => <button>Mock Google Login</button>),
}));

describe("Login Component", () => {
  beforeEach(() => {
    // Mock localStorage methods to avoid issues in tests
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    render(<Login />);
  });

  it("renders login form", () => {
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
  });

  it("handles email and password input changes", () => {
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("handles forgot password modal opening", () => {
    fireEvent.click(screen.getByText("Forgot Password?"));

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByText("Choose contact method")).toBeInTheDocument();
  });
});
