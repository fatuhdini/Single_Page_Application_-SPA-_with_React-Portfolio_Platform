import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetailPage from "../pages/ProjectDetailPage";

const mockProjects = [
  {
    id: 1,
    title: "Test Project",
    category: "Branding",
    description: "A test description.",
    image: "https://via.placeholder.com/600",
    tags: ["Logo", "Print"],
    year: "2024",
    client: "Test Client",
  },
];

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

function renderDetail(onDelete = jest.fn(), onUpdate = jest.fn()) {
  return render(
    <MemoryRouter initialEntries={["/project/1"]}>
      <Routes>
        <Route
          path="/project/:id"
          element={
            <ProjectDetailPage
              projects={mockProjects}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProjectDetailPage", () => {
  beforeEach(() => mockNavigate.mockClear());

  it("renders project title and description", () => {
    renderDetail();
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test description.")).toBeInTheDocument();
  });

  it("shows not-found message for unknown id", () => {
    render(
      <MemoryRouter initialEntries={["/project/999"]}>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetailPage projects={mockProjects} onDelete={jest.fn()} onUpdate={jest.fn()} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Project not found.")).toBeInTheDocument();
  });

  it("calls onDelete and navigates home on confirm", () => {
    window.confirm = jest.fn(() => true);
    const onDelete = jest.fn(() => Promise.resolve());
    renderDetail(onDelete);
    fireEvent.click(screen.getByText("Delete Project"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("opens edit form when Edit Project is clicked", () => {
    renderDetail();
    fireEvent.click(screen.getByText("Edit Project"));
    expect(screen.getByTestId("edit-form")).toBeInTheDocument();
  });

  it("calls onUpdate with changed values on save", async () => {
    const onUpdate = jest.fn(() => Promise.resolve());
    renderDetail(jest.fn(), onUpdate);
    fireEvent.click(screen.getByText("Edit Project"));

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => expect(onUpdate).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ title: "Updated Title" })
    ));
  });

  it("closes edit form when Cancel is clicked", () => {
    renderDetail();
    fireEvent.click(screen.getByText("Edit Project"));
    expect(screen.getByTestId("edit-form")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByTestId("edit-form")).not.toBeInTheDocument();
  });
});
