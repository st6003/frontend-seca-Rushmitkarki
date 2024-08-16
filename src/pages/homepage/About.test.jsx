import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import About from "../homepage/About";

describe("About Component", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("renders the hero section with correct text and image", () => {
    expect(screen.getByText(/Remove the guesswork when it comes to your Health/i)).toBeInTheDocument();
    expect(screen.getByText(/Enhance your mental and physical well-being/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Learn More/i })).toBeInTheDocument();
    expect(screen.getByAltText("Doctor")).toBeInTheDocument();
  });

  it("renders the introduction section with correct text", () => {
    expect(screen.getByText(/You Deserve Better Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, I'm Dr. Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/How it Works/i)).toBeInTheDocument();
  });

  it("renders the feature section with correct text and image", () => {
    expect(screen.getByText(/Measure to Manage/i)).toBeInTheDocument();
    expect(screen.getByText(/At Memory Guardian, we believe in the power of data/i)).toBeInTheDocument();
    expect(screen.getByAltText("Feature")).toBeInTheDocument();
  });
});
