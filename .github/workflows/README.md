# CI/CD Pipeline Documentation

## Overview
This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

## Workflows

### 1. CI/CD Pipeline (`deploy.yml`)
**Triggers:**
- Push to `master` or `main` branch
- Pull requests to `master` or `main` branch

**Jobs:**
- **Build and Test**: Builds the application and runs linters
- **Deploy**: Deploys to production (only on push to master/main)

**Features:**
- ✅ Automated builds on every push
- ✅ ESLint checks
- ✅ Build artifact caching
- ✅ Automatic deployment to GitHub Pages

### 2. Continuous Integration (`ci.yml`)
**Triggers:**
- Pull requests to any branch
- Push to `develop` or `feature/*` branches

**Jobs:**
- **Lint & Format Check**: Code quality checks
- **Build**: Verifies successful build
- **Security Scan**: npm audit and dependency checks

### 3. Docker Build & Push (`docker.yml`)
**Triggers:**
- Push to `master` or `main` branch
- Version tags (e.g., `v1.0.0`)
- Pull requests

**Features:**
- ✅ Multi-platform builds (amd64, arm64)
- ✅ Automatic push to GitHub Container Registry
- ✅ Build caching for faster builds
- ✅ Semantic versioning tags

## Setup Instructions

### 1. GitHub Pages Deployment (Default)
No additional setup required. The workflow will automatically deploy to GitHub Pages.

**To enable GitHub Pages:**
1. Go to your repository Settings
2. Navigate to Pages
3. Select "GitHub Actions" as the source

### 2. Vercel Deployment (Alternative)
1. Uncomment the Vercel deployment section in `deploy.yml`
2. Add these secrets to your repository:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### 3. Netlify Deployment (Alternative)
1. Uncomment the Netlify deployment section in `deploy.yml`
2. Add these secrets to your repository:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

### 4. Docker Registry
The Docker workflow automatically pushes to GitHub Container Registry (ghcr.io).

**To use the Docker image:**
```bash
docker pull ghcr.io/hamzaelboukri/careflowfront:latest
docker run -p 3000:80 ghcr.io/hamzaelboukri/careflowfront:latest
```

## Workflow Status Badges

Add these to your main README.md:

```markdown
![CI/CD Pipeline](https://github.com/hamzaelboukri/careflowfront/actions/workflows/deploy.yml/badge.svg)
![Continuous Integration](https://github.com/hamzaelboukri/careflowfront/actions/workflows/ci.yml/badge.svg)
![Docker Build](https://github.com/hamzaelboukri/careflowfront/actions/workflows/docker.yml/badge.svg)
```

## Environment Variables

### Build-time Variables
Create `.env.production` file for production builds:
```env
VITE_API_URL=https://api.careflow.com
VITE_APP_NAME=CareFlow EHR
```

### GitHub Secrets (Optional)
Add these in: Repository Settings → Secrets and variables → Actions

- `VERCEL_TOKEN` - For Vercel deployments
- `VERCEL_ORG_ID` - For Vercel deployments
- `VERCEL_PROJECT_ID` - For Vercel deployments
- `NETLIFY_AUTH_TOKEN` - For Netlify deployments
- `NETLIFY_SITE_ID` - For Netlify deployments

## Deployment Strategies

### Strategy 1: GitHub Pages (Recommended for static sites)
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ Custom domain support
- ⚠️ Static sites only

### Strategy 2: Vercel (Recommended for modern apps)
- ✅ Zero-config deployments
- ✅ Automatic preview deployments
- ✅ Edge network
- ✅ Serverless functions

### Strategy 3: Netlify
- ✅ Simple setup
- ✅ Form handling
- ✅ Split testing
- ✅ Redirect rules

### Strategy 4: Docker + Cloud Provider
- ✅ Full control
- ✅ Works anywhere
- ✅ Scalable
- ⚠️ Requires infrastructure setup

## Troubleshooting

### Build Fails
1. Check the workflow logs in the Actions tab
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript compiles without errors locally

### Deployment Fails
1. Check if secrets are correctly configured
2. Verify branch names match workflow triggers
3. Check deployment service status

### Docker Build Fails
1. Verify `Dockerfile` exists and is correct
2. Check for build context issues
3. Ensure all files are committed

## Best Practices

1. **Branch Protection**: Enable branch protection rules for `master`/`main`
2. **Required Reviews**: Require PR reviews before merging
3. **Status Checks**: Make CI checks required before merging
4. **Semantic Versioning**: Use tags like `v1.0.0` for releases
5. **Secrets Management**: Never commit secrets to the repository

## Manual Deployment

To manually trigger a deployment:
1. Go to Actions tab
2. Select "CI/CD Pipeline" workflow
3. Click "Run workflow"
4. Select branch and run

## Local Testing

Test the build locally before pushing:
```bash
# Install dependencies
npm ci

# Run linter
npm run lint

# Build project
npm run build

# Preview build
npm run preview
```

## Support

For issues or questions:
1. Check the Actions logs
2. Review this documentation
3. Open an issue in the repository
