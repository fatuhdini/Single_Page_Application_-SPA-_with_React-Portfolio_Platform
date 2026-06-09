import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProjectDetailPage.css";

/**
 * ProjectDetailPage — shows full details for a single project.
 * Retrieves the project from the shared list by id from the URL param.
 */
function ProjectDetailPage({ projects, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <main className="detail-page detail-page--not-found">
        <p>Project not found.</p>
        <Link to="/" className="detail-back">← Back to Portfolio</Link>
      </main>
    );
  }

  const { title, category, description, image, tags, year, client } = project;

  const handleDelete = () => {
    if (window.confirm(`Delete "${title}"?`)) {
      onDelete(project.id);
      navigate("/");
    }
  };

  return (
    <main className="detail-page">
      <div className="detail-page__inner">
        <Link to="/" className="detail-back">← Back to Portfolio</Link>

        <div className="detail-hero">
          <img src={image} alt={title} className="detail-hero__image" />
        </div>

        <div className="detail-content">
          <div className="detail-meta">
            <span className="detail-category">{category}</span>
            <span className="detail-year">{year}</span>
            {client && <span className="detail-client">{client}</span>}
          </div>

          <h1 className="detail-title">{title}</h1>
          <p className="detail-desc">{description}</p>

          <ul className="detail-tags" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag} className="detail-tag">{tag}</li>
            ))}
          </ul>

          <button className="detail-delete-btn" onClick={handleDelete}>
            Delete Project
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetailPage;
