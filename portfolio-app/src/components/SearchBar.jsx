import React from "react";
import "./SearchBar.css";

/**
 * SearchBar — controlled input for filtering projects by title, category, or tags.
 * Calls onSearch on every keystroke for real-time filtering.
 */
function SearchBar({ value, onSearch }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search projects by name, category, or tag…"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search projects"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onSearch("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
