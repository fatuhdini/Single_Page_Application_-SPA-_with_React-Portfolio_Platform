import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProjectList from "../components/ProjectList";
import "./HomePage.css";

/**
 * HomePage — landing page displaying the hero section, search bar, and project grid.
 * Filters the shared `projects` state from App based on search query.
 */
function HomePage({ projects }) {
  const [query, setQuery] = useState("");

  // Case-insensitive filter across title, category, and tags
  const filtered = projects.filter(({ title, category, tags }) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      title.toLowerCase().includes(q) ||
      category.toLowerCase().includes(q) ||
      tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <main className="home-page">
      {/* Hero */}
      <header className="hero">
        <div className="hero__label">Creative Portfolio</div>
        <h1 className="hero__title">
          We craft <span className="hero__title-accent">digital</span> experiences
          <br />
          that leave a mark.
        </h1>
        <p className="hero__sub">
          A curated showcase of branding, web design, and digital campaigns by Créatif Studio.
        </p>
      </header>

      {/* Toolbar: stats + search */}
      <div className="home-page__toolbar">
        <p className="home-page__count" aria-live="polite">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          {query && ` matching "${query}"`}
        </p>
        <SearchBar value={query} onSearch={setQuery} />
      </div>

      {/* Grid */}
      <ProjectList projects={filtered} searchQuery={query} />
    </main>
  );
}

export default HomePage;
