# Madaraka Homes Website

A modern real estate website for **Madaraka Homes** — showcasing properties, payment plans, and project details. Built in two versions: a React SPA (`site-react`) and a static HTML/CSS/JS version (`site`).

## Project Structure

```
madaraka-homes-website/
├── site-react/          # React + Vite + TypeScript (primary)
│   ├── src/
│   │   ├── components/  # 14 reusable components
│   │   ├── pages/       # 7 pages (Home, About, Projects, etc.)
│   │   └── ...
│   └── ...
├── site/                # Static HTML/CSS/JS version
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   └── *.html           # 7 HTML pages
└── README.md
```

## Quick Start

### Option 1 — React App (recommended)

```bash
cd site-react
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

> Requires **Node.js 18+** and npm.

### Option 2 — Static Site

Serve the `site/` directory with any HTTP server:

```bash
# Using Python
cd site
python3 server.py

# Or any static server
npx serve site
```

Open **http://localhost:8000** in your browser.

## Pages

| Page | React Route | Static File |
|------|-------------|-------------|
| Home | `/` | `index.html` |
| About | `/about` | `about.html` |
| Projects | `/projects` | `projects.html` |
| Project Detail | `/projects/:id` | `project-detail.html` |
| Payment Plans | `/payment-plans` | `payment-plans.html` |
| Blog | `/blog` | `blog.html` |
| Contact | `/contact` | `contact.html` |

## Tech Stack (site-react)

- **React 19** with TypeScript
- **Vite 8** — dev server & build
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations
- **React Router DOM v7** — routing
- **Lucide React** — icons

## Build for Production

```bash
cd site-react
npm run build
npm run preview    # preview production build
```

Output goes to `site-react/dist/`.

---

Built for Madaraka Homes © 2025
