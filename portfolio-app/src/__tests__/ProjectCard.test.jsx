import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const mockProject = {
  id: 1,
  title: "Test Project",
  category: "Branding",
  description: "A test project description.",
  image: "https://via.placeholder.com/600",
  tags: ["Logo", "Design"],
  year: "2024",
  client: "Test Client",
};

describe("ProjectCard", () => {
  it("renders the project title", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByText("Branding")).toBeInTheDocument();
  });

  it("renders all tags", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("renders the project image with correct alt text", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("renders the client name", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={mockProject} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Client")).toBeInTheDocument();
  });
});
