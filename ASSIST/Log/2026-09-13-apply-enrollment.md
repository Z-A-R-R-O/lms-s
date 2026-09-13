# Apply enrollment flow

## Scope

- Changed the public header action from `Sign in` to `Apply Now`.
- Added the `/apply` page with the four-step enrollment form.
- Added course and learning-mode selection, personal details, education details, review, and success states.
- Used the existing marketing program catalog for course choices.
- Replaced the static trusted-company row with a continuous company-wordmark loop.
- Replaced the static landing program cards with a filterable eight-program course catalog.
- Added program details, curriculum, learner profiles, career paths, certificate preview, and Apply Now actions.
- Replaced the previous mentor section with four responsive mentor cards and LinkedIn links.
- Reordered the homepage and added collaboration, study-spot, and success-story sections with the requested learner metrics.
- Combined the Study Spot and Success Story into one compact, metric-led homepage section.
- Elevated the combined panel with viewport count-ups, an animated growth trajectory, restrained atmospheric motion, and reduced-motion support.
- Added fictional generated editorial portraits to the mentor cards as replaceable visual placeholders.
- Consolidated Student Success Stories into the full success panel and added a continuous review loop.
- Replaced native enrollment selects with styled accessible custom menus to avoid browser-default dropdown rendering.
- Replaced the public `Get Started` CTA with a single primary `Apply Now` action. The header now detects an authenticated learner and offers a contextual `Continue, <name>` action instead.
- Added sign-in and account-creation entry points to the enrollment page for returning and new learners.
- Consolidated new-account creation into the five-step enrollment flow. The standalone `/signup` route now redirects to `/apply`; returning learners retain only the sign-in path.
- Added password setup as the Account step, account creation on submission, and an email verification connection panel in the completion state. Removed the celebration emoji from the submission heading.

## Verification

- `npm.cmd run typecheck` passed.
- Focused ESLint passed for the changed application and header files.
- `npm.cmd run build` passed.
- Browser review passed for the `/apply` page and its required-field validation.
- The trusted-company loop moves continuously and pauses on hover.
- The build keeps the existing admin backup trace warning.
# Vercel deployment preparation

- Simplified `web/vercel.json` to the required Next.js build settings.
- Added `web/.env.production.example` and `web/VERCEL_DEPLOYMENT.md` with durable LibSQL database requirements and Vercel handoff steps.
- Deployment was not triggered because this workspace has no linked Vercel project or authenticated CLI session.
