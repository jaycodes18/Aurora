# Vayu — Cooling intelligence MVP

**Vayu** (from *vāyu*, air / wind — the medium every CRAC and CRAH moves through your hall) is the product name for this Stage 2 prototype: a **software-only** layer that helps **small and medium data centers** (especially in **Indian tier 2 / tier 3** markets) **optimize HVAC / cooling** on top of **existing BMS hardware**, without the pricing posture of global enterprise DCIM vendors.

The source folder may still be named `Aurora` if it matches your GitHub repository slug; that affects only the URL path below, not the product brand.

**Live demo (after you enable GitHub Pages — see below):**  
[https://jaycodes18.github.io/Aurora/](https://jaycodes18.github.io/Aurora/)

Repository: [github.com/jaycodes18/Aurora](https://github.com/jaycodes18/Aurora)

## Map to Stage 1 business case

| Stage 1 theme | What this MVP demonstrates |
| --- | --- |
| SMB operators priced out of Vertiv-class stacks | **Analytics** tab contrasts illustrative **enterprise license + utility** totals vs **Vayu license + utility** (numbers are placeholders—replace with validated quotes). |
| Software-only wedge vs hardware-and-software bundles | UI copy + **Architecture** schematic show **Vayu** as **cloud optimization + edge ingest**, not a CRAC replacement. |
| “Cloud model” for outreach | **Optimization** tab is an interactive **scenario twin**: toggle recommendations and watch **PUE**, **₹/month**, and **CO₂** shift—mirroring how you’d pitch savings before touching plant firmware. |
| Thermal risk without large CFD teams | **Thermal floor map** shows **segment-level inlet temperatures** with simple alerting on the **Overview** tab. |
| SDG 9 (Industry, Innovation & Infrastructure) | **Reports & SDG** tab contains a **100–150 word** alignment draft plus a **plain-text export** for judges. |

## Guided demo (for your Stage 2 video)

On load, a **Guided demo** panel opens (bottom-right). It walks through **six steps** aligned with each major screen: monitoring → thermal map → AI actions → economics → architecture → reports.

- Use **Next / Back** while narrating, or press **Auto-play** so the UI advances every five seconds (loops from step 6 → 1 for kiosk-style loops).
- Toggle **Hide guided demo** in the header if you want a clean full-screen capture after the tour.
- Strong shot for judges: on **AI optimization**, tap **Apply all safe recommendations**, then switch to **Energy & cost** to show PUE-driven deltas.

## Implemented features (prototype)

- **Guided demo** tour with step dots, auto-play, and tab sync
- Simulated **live PUE**, **utility projection**, **IT vs cooling kW**, and **rack inlet spread**
- **AI optimization** sandbox with apply/reset and aggregate impact panel
- **Recharts** visuals for energy timelines and **economic comparison** bars
- **Labeled system schematic** (SVG) suitable for slide export
- **GitHub Actions → GitHub Pages** deployment pipeline

> **Disclaimer:** All telemetry, tariffs, weather, and savings math are **illustrative** for demonstration. Production systems require validated models, safety interlocks, and on-site commissioning.

## Run locally

```bash
cd Aurora
npm install
npm run dev
```

After `npm run dev`, open **`http://localhost:3000/`** (root path). Port **3000** is set in Vite.

### Vercel (fix white screen)

This project defaults to **`base: "/"`**, which is correct for Vercel at `https://your-app.vercel.app/`.

If you previously built with **`base: "/Aurora/"`** (GitHub Pages only), scripts load from the wrong path on Vercel → **blank white page**. Redeploy after pulling the latest config.

Optional `vercel.json` includes an SPA fallback. Set **Framework Preset: Vite**, **Output:** `dist`, **Install:** `npm install`, **Build:** `npm run build`.

Do **not** set `VITE_BASE_PATH` on Vercel unless you deploy under a subpath.

### GitHub Pages (`/Aurora/`)

The GitHub Action sets **`VITE_BASE_PATH=/Aurora/`** during build so assets resolve at `https://user.github.io/Aurora/`.

## Publish to GitHub (`jaycodes18/Aurora`)

Push **this folder’s contents** as the repo root:

```bash
cd Aurora
git init
git add .
git commit -m "Initial Vayu Stage 2 MVP"
git branch -M main
git remote add origin https://github.com/jaycodes18/Aurora.git
git push -u origin main
```

### Enable GitHub Pages

1. Repo **Settings → Pages → Build and deployment**
2. **Source:** GitHub Actions  
3. After the workflow succeeds, the site will be at **https://jaycodes18.github.io/Aurora/**

If you **rename the GitHub repo**, change **`VITE_BASE_PATH`** in `.github/workflows/deploy.yml` to `"/<new-repo-name>/"` and adjust Pages URLs in this README.

## Stage 2 submission checklist (outside this repo)

Use **shareable links** (YouTube, Google Drive, etc.) per organiser rules:

1. **≤3 min video** — Problem → solution logic → walkthrough of each tab (Optimization + Analytics + Architecture).
2. **5-slide deck** — Export the **Architecture** SVG (screenshot or duplicate in Slides) for your schematic slide.
3. **SDG statement** — Copy from **Reports & SDG**; adjust wording if organisers require strict word limits.
4. **README link** — Include this repo plus the **Pages URL** above in your submission form.

## Stack

Vite, React 18, TypeScript, Tailwind CSS, Recharts, Lucide icons.

## License

MIT — adjust if your institution requires a different license.
