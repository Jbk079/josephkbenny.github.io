# Joseph Benny — Portfolio

A static portfolio site: plain HTML, CSS and JavaScript with no build step and no dependencies. Everything that gets served is in `public/`, and the configs for each hosting option sit beside it.

```
joseph-benny-portfolio/
├── public/                      ← the website (deploy this folder)
│   ├── index.html
│   ├── 404.html
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── _headers                 ← security/cache headers (Netlify, Cloudflare Pages)
│   ├── staticwebapp.config.json ← Azure Static Web Apps config
│   ├── .nojekyll                ← GitHub Pages (branch deploys)
│   └── assets/
│       ├── css/styles.css
│       ├── js/main.js           ← theme toggle, photo fallback, copy buttons
│       ├── js/theme-init.js     ← applies the saved theme before the page paints
│       └── img/profile.jpg      ← profile photo (400 × 400)
├── Dockerfile                   ← Nginx (non-root) image on port 8080
├── nginx.conf
├── docker-compose.yml
├── netlify.toml
├── vercel.json
└── .github/workflows/deploy-pages.yml
```

## Profile photo

The photo is **`public/assets/img/profile.jpg`** (square, 400 × 400 px). To change it, replace that file with another square image of the same name. If the file is ever missing, the card shows a "JB" monogram instead.

## Preview locally

```bash
cd public
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

### GitHub Pages
1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The included workflow publishes `public/` on every push.

A repository named `<username>.github.io`, or a custom domain, serves the site at the root. In a project repository the site lives under `/<repo>/`. The main page still works there, but the 404 page loads its styles from `/` and will appear unstyled.

### Netlify
Import the repo, or drag the `public/` folder onto app.netlify.com/drop. `netlify.toml` sets the publish directory, and `public/_headers` applies the security headers.

### Vercel
Import the repo (framework preset: **Other**). `vercel.json` sets the output directory to `public` and adds the headers. From the CLI, run `npx vercel --prod`.

### Cloudflare Pages
Create a project from the repo. Leave the build command empty and set the build output directory to `public`. `_headers` is picked up automatically.

### Azure Static Web Apps
Create a Static Web App from the repo with **App location** `public`, **Output location** left empty and no build. `staticwebapp.config.json` handles the headers and the 404 page.

### Docker (any VM, Kubernetes, Azure Container Apps, AWS App Runner, Cloud Run)
```bash
docker build -t joseph-benny-portfolio .
docker run -d -p 8080:8080 --name portfolio joseph-benny-portfolio
# or: docker compose up -d
# open http://localhost:8080 — health check at /healthz
```
The image runs Nginx as a non-root user on port 8080, with gzip, security headers and asset caching configured.

### AWS S3 + CloudFront (or any static file host)
```bash
aws s3 sync public/ s3://YOUR-BUCKET --delete
```
Set `index.html` as the index document and `404.html` as the error document. Add the headers from `public/_headers` with a CloudFront response-headers policy.

### Any web server or shared hosting
Upload the contents of `public/` to the web root (for example `public_html/`).

## Editing

- **Content:** `public/index.html` (hero, experience, research publication, tech stack, education, contact)
- **Colours, fonts, layout:** the `:root` tokens at the top of `public/assets/css/styles.css`. Light mode is light blue and white with black text; dark mode is black, grey and dark blue with white text; all text is Arial (a system font, so nothing is downloaded). The header toggle switches between light and dark mode and remembers the choice in the visitor's browser; first-time visitors get their system setting.
- **Behaviour:** `public/assets/js/main.js` (theme toggle, photo fallback, copy buttons) and `public/assets/js/theme-init.js` (applies the saved theme early).

The Content-Security-Policy only allows the site's own files (it also permits Google Fonts, in case you add a web font later). If you add analytics or other external scripts, add their domains to the policy in each config (`_headers`, `vercel.json`, `nginx.conf`, `staticwebapp.config.json`).
