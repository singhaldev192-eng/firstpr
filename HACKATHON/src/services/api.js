/**
 * Frontend Service Layer for FirstPR
 * 
 * Interacts with partner's backend & DigitalHost AI service.
 * If backend is offline or unconfigured, provides a transparent fallback
 * with an explicitly labeled demo dataset. Never presents mock data as live results.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Demo repository dataset for offline demonstration
const DEMO_REPOSITORIES = {
  'facebook/react': {
    owner: 'facebook',
    repo: 'react',
    description: 'The library for web and native user interfaces.',
    stars: 228000,
    forks: 46200,
    defaultBranch: 'main',
    openIssuesCount: 840,
    issues: [
      {
        number: 28410,
        title: 'Improve error message when Suspense boundary lacks fallback prop',
        author: 'gaearon',
        createdAt: '2026-10-18T14:20:00Z',
        commentsCount: 6,
        labels: ['good first issue', 'difficulty: starter', 'area: error-handling'],
        body: 'When a <Suspense> component is declared without a fallback property, React currently throws a generic invariant violation. We should provide a dedicated development warning with documentation links.',
        analysis: {
          summary: 'Add an explicit development warning when Suspense is rendered without a valid fallback prop.',
          difficulty: 'Beginner-friendly',
          estimatedMinutes: 45,
          targetStack: ['JavaScript', 'React Internals', 'Jest'],
          steps: [
            {
              id: 'step-1',
              title: 'Locate Suspense component validation',
              detail: 'Find the element validation checks in the React runtime reconciler.',
              fileTarget: 'packages/react-reconciler/src/ReactFiberSuspenseComponent.js',
              command: 'git grep -n "Suspense" packages/react-reconciler',
              guidance: 'Look for validateSuspenseProps() where component props are destructured.',
            },
            {
              id: 'step-2',
              title: 'Add development console.error warning',
              detail: 'Check if __DEV__ is true and props.fallback is undefined, then log informative warning.',
              fileTarget: 'packages/react/src/ReactSuspense.js',
              command: 'git checkout -b fix/suspense-fallback-warning',
              guidance: 'Use standard warning() helper with the component stack trace.',
            },
            {
              id: 'step-3',
              title: 'Run Jest tests for Suspense error boundaries',
              detail: 'Verify the new warning fires without breaking existing Suspense test cases.',
              fileTarget: 'packages/react-reconciler/src/__tests__/ReactSuspense-test.internal.js',
              command: 'npm test -- packages/react-reconciler/src/__tests__/ReactSuspense-test.internal.js',
              guidance: 'Run tests with --watch to iterate on error boundary assertions.',
            },
            {
              id: 'step-4',
              title: 'Prepare Pull Request',
              detail: 'Format code with Prettier and generate a clear pull request description.',
              fileTarget: 'PR_TEMPLATE.md',
              command: 'git commit -m "Warn in dev when Suspense lacks fallback prop"',
              guidance: 'Reference issue #28410 and include before/after console logs in your PR summary.',
            },
          ],
        },
      },
      {
        number: 28392,
        title: 'Docs: Fix typo in useActionState parameter description',
        author: 'acdlite',
        createdAt: '2026-10-22T09:15:00Z',
        commentsCount: 2,
        labels: ['good first issue', 'documentation'],
        body: 'The documentation table for useActionState has an inverted description for the initialState argument.',
        analysis: {
          summary: 'Correct the initialState parameter description in React documentation markdown.',
          difficulty: 'Starter',
          estimatedMinutes: 20,
          targetStack: ['Markdown', 'Documentation'],
          steps: [
            {
              id: 'step-1',
              title: 'Locate documentation markdown file',
              detail: 'Open the useActionState reference document in the react.dev content directory.',
              fileTarget: 'src/content/reference/react/useActionState.md',
              command: 'git checkout -b docs/fix-use-action-state-param',
              guidance: 'Search for initialState in the parameter table section.',
            },
            {
              id: 'step-2',
              title: 'Fix typo and verify markdown preview',
              detail: 'Update the explanation sentence and verify table formatting renders cleanly.',
              fileTarget: 'src/content/reference/react/useActionState.md',
              command: 'npm run dev',
              guidance: 'Check the local dev server at localhost:3000/reference/react/useActionState.',
            },
            {
              id: 'step-3',
              title: 'Commit and submit PR',
              detail: 'Write a concise commit message adhering to project commit style.',
              fileTarget: '.github/PULL_REQUEST_TEMPLATE.md',
              command: 'git commit -m "docs: clarify initialState in useActionState"',
              guidance: 'Keep PR description short and include link to the fixed section.',
            },
          ],
        },
      },
      {
        number: 28315,
        title: 'Add TypeScript types for experimental ViewTransition wrapper',
        author: 'sebmarkbage',
        createdAt: '2026-10-15T18:40:00Z',
        commentsCount: 9,
        labels: ['help wanted', 'typescript'],
        body: 'The new experimental ViewTransition component needs strict type definitions in @types/react.',
        analysis: {
          summary: 'Define Props interface for ViewTransition component in TypeScript declaration files.',
          difficulty: 'Intermediate',
          estimatedMinutes: 60,
          targetStack: ['TypeScript', 'React Definitions'],
          steps: [
            {
              id: 'step-1',
              title: 'Examine experimental ViewTransition implementation',
              detail: 'Inspect the JavaScript component implementation to identify required and optional props.',
              fileTarget: 'packages/react/src/ReactViewTransition.js',
              command: 'git status',
              guidance: 'Review children, name, and onEnter/onLeave transition callbacks.',
            },
            {
              id: 'step-2',
              title: 'Export ViewTransitionProps interface',
              detail: 'Add type definitions to the React types index.',
              fileTarget: 'packages/react/index.d.ts',
              command: 'git checkout -b types/view-transition',
              guidance: 'Ensure compatibility with strictNullChecks in TypeScript 5+.',
            },
            {
              id: 'step-3',
              title: 'Run TypeScript definition test suite',
              detail: 'Execute tsd or dtslint tests to verify types compile without regressions.',
              fileTarget: 'packages/react/__tests__/types-test.ts',
              command: 'npm run test:types',
              guidance: 'All type tests must pass before opening the pull request.',
            },
          ],
        },
      },
    ],
  },
}

// Fallback generator for arbitrary repo names in demo mode
function generateDemoRepo(owner, repo) {
  const key = `${owner.toLowerCase()}/${repo.toLowerCase()}`
  if (DEMO_REPOSITORIES[key]) {
    return DEMO_REPOSITORIES[key]
  }

  return {
    owner,
    repo,
    description: `Public repository by ${owner}.`,
    stars: 1240,
    forks: 185,
    defaultBranch: 'main',
    openIssuesCount: 12,
    issues: [
      {
        number: 101,
        title: `Add form input validation to registration component`,
        author: 'contributor-1',
        createdAt: '2026-10-21T12:00:00Z',
        commentsCount: 3,
        labels: ['good first issue', 'beginner-friendly', 'validation'],
        body: 'Users can currently submit blank or malformed values. We need clear client-side validation feedback before sending API requests.',
        analysis: {
          summary: 'Add client-side input validation and error feedback before form submission.',
          difficulty: 'Beginner-friendly',
          estimatedMinutes: 45,
          targetStack: ['HTML', 'CSS', 'JavaScript'],
          steps: [
            {
              id: 'step-1',
              title: 'Inspect existing input fields and state',
              detail: 'Examine current form fields, validation hooks, and onSubmit handlers.',
              fileTarget: 'src/components/RegisterForm.jsx',
              command: 'git status && git diff',
              guidance: 'Verify form state schema and where error messages should render.',
            },
            {
              id: 'step-2',
              title: 'Implement validation helper and inline error state',
              detail: 'Add input regex and required field checks before handlers fire.',
              fileTarget: 'src/utils/validators.js',
              command: `git checkout -b fix/${repo}-form-validation`,
              guidance: 'Export validation function and connect error messages to the UI.',
            },
            {
              id: 'step-3',
              title: 'Verify valid and invalid test cases',
              detail: 'Run local tests to confirm error boundaries work as expected.',
              fileTarget: 'tests/RegisterForm.test.js',
              command: 'npm test',
              guidance: 'Ensure all tests pass before committing your changes.',
            },
            {
              id: 'step-4',
              title: 'Submit pull request',
              detail: 'Push branch and open pull request with issue reference.',
              fileTarget: '.github/pull_request_template.md',
              command: `git push origin fix/${repo}-form-validation`,
              guidance: 'Reference issue #101 in your pull request summary.',
            },
          ],
        },
      },
      {
        number: 102,
        title: `Documentation: Update setup guide for Node 20+`,
        author: 'contributor-2',
        createdAt: '2026-10-23T15:30:00Z',
        commentsCount: 1,
        labels: ['good first issue', 'documentation'],
        body: 'The README setup instructions mention outdated Node v16 commands. Update the docs to reflect modern LTS requirements.',
        analysis: {
          summary: 'Update README prerequisites and installation steps for modern Node.js versions.',
          difficulty: 'Starter',
          estimatedMinutes: 20,
          targetStack: ['Markdown'],
          steps: [
            {
              id: 'step-1',
              title: 'Review existing README prerequisites',
              detail: 'Identify deprecated Node versions and engine recommendations.',
              fileTarget: 'README.md',
              command: 'git checkout -b docs/node-20-prereqs',
              guidance: 'Check package.json engines field for the authoritative version constraint.',
            },
            {
              id: 'step-2',
              title: 'Update documentation text',
              detail: 'Update prerequisites table and verify markdown rendering.',
              fileTarget: 'README.md',
              command: 'git diff README.md',
              guidance: 'Keep markdown formatting consistent with existing headings.',
            },
            {
              id: 'step-3',
              title: 'Commit changes',
              detail: 'Commit clean markdown fix with standard commit message.',
              fileTarget: 'README.md',
              command: 'git commit -am "docs: update Node version requirement to 20+"',
              guidance: 'Include brief explanation of why modern LTS is recommended.',
            },
          ],
        },
      },
    ],
  }
}

/**
 * Fetches repository metadata.
 * Returns: { isLive: boolean, data: object, error: string | null }
 */
export async function getRepository(owner, repo) {
  if (!API_BASE_URL) {
    // Backend service not configured; return transparent demo dataset
    return {
      isLive: false,
      isDemo: true,
      data: generateDemoRepo(owner, repo),
      error: null,
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`)
    if (!res.ok) {
      if (res.status === 404) {
        return { isLive: true, isDemo: false, data: null, error: `Repository "${owner}/${repo}" was not found.` }
      }
      throw new Error(`Server returned status ${res.status}`)
    }
    const data = await res.json()
    return { isLive: true, isDemo: false, data, error: null }
  } catch (err) {
    // If live API fails, fall back to transparent demo with clear error note
    console.warn('[FirstPR Service] Live API unavailable, falling back to demo mode:', err.message)
    return {
      isLive: false,
      isDemo: true,
      data: generateDemoRepo(owner, repo),
      error: `Live backend (${API_BASE_URL}) is unreachable. Showing demo repository view.`,
    }
  }
}

