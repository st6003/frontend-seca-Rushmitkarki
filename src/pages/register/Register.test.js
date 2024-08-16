import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import { registerUserApi } from "../../apis/api";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

// Mock the API and toast notifications
jest.mock("../../apis/Api");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("Register Component Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show error message on failed registration", async () => {
    // Mock the API response
    const mockedData = {
      data: {
        success: false,
        message: "Invalid Password",
      },
    };
    registerUserApi.mockResolvedValue(mockedData);

    // Render the component
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Find form fields and submit button
    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const phoneInput = screen.getByPlaceholderText("Phone Number");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const registerButton = screen.getByRole("button", { name: /Register/i });

    // Simulate user input
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(registerButton);

    // Assert toast error notification is called
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid Password"));
  });
});
