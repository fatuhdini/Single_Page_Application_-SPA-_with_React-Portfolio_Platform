import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddProjectPage from "./pages/AddProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import useProjects from "./hooks/useProjects";
import "./App.css";

/**
 * App — root component.
 * Delegates all project state and CRUD to the useProjects custom hook.
 *
 * Component tree:
 * App
 * ├── Navbar
 * └── Routes
 *     ├── HomePage         → SearchBar, ProjectList → ProjectCard
 *     ├── AddProjectPage   → AddForm
 *     └── ProjectDetailPage
 */
function App() {
  const { projects, loading, error, addProject, updateProject, deleteProject } =
    useProjects();

  if (loading) return <div className="app-status">Loading projects…</div>;
  if (error) return <div className="app-status app-status--error">Error: {error}</div>;

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage projects={projects} />} />
          <Route
            path="/add"
            element={<AddProjectPage onAdd={addProject} />}
          />
          <Route
            path="/project/:id"
            element={
              <ProjectDetailPage
                projects={projects}
                onDelete={deleteProject}
                onUpdate={updateProject}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
