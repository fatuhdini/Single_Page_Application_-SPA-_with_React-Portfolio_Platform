import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProjectDetailPage.css";

/**
 * ProjectDetailPage — shows full details for a single project.
 * Supports inline editing (PATCH) and deletion (DELETE).
 */
function ProjectDetailPage({ projects, onDelete, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

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
      onDelete(project.id).then(() => navigate("/"));
    }
  };

  const handleEditOpen = () => {
    setForm({ title, category, description, year, client: client || "", tags: tags.join(", ") });
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const changes = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      year: form.year.trim(),
      client: form.client.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onUpdate(project.id, changes).then(() => setEditing(false));
  };

  return (
    <main className="detail-page">
      <div className="detail-page__inner">
        <Link to="/" className="detail-back">← Back to Portfolio</Link>

        <div className="detail-hero">
          <img src={image} alt={title} className="detail-hero__image" />
        </div>

        {editing ? (
          <form className="detail-edit-form" onSubmit={handleUpdate} data-testid="edit-form">
            <input name="title" className="detail-edit-input" value={form.title} onChange={handleChange} placeholder="Title" required />
            <input name="category" className="detail-edit-input" value={form.category} onChange={handleChange} placeholder="Category" required />
            <textarea name="description" className="detail-edit-input detail-edit-textarea" value={form.description} onChange={handleChange} placeholder="Description" rows={4} required />
            <input name="year" className="detail-edit-input" value={form.year} onChange={handleChange} placeholder="Year" required />
            <input name="client" className="detail-edit-input" value={form.client} onChange={handleChange} placeholder="Client" />
            <input name="tags" className="detail-edit-input" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
            <div className="detail-edit-actions">
              <button type="button" className="detail-edit-btn detail-edit-btn--cancel" onClick={() => setEditing(false)}>Cancel</button>
              <button type="submit" className="detail-edit-btn detail-edit-btn--save">Save Changes</button>
            </div>
          </form>
        ) : (
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

            <div className="detail-actions">
              <button className="detail-edit-btn detail-edit-btn--save" onClick={handleEditOpen}>Edit Project</button>
              <button className="detail-delete-btn" onClick={handleDelete}>Delete Project</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectDetailPage;
