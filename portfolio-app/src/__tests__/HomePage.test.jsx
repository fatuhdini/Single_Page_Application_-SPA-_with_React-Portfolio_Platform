import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

const mockProjects = [
  {
    id: 1,
    title: "Brand Identity",
    category: "Branding",
    description: "A branding project.",
    image: "https://via.placeholder.com/600",
    tags: ["Logo", "Print"],
    year: "2024",
    client: "Acme",
  },
  {
    id: 2,
    title: "Mobile App",
    category: "UX/UI",
    description: "A mobile UI project.",
    image: "https://via.placeholder.com/600",
    tags: ["Mobile", "React"],
    year: "2023",
    client: "Beta Corp",
  },
];

describe("HomePage", () => {
  it("renders all projects initially", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("project-card")).toHaveLength(2);
  });

  it("filters projects by title when searching", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Brand" },
    });
    expect(screen.getAllByTestId("project-card")).toHaveLength(1);
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("filters projects by category", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "UX/UI" },
    });
    expect(screen.getAllByTestId("project-card")).toHaveLength(1);
    expect(screen.getByText("Mobile App")).toBeInTheDocument();
  });

  it("filters projects by tag", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Mobile" },
    });
    expect(screen.getAllByTestId("project-card")).toHaveLength(1);
  });

  it("shows empty state when no projects match the query", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "zzznomatch" },
    });
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("displays the correct project count", () => {
    render(
      <MemoryRouter>
        <HomePage projects={mockProjects} />
      </MemoryRouter>
    );
    expect(screen.getByText(/2 projects/i)).toBeInTheDocument();
  });
});
