import { renderHook, waitFor, act } from "@testing-library/react";
import useProjects from "../hooks/useProjects";

const mockProjects = [
  { id: 1, title: "Project One", category: "Branding", description: "Desc", image: "", tags: ["Tag1"], year: "2024", client: "Client A" },
  { id: 2, title: "Project Two", category: "Web Design", description: "Desc", image: "", tags: ["Tag2"], year: "2023", client: "Client B" },
];

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("useProjects", () => {
  it("fetches and returns projects on mount", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toHaveLength(2);
    expect(result.current.projects[0].title).toBe("Project One");
  });

  it("sets error when fetch fails", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useProjects());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch projects");
  });

  it("addProject POSTs and prepends the new project", async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockProjects })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 3, title: "New Project", category: "Print", description: "Desc", image: "", tags: [], year: "2024", client: "" }) });

    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addProject({ title: "New Project", category: "Print", description: "Desc", image: "", tags: [], year: "2024", client: "" });
    });

    expect(result.current.projects[0].title).toBe("New Project");
    expect(result.current.projects).toHaveLength(3);
  });

  it("updateProject PATCHes and updates the project in state", async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockProjects })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ...mockProjects[0], title: "Updated Title" }) });

    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateProject(1, { title: "Updated Title" });
    });

    expect(result.current.projects.find((p) => p.id === 1).title).toBe("Updated Title");
  });

  it("deleteProject DELETEs and removes the project from state", async () => {
    global.fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockProjects })
      .mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteProject(1);
    });

    expect(result.current.projects).toHaveLength(1);
    expect(result.current.projects.find((p) => p.id === 1)).toBeUndefined();
  });
});
