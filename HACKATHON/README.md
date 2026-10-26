# FirstPR — AI-Powered Open-Source Contribution Guide

> **Making open source easier to enter.**  
> FirstPR is a developer tool designed to guide beginners from an unfamiliar GitHub codebase to their first meaningful pull request through structured, context-aware roadmaps.

---

> [!IMPORTANT]  
> **Device Synchronization Notice:** When moving between computers or development environments, you must sync the full project source code (e.g., via Git repository pull/clone or copying the workspace). Dependencies in `node_modules` must be reinstalled on the target machine using `npm install`.

---

## 📌 Project Overview & Implemented Features

FirstPR transforms complex, intimidating open-source repositories into clear, achievable developer milestones.

### 1. Refined Landing Page (`/`)
- **Developer-Tool Visual Identity:** Charcoal navy background (`#090D16`), structured surfaces (`#0E1422`), a single disciplined violet accent (`#7C3AED` / `#8B5CF6`), and surgical cyan highlights (`#22D3EE`). Zero oversized gradients or decorative glowing blobs.
- **Precision Typography & Spacing:** Strict Inter and JetBrains Mono type hierarchy, 8px layout grid, and 1px hairline borders (`rgba(255, 255, 255, 0.08)`).
- **Interactive Repository Command Bar:**
  - Strict URL validation supporting `https://github.com/owner/repo`, `github.com/...`, `.git` stripping, and trailing slash handling.
  - Quick sample repository chips (`facebook/react`, `vercel/next.js`, `tailwindlabs/tailwindcss`).
  - Clear button (`X`) for quick text reset.
  - Transparent connection disclosure: explains that backend and DigitalHost AI services are currently disconnected, with a direct CTA to explore the `/analyze` route in Demo Mode.
- **Interactive Roadmap Dashboard Preview:**
  - Realistic window bar with `#142` issue tag, author attribution, and `GOOD FIRST ISSUE` labels.
  - Interactive accordion checklist: clicking steps expands contextual guidance, target file paths, and copyable bash commands.
  - Real-time progress bar (`1 of 3 complete (33%)`).
- **Unified Workflow Workbench:** Connected 3-phase horizontal pipeline detailing ingestion, synthesis, and execution steps.
- **Asymmetric Capability Matrix:** Two-column architectural layout highlighting clarity, grounding, execution, and growth without repetitive template cards.

### 2. Full Repository Analysis Workspace (`/analyze`)
- **Repository Header (`RepoHeader.jsx`):**
  - Displays repository breadcrumbs (`owner / repo`), star count, forks, default branch, and external link to GitHub.
  - **Transparent Demo Banner:** When the backend is offline, clearly states: `DEMO MODE · DigitalHost AI backend is not yet connected. Showing a transparent illustrative repository view. No mock data is presented as live results.`
  - Quick "Back" button to return to the landing page.
- **Searchable Issue List (`IssueList.jsx`):**
  - Real-time search by keyword, issue number, author, label, or description.
  - Filter label pills (`All Issues`, `good first issue`, `documentation`, `difficulty: starter`, etc.).
  - Open issue indicators, comment count badges, difficulty tags, and active issue selection state.
  - Empty search state with one-click filter reset.
- **Issue Details View (`IssueDetail.jsx`):**
  - Issue header with number, title, author attribution, creation timestamp, and direct GitHub issue link.
  - **DigitalHost AI Synthesis Card:** Plain-English issue summary, difficulty rating (`Beginner-friendly`, `Starter`, `Intermediate`), estimated time (`~45 mins`), and target stack pills (`HTML · CSS · JavaScript`).
- **Interactive Contribution Checklist (`ContributionChecklist.jsx`):**
  - Expandable steps with file targets, copyable terminal commands (with visual "Copied" feedback), and actionable guidance.
  - Interactive checkboxes to toggle step completion.
  - Dynamic progress track and counter (`2 of 4 completed (50%)`).
  - **Persistent Progress:** Progress is automatically saved in `localStorage` keyed by `firstpr_progress_${owner}_${repo}_issue_${issueNumber}`, preserving state across page reloads.
  - "Reset progress" action.
- **Markdown Export (`MarkdownExport.jsx`):**
  - Dynamically compiles the current issue roadmap and completion status into GitHub-flavored Markdown.
  - Provides "Copy Markdown" and "Download .md" buttons for personal notes or PR descriptions.
- **Responsive & Accessible States:**
  - Polished loading skeleton with animated indicator.
  - Error state with retry action button.
  - Mobile view with dedicated tab switcher (`Issues (3)` vs `Roadmap #28410`) for small viewports.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language:** JavaScript (ES Modules, modern syntax)
- **Styling:** CSS Modules per component + Design Tokens in [`src/index.css`](file:///Users/shambhavi/Desktop/HACKATHON/src/index.css)
- **Icons:** [`lucide-react`](https://lucide.dev/) + Custom SVG GitHub mark
- **Router:** Zero-dependency browser history router ([`src/utils/useRoute.js`](file:///Users/shambhavi/Desktop/HACKATHON/src/utils/useRoute.js))
- **Service Layer:** [`src/services/api.js`](file:///Users/shambhavi/Desktop/HACKATHON/src/services/api.js)
- **Testing:** Node.js native test runner (`node:assert`)

---

## 📂 Project Directory Structure

```text
├── index.html                     # Application entry HTML with Google Fonts preconnect
├── package.json                   # Scripts, dependencies, and project metadata
├── vite.config.js                 # Vite configuration with React plugin
├── test-validator.mjs             # Automated unit test suite for GitHub URL validator
├── README.md                      # Comprehensive project documentation & API contract
└── src/
    ├── main.jsx                   # Application bootstrap with React StrictMode
    ├── App.jsx                    # Root router container, layout landmarks, and skip-link
    ├── index.css                  # Global design tokens, resets, typography, and technical grid
    ├── services/
    │   └── api.js                 # Frontend service layer with live backend & demo fallback
    ├── utils/
    │   ├── validator.js           # GitHub repository URL validation & normalization utility
    │   └── useRoute.js            # Zero-dependency browser history router hook
    └── components/
        ├── GithubIcon.jsx         # Accessible SVG GitHub mark component
        ├── Navbar.jsx             # Sticky navigation header with smooth-scrolling & mobile drawer
        ├── Navbar.module.css
        ├── Hero.jsx               # Hero layout with headline, command input, and preview
        ├── Hero.module.css
        ├── RepositoryInput.jsx    # Primary action command bar with validation, sample chips & notice
        ├── RepositoryInput.module.css
        ├── PreviewCard.jsx        # Realistic interactive dashboard preview with expandable steps
        ├── PreviewCard.module.css
        ├── HowItWorks.jsx         # Integrated 3-phase horizontal pipeline workbench
        ├── HowItWorks.module.css
        ├── Features.jsx           # Asymmetric 2-column technical specification matrix
        ├── Features.module.css
        ├── Footer.jsx             # Minimal developer footer with links and back-to-top action
        ├── Footer.module.css
        └── analyze/
            ├── AnalyzePage.jsx    # Main workspace container coordinating header, list, and detail
            ├── AnalyzePage.module.css
            ├── RepoHeader.jsx     # Repository breadcrumbs, stats, GitHub link, and demo banner
            ├── RepoHeader.module.css
            ├── IssueList.jsx      # Search input, label filters, and interactive issue cards
            ├── IssueList.module.css
            ├── IssueDetail.jsx    # Issue summary, DigitalHost AI synthesis card, and checklist
            ├── IssueDetail.module.css
            ├── ContributionChecklist.jsx # Expandable checklist, commands, and localStorage progress
            ├── ContributionChecklist.module.css
            ├── MarkdownExport.jsx # Formatted Markdown plan generator, copy, and download
            └── MarkdownExport.module.css
```

---

## 🚦 Routes & Navigation

| Route | Purpose | Parameters / Query Strings |
| :--- | :--- | :--- |
| `/` | Landing page | Main presentation, URL validator, interactive preview, features. |
| `/analyze` | Repository analysis workspace | `?owner=<owner>&repo=<repo>&demo=<true\|false>` |

- Fully supports browser back/forward history navigation via `popstate`.
- Falls back to hash routes (`#/analyze?owner=...`) when deployed to static hosts without URL rewriting.

---

## 🔄 Data Flow & State Management

```text
[User Enters URL on Landing Page]
               │
               ▼
   [validateGithubRepoUrl()]
         ├── Invalid ──► Displays inline error
         └── Valid ────► Normalizes owner/repo
                             │
                             ▼
                 [User clicks "Explore /analyze in Demo Mode"]
                             │
                             ▼
                 [useRoute navigates to /analyze?owner=...&repo=...]
                             │
                             ▼
            [AnalyzePage triggers getRepository(owner, repo)]
                             │
                             ▼
           [src/services/api.js Service Layer]
         ├── VITE_API_BASE_URL reachable ──► Calls live backend
         └── Offline / unconfigured ────────► Returns transparent demo dataset
                                                (with isDemo: true flag)
                             │
                             ▼
             [Render RepoHeader + IssueList + IssueDetail]
                             │
                             ▼
       [User checks off steps in ContributionChecklist]
                             │
                             ▼
  [localStorage persists state: firstpr_progress_{owner}_{repo}_issue_{id}]
                             │
                             ▼
            [User exports plan via MarkdownExport]
```

---

## 🔌 Proposed API Contract (Backend & DigitalHost AI)

The frontend service layer ([`src/services/api.js`](file:///Users/shambhavi/Desktop/HACKATHON/src/services/api.js)) is pre-wired to communicate with the partner backend via the following REST API contract:

### 1. Repository Metadata
- **Endpoint:** `GET /api/v1/repos/:owner/:repo`
- **Response `200 OK`:**
  ```json
  {
    "owner": "facebook",
    "repo": "react",
    "description": "The library for web and native user interfaces.",
    "stars": 228000,
    "forks": 46200,
    "defaultBranch": "main",
    "openIssuesCount": 840
  }
  ```

### 2. Issue Listing
- **Endpoint:** `GET /api/v1/repos/:owner/:repo/issues`
- **Query Parameters:** `page`, `limit`, `search`, `label`
- **Response `200 OK`:**
  ```json
  {
    "page": 1,
    "total": 3,
    "issues": [
      {
        "number": 28410,
        "title": "Improve error message when Suspense boundary lacks fallback prop",
        "author": "gaearon",
        "createdAt": "2026-10-18T14:20:00Z",
        "commentsCount": 6,
        "labels": ["good first issue", "difficulty: starter"],
        "body": "When a <Suspense> component is declared without a fallback property..."
      }
    ]
  }
  ```

### 3. Issue Analysis & Roadmap (DigitalHost AI)
- **Endpoint:** `GET /api/v1/repos/:owner/:repo/issues/:issueNumber/analysis`
- **Response `200 OK`:**
  ```json
  {
    "issueNumber": 28410,
    "summary": "Add an explicit development warning when Suspense is rendered without a valid fallback prop.",
    "difficulty": "Beginner-friendly",
    "estimatedMinutes": 45,
    "targetStack": ["JavaScript", "React Internals", "Jest"],
    "steps": [
      {
        "id": "step-1",
        "title": "Locate Suspense component validation",
        "detail": "Find the element validation checks in the React runtime reconciler.",
        "fileTarget": "packages/react-reconciler/src/ReactFiberSuspenseComponent.js",
        "command": "git grep -n \"Suspense\" packages/react-reconciler",
        "guidance": "Look for validateSuspenseProps() where component props are destructured."
      }
    ]
  }
  ```

---

## 🔐 Environment Variables

All sensitive credentials (GitHub Personal Access Tokens, DigitalHost AI API keys, and model weights) **must remain server-side** on the partner's backend. The frontend only reads public endpoint configuration:

```env
# URL pointing to the partner backend server (leave unset or empty for offline/demo mode)
VITE_API_BASE_URL=http://localhost:8000

# Optional flag to enable mock demo mode explicitly
VITE_ENABLE_DEMO_MODE=true
```

---

## ⚠️ Current Limitations

1. **Backend Connectivity:** The live DigitalHost AI inference engine and GitHub proxy backend have not yet been deployed. The frontend explicitly identifies when it is operating in Demo Mode and never masquerades mock data as live results.
2. **Read-Only GitHub Interaction:** The current implementation allows exporting pull request plans as Markdown; automated GitHub pull request creation or fork management requires server-side OAuth2 credentials.

---

## 🏃 Setup & Scripts

```bash
# 1. Install dependencies
npm install

# 2. Start Vite local development server
npm run dev

# 3. Run automated validator unit tests
npm test

# 4. Build production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

---

## ⏩ Next Steps for Backend Integration

1. Deploy the backend server implementing the endpoints documented in the **Proposed API Contract**.
2. Configure CORS headers on the backend to allow requests from the FirstPR frontend origin.
3. Supply `VITE_API_BASE_URL=https://api.yourdomain.com` in `.env.local` to switch FirstPR from Demo Mode to Live Mode.
