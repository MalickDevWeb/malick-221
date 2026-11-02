# CI/CD and Render deployment

This repository deploys three Node.js services to each of two permanent Render environments:

| Environment | Source branch | API | Storefront | Admin |
|---|---|---|---|---|
| Staging | `develop` | `malick-buss-api-staging` | `malick-buss-storefront-staging` | `malick-buss-admin-staging` |
| Production | `main` | `malick-buss-api` | `malick-buss-storefront` | `malick-buss-admin` |

Render auto-deploy is disabled for all six services. GitHub Actions is the only configured release trigger.

## Workflow

`.github/workflows/ci-cd.yml` runs for pull requests to `develop`/`main` and pushes to those branches.

- PR checks use Node.js 20 and `npm ci`, build the shared workspace, generate Prisma Client, validate the Prisma schema, run unit and database-backed API integration tests against a disposable PostgreSQL service, and build the backend, storefront, and admin. Dependency auditing (`npm audit --audit-level=high`) and CodeQL static analysis run as separate checks; CodeQL does not run on fork PRs because fork tokens cannot write security results.
- Dependabot proposes weekly npm and GitHub Actions updates; those changes still pass the same pull-request checks before merging.
- SonarCloud runs on pushes and same-repository PRs and produces backend unit-test coverage. Fork PRs skip Sonar because they cannot receive repository secrets. Sonar configuration is required for staging and production releases; a missing token, organization, project key, scan failure, or failed Quality Gate stops deployment.
- A push to `develop` deploys staging only after build, database tests, security checks, and Sonar succeed. The staging API Render pre-deploy command runs `prisma migrate deploy` with that service's staging-only `DATABASE_URL`. The workflow deploys API, storefront, and admin serially, waits for each Render deployment to reach `live`, then retries HTTPS checks for API `/health/live`, API `/health/ready`, API `/docs`, storefront `/`, and admin `/`.
- A push to `main` requires build/security success, a passing Sonar Quality Gate, and a successful `Deploy staging` job from a `develop` workflow run whose Git tree exactly matches the production commit. Tree comparison permits a merge commit that has the same source tree while rejecting production-only source changes. The workflow then deploys production, waits for Render `live` status, and smoke-tests the same endpoints. Production deploys are serialized and never cancel an in-progress release.

The API Render health check is `/health/ready`, backed by `Prisma SELECT 1`. `/health/live` checks that the API process is serving requests. Deployment smoke checks also cover the Swagger `/docs` route. Readiness failures return an unsuccessful HTTP response and block the release. A failed post-deployment check stops promotion but does not automatically roll back; operators must inspect Render and decide whether to roll back the application or roll forward. Database migrations are not automatically reversed.

## Render setup required

The Blueprint describes six web services, not databases. An operator must:

1. Review and apply/sync `render.yaml` in the intended Render workspace. Confirm the six services bind to the expected branches and have **Auto-Deploy disabled**.
2. Create and retain separate, permanent staging and production PostgreSQL databases. Set each API's `DATABASE_URL` in Render to its corresponding database only. Never copy the staging URL to production or vice versa.
3. Configure each API's required Redis URL, JWT secrets, CORS/client URLs, super-admin bootstrap secret, and Cloudinary credentials independently in Render. The Cloudinary cloud name is already set in `render.yaml`; set `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` through Render's secret configuration, never in source control. Set `FRONTEND_CLIENT_URL` and `CORS_ORIGINS` to the correct environment-specific origins. Set each frontend/admin `NEXT_PUBLIC_API_URL` to that environment's public API URL.
4. Configure secrets in Render's environment-variable UI/secret store; `sync: false` entries intentionally do not contain values in source control. Add a separate production database backup/restore plan before the first production migration. Keep staging data non-production and protect personal data.
5. After services exist, obtain their Render service IDs and public HTTPS URLs. Blueprint changes do not create or populate GitHub secrets, environments, branch protections, databases, or credentials automatically.

The production API also has a Render pre-deploy `prisma migrate deploy` command, run only when the production API is deployed after the staging promotion check. Render injects that service's **production** `DATABASE_URL`; staging deployment uses the staging API service's separate environment. Restrict who can manually trigger Render deploys so the CI/CD promotion gate is not bypassed. Review the migration diff and ensure every production migration is backward-compatible with the currently running application. Prefer expand/migrate/contract changes, take/verify backups, and have a recovery plan; rolling back application code does not automatically reverse database migrations.

## GitHub configuration required

Create GitHub Environments named exactly `staging` and `production`. Restrict staging to `develop` and production to `main`. For automatic production releases, do not configure required environment reviewers; adding reviewers intentionally makes releases wait for approval.

Set these **Environment Variables** in both environments (using each environment's own values):

| Variable | Description |
|---|---|
| `RENDER_API_SERVICE_ID` | Render API service ID for this environment |
| `RENDER_STOREFRONT_SERVICE_ID` | Render storefront service ID for this environment |
| `RENDER_ADMIN_SERVICE_ID` | Render admin service ID for this environment |
| `RENDER_API_URL` | Public HTTPS API origin, with no route suffix |
| `RENDER_STOREFRONT_URL` | Public HTTPS storefront origin |
| `RENDER_ADMIN_URL` | Public HTTPS admin origin |

Set `RENDER_API_KEY` as a GitHub **Environment Secret** in both environments. Use a Render API key controlled by an authorized operator, restrict access as Render supports, and rotate it if exposed. These values are necessary because GitHub Actions triggers and polls deployments through the Render API; no deploy hook URL or key is committed.

Set `SONAR_ORGANIZATION` and `SONAR_PROJECT_KEY` as repository or organization Variables, and `SONAR_TOKEN` as a repository or organization Secret. Configure the project/organization in SonarCloud and confirm the Quality Gate behavior before enabling staging promotion. Staging and production remain blocked until the required SonarCloud configuration is present and the Quality Gate passes.

Protect `develop` and `main` with pull requests, required build/security checks, and up-to-date review policy. Require the `SonarCloud Quality Gate` check for same-repository PRs. Restrict direct pushes and force pushes, and only promote a source tree already validated on staging. The workflow's production promotion check provides an additional enforcement; it does not replace repository branch rules.

## Cost, migration, and operations

Keeping staging permanently available adds three Render web services, plus a separate staging database and (if used) Redis. The six web services and two databases can incur ongoing charges; review Render's current plans, database pricing, backups, and regional availability before applying the Blueprint. No price estimate or resources are created by this repository change.

Prisma migrations execute in the API service's Render pre-deploy lifecycle. The three services deploy sequentially and Render does not provide an atomic transaction across them; the workflow stops on the first failure, and operators should inspect service status before retrying or rolling forward. Do not manually trigger production deployments before the promotion workflow has passed. Do not use production credentials in staging or test fixtures. Staging service failure, Render API polling failure, a failed health check, failed security check, missing Sonar configuration on main, or missing matching staging validation all stop the release.

The GitHub workflow invokes deployment and HTTP health checks but does not create Render resources, configure DNS/custom domains, populate runtime variables, create database backups, or configure GitHub protections. Render-side provisioning and all required secrets/URLs remain operator actions.
