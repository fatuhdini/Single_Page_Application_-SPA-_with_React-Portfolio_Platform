import { useState, useEffect } from "react";

const API = "http://localhost:3001/projects";

/**
 * useProjects — custom hook that manages all project CRUD operations.
 * Abstracts fetch logic away from components.
 *
 * Returns: { projects, loading, error, addProject, updateProject, deleteProject }
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET — fetch all projects on mount
  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // POST — add a new project
  const addProject = (project) =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add project");
        return res.json();
      })
      .then((saved) => setProjects((prev) => [saved, ...prev]));

  // PATCH — update an existing project by id
  const updateProject = (id, changes) =>
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update project");
        return res.json();
      })
      .then((updated) =>
        setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
      );

  // DELETE — remove a project by id
  const deleteProject = (id) =>
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete project");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      });

  return { projects, loading, error, addProject, updateProject, deleteProject };
}

export default useProjects;
