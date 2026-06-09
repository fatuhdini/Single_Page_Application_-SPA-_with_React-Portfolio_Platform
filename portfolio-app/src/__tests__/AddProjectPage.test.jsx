import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddProjectPage from "../pages/AddProjectPage";

// Mock useNavigate so we don't need a real router history
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddProjectPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the form", () => {
    render(
      <MemoryRouter>
        <AddProjectPage onAdd={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("add-project-form")).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", () => {
    render(
      <MemoryRouter>
        <AddProjectPage onAdd={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Add Project"));
    expect(screen.getByText("Project title is required.")).toBeInTheDocument();
    expect(screen.getByText("Please select a category.")).toBeInTheDocument();
    expect(screen.getByText("Description is required.")).toBeInTheDocument();
  });

  it("calls onAdd and shows success message on valid submission", async () => {
    jest.useFakeTimers();
    const onAdd = jest.fn();
    render(
      <MemoryRouter>
        <AddProjectPage onAdd={onAdd} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/project title/i), {
      target: { value: "My New Project" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Branding" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A great project." },
    });

    fireEvent.click(screen.getByText("Add Project"));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "My New Project",
        category: "Branding",
        description: "A great project.",
      })
    );

    expect(screen.getByTestId("success-message")).toBeInTheDocument();

    jest.runAllTimers();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    jest.useRealTimers();
  });

  it("navigates to home when Cancel is clicked", () => {
    render(
      <MemoryRouter>
        <AddProjectPage onAdd={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
