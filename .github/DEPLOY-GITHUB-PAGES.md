# GitHub Pages Deployment Guide

## Quick Setup

Your project is now configured to deploy to GitHub Pages automatically!

## 📋 Prerequisites

- GitHub repository: `bsozer06/e-shop-app`
- Main branch with code pushed

## 🚀 One-Time Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/bsozer06/e-shop-app`
2. Click **Settings** (top menu)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: **gh-pages**
   - Folder: **/ (root)**
5. Click **Save**

**Note:** The `gh-pages` branch will be automatically created on the first deployment.

### 2. Push Your Code

```bash
git add .
git commit -m "feat: configure GitHub Pages deployment"
git push origin main
```

### 3. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. Watch the **Deploy** workflow run
3. Once completed (green checkmark), your site will be live at:
   
   **https://bsozer06.github.io/e-shop-app/**

## ⚙️ How It Works

### Build Configuration
- **Base path:** `/e-shop-app/` (configured in `vite.config.ts`)
- **Build output:** `dist/` directory
- **GitHub Pages branch:** `gh-pages`

### Workflow
1. You push to `main` branch
2. GitHub Actions runs the Deploy workflow
3. Tests are executed
4. Production build is created
5. Build artifacts are pushed to `gh-pages` branch
6. GitHub Pages serves the content

## 🔧 What Was Changed

### 1. Deploy Workflow (`.github/workflows/deploy.yml`)
- Changed from Vercel to GitHub Pages deployment
- Uses `peaceiris/actions-gh-pages@v4` action
- No secrets required (uses built-in `GITHUB_TOKEN`)

### 2. Vite Configuration (`vite.config.ts`)
- Added `base: '/e-shop-app/'`
- Ensures all asset paths work correctly on GitHub Pages

### 3. Documentation
- Updated `CI-CD.md` with GitHub Pages instructions
- Updated `README.md` with live demo link

## 🐛 Troubleshooting

### Deployment Failed
- Check the Actions tab for error details
- Ensure all tests pass before deployment
- Verify the build succeeds locally: `npm run build`

### 404 Error on Routes
- GitHub Pages serves a single `index.html`
- All routes should work with the configured SPA setup
- If issues persist, check the `dist/` folder structure

### Assets Not Loading
- Verify `base: '/e-shop-app/'` is in `vite.config.ts`
- Check browser console for path errors
- Ensure all imports use relative paths

### First Deployment Takes Time
- Initial setup may take 5-10 minutes
- Subsequent deployments are faster (1-2 minutes)
- Check Actions tab for progress

## 📊 Monitoring

### Check Deployment Status
```bash
# View workflow runs
gh run list --workflow=deploy.yml

# Watch specific run
gh run watch <run-id>
```

### View Logs
1. Go to **Actions** tab
2. Click on latest **Deploy** workflow run
3. Click on **Deploy to Production** job
4. View step-by-step logs

## 🔄 Updating the Site

Every push to `main` automatically triggers deployment:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Deployment starts automatically
```

## 🎯 Next Steps

1. ✅ **Enable GitHub Pages** in repository settings
2. ✅ **Push your code** to trigger first deployment
3. ✅ **Visit your live site** at https://bsozer06.github.io/e-shop-app/
4. ✅ **Share the link** with others!

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions for Pages](https://github.com/marketplace/actions/github-pages-action)

## 🎉 Benefits of GitHub Pages

- ✅ **Free hosting** for public repositories
- ✅ **No secrets required** (uses built-in token)
- ✅ **Automatic SSL/HTTPS**
- ✅ **CDN delivery** for fast loading
- ✅ **Simple setup** and maintenance
- ✅ **Built-in to GitHub** (no external services)

Enjoy your automated deployments! 🚀
