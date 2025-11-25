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

### 3. Dependency Update (`.github/workflows/dependency-update.yml`)

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

## Deployment

This project is deployed on **Vercel** with automatic GitHub integration.

### Vercel Deployment
- Deployment is handled by Vercel's GitHub integration
- Every push to `main` triggers automatic deployment
- Every PR gets a preview URL
- No GitHub Actions workflow needed

See [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for detailed setup instructions.

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
feature-branch → dev → main → production (Vercel)
```

1. **Feature branches** → Create PR to `dev`
2. **Dev branch** → Runs CI, merged after approval
3. **Main branch** → Triggers Vercel deployment after merge
4. **Production** → Automatically deployed by Vercel

### Rollback Strategy

**Via Git:**
1. Revert commit on `main` branch
2. Push the revert
3. Vercel automatically redeploys previous version

**Via Vercel Dashboard:**
1. Go to Vercel project deployments
2. Find previous successful deployment
3. Click "Promote to Production"

## Performance Optimization

### Caching Strategy
- npm dependencies cached using `actions/setup-node@v4`
- Build artifacts cached for 7 days

### Matrix Strategy
- Tests run on Node.js 20.x and 22.x
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
