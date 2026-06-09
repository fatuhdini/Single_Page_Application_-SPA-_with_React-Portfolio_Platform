# Créatif Studio — Portfolio Platform

A modern, responsive single-page application (SPA) built with React that showcases a creative agency's work. Users can browse projects, search/filter in real time, add new projects via a form, and view full project details.

---

## Features

- **Landing page** with a hero section and a responsive project grid
- **Real-time search** — filter projects by title, category, or tag as you type
- **Add Project form** — validated form that dynamically adds new entries to the top of the grid
- **Project detail page** — full view of a project with the ability to delete it
- **Responsive design** — fluid grid and layout adjustments for mobile, tablet, and desktop
- **Accessible** — semantic HTML, ARIA labels, keyboard-navigable, visible focus rings
- **23 unit tests** covering all key components and user interactions

---

## Component Tree

```
App  (state: projects[])
├── Navbar
└── Routes
    ├── /              → HomePage  (state: query)
    │   ├── SearchBar
    │   └── ProjectList
    │       └── ProjectCard  (×n)
    ├── /add           → AddProjectPage  (state: form, errors, submitted)
    └── /project/:id   → ProjectDetailPage
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| React Router DOM v7 | Client-side routing |
| Jest + React Testing Library | Unit & integration tests |
| CSS Modules (plain CSS per component) | Scoped styling |
| Create React App | Build tooling |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-app

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

### Running Tests

```bash
npm test
```

Runs all 23 tests in watch mode. Use `CI=true npm test -- --watchAll=false` for a single run.

---

## Usage

| Action | How |
|---|---|
| Browse projects | Visit the home page (`/`) |
| Search / filter | Type in the search bar — results update instantly |
| Add a project | Click **Add Project** in the nav or go to `/add` |
| View project details | Click any project card title or image |
| Delete a project | Open the detail page and click **Delete Project** |

---

## Project Structure

```
portfolio-app/
├── public/
│   └── index.html
└── src/
    ├── __tests__/
    │   ├── AddProjectPage.test.jsx
    │   ├── HomePage.test.jsx
    │   ├── ProjectCard.test.jsx
    │   ├── ProjectList.test.jsx
    │   └── SearchBar.test.jsx
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── ProjectCard.jsx / .css
    │   ├── ProjectList.jsx / .css
    │   └── SearchBar.jsx / .css
    ├── data/
    │   └── projects.js       ← seed data
    ├── pages/
    │   ├── AddProjectPage.jsx / .css
    │   ├── HomePage.jsx / .css
    │   └── ProjectDetailPage.jsx / .css
    ├── App.js
    ├── App.css
    ├── index.js
    └── setupTests.js
```

---

## Known Limitations

- **No persistence** — project data lives in React state only; refreshing the page resets to the seed data. Adding `localStorage` sync or a backend API would address this.
- **Image field** — accepts a URL string; direct file uploads are not supported.
- **No edit functionality** — projects can be added or deleted but not edited in place.

---

## License

MIT
