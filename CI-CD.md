# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for continuous integration and deployment. The pipeline includes automated testing, linting, building, security audits, and deployment.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main`, `dev`, or `dev_unit_tests_*` branches
- Pull requests to `main` or `dev`

**Jobs:**

#### Test & Lint
- Runs on Node.js 18.x and 20.x (matrix strategy)
- Installs dependencies
- Runs ESLint
- Executes all tests
- Generates coverage report
- Uploads coverage to Codecov

#### Build
- Runs after tests pass
- Builds production bundle
- Uploads build artifacts (7-day retention)

#### Security
- Runs npm audit
- Checks for vulnerabilities at moderate and high levels

### 2. Coverage Workflow (`.github/workflows/coverage.yml`)

**Triggers:**
- Push to `main` or `dev`
- Pull requests to `main`

**Features:**
- Generates detailed coverage reports
- Creates coverage badges
- Comments coverage on PRs
- Uploads coverage artifacts

### 3. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Deployment:**
- **GitHub Pages** (configured and active)

**Steps:**
- Runs full test suite
- Builds production bundle with correct base path
- Deploys to GitHub Pages automatically

**Live URL:** `https://bsozer06.github.io/e-shop-app/`

### 4. Dependency Update (`.github/workflows/dependency-update.yml`)

**Triggers:**
- Scheduled: Every Monday at 9:00 AM UTC
- Manual workflow dispatch

**Features:**
- Automatically updates dependencies
- Runs tests to verify updates
- Creates a pull request with changes

## Required Secrets

To enable all workflows, configure these secrets in your GitHub repository:

### For Coverage (Optional)
- `CODECOV_TOKEN` - Codecov integration token

### For GitHub Pages Deployment
**No secrets required!** GitHub Pages uses the built-in `GITHUB_TOKEN` automatically.

## Setting Up GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select branch: **gh-pages** and folder: **/ (root)**
5. Click **Save**

The workflow will automatically create the `gh-pages` branch on first deployment.

### Getting Codecov Token

1. Visit [codecov.io](https://codecov.io/)
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token

## Workflow Status Badges

Add these badges to your README:

```markdown
![CI](https://github.com/bsozer06/e-shop-app/workflows/CI/badge.svg)
![Coverage](https://github.com/bsozer06/e-shop-app/workflows/Coverage/badge.svg)
![Deploy](https://github.com/bsozer06/e-shop-app/workflows/Deploy/badge.svg)
```

## Local Testing

Test your workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
npm install -g @nektos/act

# Run CI workflow
act push

# Run specific job
act -j test

# Run with secrets
act -s CODECOV_TOKEN=your_token
```

## Branch Protection Rules

Recommended settings for `main` branch:

1. **Require pull request reviews**
   - Required approvals: 1

2. **Require status checks to pass**
   - Test & Lint
   - Build
   - Security Audit

3. **Require branches to be up to date**

4. **Include administrators**

## Continuous Deployment Strategy

### Development Flow
```
feature-branch → dev → main → production
```

1. **Feature branches** → Create PR to `dev`
2. **Dev branch** → Runs CI, merged after approval
3. **Main branch** → Triggers deployment after merge
4. **Production** → Automatically deployed from `main`

### Rollback Strategy

1. Revert commit on `main` branch
2. Push the revert
3. Automatic redeployment with previous version

## Performance Optimization

### Caching Strategy
- npm dependencies cached using `actions/setup-node@v4`
- Build artifacts cached for 7 days

### Matrix Strategy
- Tests run on Node.js 18.x and 20.x
- Ensures compatibility across versions

## Monitoring and Notifications

### Workflow Notifications
- GitHub sends email on workflow failures
- Configure in GitHub settings → Notifications

### Slack Integration (Optional)
Add to any job:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

## Troubleshooting

### Tests Failing in CI but Passing Locally

1. Check Node.js version mismatch
2. Verify environment variables
3. Check for timing issues in tests
4. Review CI logs for specific errors

### Build Artifacts Not Uploading

1. Verify `dist/` directory exists
2. Check build script completion
3. Review artifact retention settings

### Deployment Failing

1. Verify all secrets are set correctly
2. Check deployment platform status
3. Review build output for errors
4. Verify project is linked correctly

## Cost Optimization

- **GitHub Actions**: 2,000 minutes/month free for public repos
- **Vercel**: Unlimited deployments for personal projects
- **Netlify**: 300 build minutes/month free
- **Codecov**: Free for open source

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Codecov Documentation](https://docs.codecov.com/)
- [npm Audit Documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
