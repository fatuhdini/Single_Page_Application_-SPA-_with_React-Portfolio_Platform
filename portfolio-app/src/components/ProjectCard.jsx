import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

/**
 * ProjectCard — displays a single project's summary.
 * Links to the project detail page via its id.
 */
function ProjectCard({ project }) {
  const { id, title, category, description, image, tags, year, client } = project;

  return (
    <article className="project-card" data-testid="project-card">
      <Link to={`/project/${id}`} className="project-card__image-link" tabIndex="-1" aria-hidden="true">
        <div className="project-card__image-wrap">
          <img
            src={image}
            alt={title}
            className="project-card__image"
            loading="lazy"
          />
          <span className="project-card__category">{category}</span>
        </div>
      </Link>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__year">{year}</span>
          {client && <span className="project-card__client">{client}</span>}
        </div>

        <Link to={`/project/${id}`} className="project-card__title-link">
          <h2 className="project-card__title">{title}</h2>
        </Link>

        <p className="project-card__desc">{description}</p>

        <ul className="project-card__tags" aria-label="Project tags">
          {tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ProjectCard;
