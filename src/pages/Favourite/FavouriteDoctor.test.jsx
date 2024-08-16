import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FavouriteDoctors from "../Favourite/FavouriteDoctors"; // Ensure correct import
import { getUserFavoritesApi, removeFavoriteApi } from "../../apis/api";
import { toast } from "react-toastify";

// Mocking API calls and dependencies
jest.mock("../../apis/api", () => ({
  getUserFavoritesApi: jest.fn(),
  removeFavoriteApi: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("FavouriteDoctors Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component and displays the favorite doctors", async () => {
    getUserFavoritesApi.mockResolvedValue({
      data: [
        {
          _id: "1",
          doctor: {
            doctorName: "Dr. John Doe",
            doctorField: "Cardiology",
            doctorImage: "john_doe.jpg",
          },
        },
      ],
    });

    render(<FavouriteDoctors />);

    await waitFor(() => {
      expect(screen.getByText("Your Favourite Doctors")).toBeInTheDocument();
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
      expect(screen.getByText("Cardiology")).toBeInTheDocument();
    });
  });

  it("handles removing a doctor from favorites", async () => {
    getUserFavoritesApi.mockResolvedValue({
      data: [
        {
          _id: "1",
          doctor: {
            doctorName: "Dr. John Doe",
            doctorField: "Cardiology",
            doctorImage: "john_doe.jpg",
          },
        },
      ],
    });
    removeFavoriteApi.mockResolvedValue({});

    render(<FavouriteDoctors />);

    await waitFor(() => {
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button', { name: /remove from favorites/i });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Doctor removed from favorites");
      expect(getUserFavoritesApi).toHaveBeenCalled();
    });
  });

  it("opens and closes the modal correctly", async () => {
    getUserFavoritesApi.mockResolvedValue({
      data: [
        {
          _id: "1",
          doctor: {
            doctorName: "Dr. John Doe",
            doctorField: "Cardiology",
            doctorImage: "john_doe.jpg",
          },
        },
      ],
    });

    render(<FavouriteDoctors />);

    await waitFor(() => {
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
    });

    const viewDetailsButton = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();
      expect(screen.getByAltText("Dr. John Doe")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Dr. John Doe")).not.toBeInTheDocument();
    });
  });
});
