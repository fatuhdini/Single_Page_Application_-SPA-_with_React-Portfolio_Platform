import React from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectList.css";

/**
 * ProjectList — renders the grid of ProjectCards.
 * Shows an empty state when no projects match the search query.
 */
function ProjectList({ projects, searchQuery }) {
  if (projects.length === 0) {
    return (
      <div className="project-list__empty" data-testid="empty-state">
        <span className="project-list__empty-icon" aria-hidden="true">◎</span>
        <p className="project-list__empty-title">No projects found</p>
        {searchQuery && (
          <p className="project-list__empty-sub">
            No results for <strong>"{searchQuery}"</strong> — try a different term.
          </p>
        )}
      </div>
    );
  }

  return (
    <section
      className="project-list"
      aria-label={`${projects.length} project${projects.length !== 1 ? "s" : ""}`}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export default ProjectList;
