import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectList from "../components/ProjectList";

const mockProjects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Web Design",
    description: "First project.",
    image: "https://via.placeholder.com/600",
    tags: ["React"],
    year: "2024",
    client: "Client A",
  },
  {
    id: 2,
    title: "Project Beta",
    category: "Branding",
    description: "Second project.",
    image: "https://via.placeholder.com/600",
    tags: ["Logo"],
    year: "2023",
    client: "Client B",
  },
];

describe("ProjectList", () => {
  it("renders the correct number of project cards", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={mockProjects} searchQuery="" />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("project-card")).toHaveLength(2);
  });

  it("shows empty state when projects array is empty", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={[]} searchQuery="" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No projects found")).toBeInTheDocument();
  });

  it("shows the search query in the empty state message", () => {
    render(
      <MemoryRouter>
        <ProjectList projects={[]} searchQuery="xyz" />
      </MemoryRouter>
    );
    expect(screen.getByText(/xyz/i)).toBeInTheDocument();
  });
});
