# Sevora — Unified Volunteering & NGO Platform

A static frontend prototype (HTML/CSS/JS) for a volunteering + NGO platform.

## Run locally
```bash
cd "IITD HACKATHON"
python3 -m http.server 8080
# open http://localhost:8080
```
(or just open `index.html` in a browser.)

## Deploy

### Option 1 — Netlify Drop (fastest, no account needed for preview)
1. Zip the project folder (or keep it as a folder).
2. Go to https://app.netlify.com/drop
3. Drag the folder onto the page.
4. Get a live URL instantly. Add a custom domain in Netlify settings.

### Option 2 — Vercel
1. Push the folder to a GitHub repository.
2. Sign in at https://vercel.com → "Add New Project" → import the repo.
3. Framework preset: "Other" (static). Build command: none. Output dir: `/`.
4. Deploy.

### Option 3 — GitHub Pages
1. Create a new GitHub repo and push this folder.
2. Repo Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)`.
3. (A `.nojekyll` file is included so files starting with `_`/assets load correctly.)
4. Wait ~1 min; site at `https://<user>.github.io/<repo>/`.

### Option 4 — Surge (CLI)
```bash
npm i -g surge
cd "IITD HACKATHON"
surge . sevora.surge.sh
```

### Notes
- Fully static: no backend/DB/API keys. Chatbot and data are mock/simulated.
- TinyFish integration is referenced/documented but not called (no API key). For production, wire search/fetch through a backend proxy to keep keys secret.
- Replace illustrative data in `assets/js/data.js` with real verified listings.
```

Also add .nojekyll for GitHub Pages.<|end|><|start|><|start|>assistant to=write<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="path">
/Users/mehakluthra/Downloads/IITD HACKATHON/.nojekyll