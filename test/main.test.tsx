import MainPage from "../app/(main)/page";
import { render, screen } from "@testing-library/react";

describe("Main Page", () => {
  it("should renders the page", () => {
    render(<MainPage />);
    expect(screen.getByText("Aeon Bank")).toBeInTheDocument();
  });
});
