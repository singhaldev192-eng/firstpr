/**
 * Validates and extracts details from a GitHub repository URL.
 * 
 * Supports formats like:
 * - https://github.com/owner/repo
 * - http://github.com/owner/repo
 * - github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - https://github.com/owner/repo/
 * 
 * Rejects:
 * - Empty string
 * - Non-GitHub domains
 * - User/org profiles without repository name
 * - Invalid characters in owner or repository name
 */
export function validateGithubRepoUrl(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a GitHub repository URL.',
    }
  }

  const trimmed = rawInput.trim()

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Please enter a GitHub repository URL.',
    }
  }

  // Prepend https:// if user entered github.com/... directly
  let normalizedInput = trimmed
  if (!/^https?:\/\//i.test(normalizedInput)) {
    normalizedInput = `https://${normalizedInput}`
  }

  let parsedUrl
  try {
    parsedUrl = new URL(normalizedInput)
  } catch (err) {
    return {
      isValid: false,
      error: 'Invalid URL format. Example: https://github.com/facebook/react',
    }
  }

  // Ensure hostname is github.com
  const hostname = parsedUrl.hostname.toLowerCase()
  if (hostname !== 'github.com' && hostname !== 'www.github.com') {
    return {
      isValid: false,
      error: 'URL must be a public repository hosted on github.com.',
    }
  }

  // Pathname should be /owner/repo (ignoring trailing slash and .git)
  const segments = parsedUrl.pathname
    .replace(/\/+$/, '')
    .split('/')
    .filter(Boolean)

  if (segments.length === 0) {
    return {
      isValid: false,
      error: 'Please specify a repository path, e.g., https://github.com/owner/repo',
    }
  }

  if (segments.length === 1) {
    return {
      isValid: false,
      error: `"${segments[0]}" appears to be a user or organization profile. Please provide a full repository URL (e.g., https://github.com/${segments[0]}/project-name).`,
    }
  }

  const owner = segments[0]
  let repo = segments[1]

  // Strip .git if present
  if (repo.endsWith('.git')) {
    repo = repo.slice(0, -4)
  }

  // GitHub username rules: alphanumeric or single hyphens, 1-39 chars
  const ownerRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
  // GitHub repo rules: alphanumeric, ., _, -, 1-100 chars
  const repoRegex = /^[a-zA-Z0-9_.-]{1,100}$/

  if (!ownerRegex.test(owner)) {
    return {
      isValid: false,
      error: `Invalid owner name "${owner}". GitHub usernames contain only letters, numbers, and hyphens.`,
    }
  }

  if (!repoRegex.test(repo) || repo === '.' || repo === '..') {
    return {
      isValid: false,
      error: `Invalid repository name "${repo}".`,
    }
  }

  const cleanUrl = `https://github.com/${owner}/${repo}`

  return {
    isValid: true,
    error: null,
    owner,
    repo,
    cleanUrl,
  }
}

