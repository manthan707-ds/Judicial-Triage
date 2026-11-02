# JudicialTriage

AI-assisted case prioritisation dashboard (React 19 + Vite 8 + Tailwind 4 + Recharts).
Independent software project, not affiliated with any government body or court.

## Run locally
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # outputs dist/
    npm run preview

Demo login: `judge@example.com` / `Judge@123`

## Configuration
Copy `.env.example` to `.env`.

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the FastAPI backend (`GET /api/cases`) |
| `VITE_DEMO_FALLBACK` | `false` disables sample data when the API is unreachable |

## Deploy
**Vercel:** import the repo, framework Vite (auto-detected), add `VITE_API_URL`, deploy.
**Netlify:** import the repo; `netlify.toml` sets build `npm run build`, publish `dist`.
**Any static host:** run `npm run build` and upload `dist/`.

## Before going live
- The login is a front-end demo only (credentials are in `src/pages/Login.jsx`). Replace `handleSubmit` with real authentication from your backend before handling real data.
- Enable CORS on the backend for your deployed domain.
- Serve the backend over HTTPS, otherwise browsers block it from an HTTPS site.
- Set `VITE_DEMO_FALLBACK=false` so users never see sample data as if it were real.
# Judicial-Triage
