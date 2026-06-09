import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProjectPage.css";

// Available category options for the dropdown
const CATEGORIES = ["Branding", "Web Design", "UX/UI", "Print", "Digital Marketing", "Motion", "Other"];

/**
 * AddProjectPage — form for adding a new project to the portfolio.
 * On submit, calls the `onAdd` callback from App with the new project data.
 */
function AddProjectPage({ onAdd }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    tags: "",
    year: new Date().getFullYear().toString(),
    client: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate required fields and return an errors object
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Project title is required.";
    if (!form.category) e.category = "Please select a category.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.year.trim() || isNaN(Number(form.year)))
      e.year = "Please enter a valid year.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const newProject = {
      id: Date.now(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      // Fall back to a placeholder image if none provided
      image:
        form.image.trim() ||
        `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80`,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year: form.year.trim(),
      client: form.client.trim(),
    };

    onAdd(newProject);
    setSubmitted(true);

    // Redirect to home after brief success feedback
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <main className="add-page">
      <div className="add-page__inner">
        <header className="add-page__header">
          <div className="add-page__label">New Entry</div>
          <h1 className="add-page__title">Add a Project</h1>
          <p className="add-page__sub">Fill in the details below to showcase your latest work.</p>
        </header>

        {submitted ? (
          <div className="add-page__success" role="status" data-testid="success-message">
            <span className="add-page__success-icon" aria-hidden="true">✓</span>
            <p>Project added! Redirecting…</p>
          </div>
        ) : (
          <form
            className="add-form"
            onSubmit={handleSubmit}
            noValidate
            data-testid="add-project-form"
          >
            {/* Title */}
            <div className="add-form__group">
              <label className="add-form__label" htmlFor="title">
                Project Title <span aria-hidden="true">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`add-form__input ${errors.title ? "add-form__input--error" : ""}`}
                placeholder="e.g. Brand Identity System"
                value={form.title}
                onChange={handleChange}
                aria-describedby={errors.title ? "title-error" : undefined}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <span id="title-error" className="add-form__error" role="alert">
                  {errors.title}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="add-form__group">
              <label className="add-form__label" htmlFor="category">
                Category <span aria-hidden="true">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`add-form__input add-form__select ${errors.category ? "add-form__input--error" : ""}`}
                value={form.category}
                onChange={handleChange}
                aria-describedby={errors.category ? "category-error" : undefined}
                aria-invalid={!!errors.category}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span id="category-error" className="add-form__error" role="alert">
                  {errors.category}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="add-form__group">
              <label className="add-form__label" htmlFor="description">
                Description <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                className={`add-form__input add-form__textarea ${errors.description ? "add-form__input--error" : ""}`}
                placeholder="Describe the project, its goals, and outcomes…"
                rows={4}
                value={form.description}
                onChange={handleChange}
                aria-describedby={errors.description ? "description-error" : undefined}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <span id="description-error" className="add-form__error" role="alert">
                  {errors.description}
                </span>
              )}
            </div>

            {/* Two-column row: Year + Client */}
            <div className="add-form__row">
              <div className="add-form__group">
                <label className="add-form__label" htmlFor="year">
                  Year <span aria-hidden="true">*</span>
                </label>
                <input
                  id="year"
                  name="year"
                  type="text"
                  className={`add-form__input ${errors.year ? "add-form__input--error" : ""}`}
                  placeholder="2024"
                  value={form.year}
                  onChange={handleChange}
                  aria-describedby={errors.year ? "year-error" : undefined}
                  aria-invalid={!!errors.year}
                />
                {errors.year && (
                  <span id="year-error" className="add-form__error" role="alert">
                    {errors.year}
                  </span>
                )}
              </div>

              <div className="add-form__group">
                <label className="add-form__label" htmlFor="client">
                  Client
                </label>
                <input
                  id="client"
                  name="client"
                  type="text"
                  className="add-form__input"
                  placeholder="e.g. Acme Corp"
                  value={form.client}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="add-form__group">
              <label className="add-form__label" htmlFor="image">
                Image URL <span className="add-form__optional">(optional)</span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                className="add-form__input"
                placeholder="https://…"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            {/* Tags */}
            <div className="add-form__group">
              <label className="add-form__label" htmlFor="tags">
                Tags <span className="add-form__optional">(comma-separated)</span>
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className="add-form__input"
                placeholder="e.g. Branding, Logo, Print"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            <div className="add-form__actions">
              <button type="button" className="add-form__btn add-form__btn--ghost" onClick={() => navigate("/")}>
                Cancel
              </button>
              <button type="submit" className="add-form__btn add-form__btn--primary">
                Add Project
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default AddProjectPage;
