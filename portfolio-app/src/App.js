import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddProjectPage from "./pages/AddProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import initialProjects from "./data/projects";
import "./App.css";

/**
 * App — root component.
 * Holds the shared `projects` state and passes it down via props.
 *
 * Component tree:
 * App
 * ├── Navbar
 * └── Routes
 *     ├── HomePage       → SearchBar, ProjectList → ProjectCard
 *     ├── AddProjectPage → AddForm
 *     └── ProjectDetailPage
 */
function App() {
  const [projects, setProjects] = useState(initialProjects);

  // Add a new project to the top of the list
  const handleAddProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  // Remove a project by id
  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage projects={projects} />} />
          <Route
            path="/add"
            element={<AddProjectPage onAdd={handleAddProject} />}
          />
          <Route
            path="/project/:id"
            element={
              <ProjectDetailPage
                projects={projects}
                onDelete={handleDeleteProject}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
