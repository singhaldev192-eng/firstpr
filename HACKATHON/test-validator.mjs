import { validateGithubRepoUrl } from './src/utils/validator.js'
import assert from 'node:assert'

console.log('Testing GitHub repository validator...')

// Test 1: Empty input
assert.strictEqual(validateGithubRepoUrl('').isValid, false)
assert.strictEqual(validateGithubRepoUrl('   ').isValid, false)

// Test 2: Standard valid URL
const res1 = validateGithubRepoUrl('https://github.com/facebook/react')
assert.strictEqual(res1.isValid, true)
assert.strictEqual(res1.owner, 'facebook')
assert.strictEqual(res1.repo, 'react')
assert.strictEqual(res1.cleanUrl, 'https://github.com/facebook/react')

// Test 3: URL with trailing slash and .git
const res2 = validateGithubRepoUrl('https://github.com/torvalds/linux.git')
assert.strictEqual(res2.isValid, true)
assert.strictEqual(res2.owner, 'torvalds')
assert.strictEqual(res2.repo, 'linux')

const res3 = validateGithubRepoUrl('https://github.com/vercel/next.js/')
assert.strictEqual(res3.isValid, true)
assert.strictEqual(res3.owner, 'vercel')
assert.strictEqual(res3.repo, 'next.js')

// Test 4: Omitted https protocol
const res4 = validateGithubRepoUrl('github.com/google/gemma')
assert.strictEqual(res4.isValid, true)
assert.strictEqual(res4.owner, 'google')
assert.strictEqual(res4.repo, 'gemma')

// Test 5: Non-GitHub domain
const res5 = validateGithubRepoUrl('https://gitlab.com/owner/repo')
assert.strictEqual(res5.isValid, false)
assert.match(res5.error, /URL must be a public repository hosted on github\.com/)

// Test 6: User profile without repo
const res6 = validateGithubRepoUrl('https://github.com/facebook')
assert.strictEqual(res6.isValid, false)
assert.match(res6.error, /appears to be a user or organization profile/)

// Test 7: Malformed URL
const res7 = validateGithubRepoUrl('not-a-url')
assert.strictEqual(res7.isValid, false)

console.log('All validator tests passed successfully!')

