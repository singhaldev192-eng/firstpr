import { useState } from 'react'
import { ArrowRight, Loader2, AlertCircle, Info, ShieldCheck, Sparkles, BookOpen, X, ExternalLink } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import { validateGithubRepoUrl } from '../utils/validator'
import styles from './RepositoryInput.module.css'

export function RepositoryInput({ onAnalyze, onNavigateToAnalyze }) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusNotice, setStatusNotice] = useState(null)

  const sampleRepositories = [
    { label: 'facebook/react', url: 'https://github.com/facebook/react' },
    { label: 'vercel/next.js', url: 'https://github.com/vercel/next.js' },
    { label: 'tailwindlabs/tailwindcss', url: 'https://github.com/tailwindlabs/tailwindcss' },
  ]

  const handleValidationAndSubmit = (inputUrl) => {
    setErrorMessage('')
    setStatusNotice(null)

    const validation = validateGithubRepoUrl(inputUrl)

    if (!validation.isValid) {
      setErrorMessage(validation.error)
      return
    }

    setIsLoading(true)

    // Simulate standard client-side request initiation
    setTimeout(() => {
      setIsLoading(false)
      setStatusNotice({
        owner: validation.owner,
        repo: validation.repo,
        cleanUrl: validation.cleanUrl,
        message: 'DigitalHost AI and GitHub backend services are not yet connected. Live analysis will be available once the backend is connected.',
      })

      if (typeof onAnalyze === 'function') {
        onAnalyze({
          owner: validation.owner,
          repo: validation.repo,
          url: validation.cleanUrl,
        })
      }
    }, 450)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleValidationAndSubmit(url)
  }

  const handleChange = (e) => {
    setUrl(e.target.value)
    if (errorMessage) setErrorMessage('')
    if (statusNotice) setStatusNotice(null)
  }

  const handleClear = () => {
    setUrl('')
    setErrorMessage('')
    setStatusNotice(null)
    const inputElement = document.getElementById('repo-url-input')
    if (inputElement) inputElement.focus()
  }

  const handleSelectSample = (sampleUrl) => {
    setUrl(sampleUrl)
    handleValidationAndSubmit(sampleUrl)
  }

  const handleLaunchAnalyze = () => {
    if (statusNotice && typeof onNavigateToAnalyze === 'function') {
      onNavigateToAnalyze({
        owner: statusNotice.owner,
        repo: statusNotice.repo,
        demo: true,
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div
          className={`${styles.inputContainer} ${
            errorMessage ? styles.hasError : ''
          } ${isLoading ? styles.isLoading : ''}`}
        >
          <div className={styles.inputFieldRow}>
            <div className={styles.iconWrapper} aria-hidden="true">
              <GithubIcon size={16} className={styles.inputGithubIcon} />
            </div>

            <label htmlFor="repo-url-input" className={styles.visuallyHidden}>
              Public GitHub repository URL
            </label>
            <input
              id="repo-url-input"
              type="url"
              value={url}
              onChange={handleChange}
              placeholder="https://github.com/owner/repository"
              className={styles.input}
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
              aria-invalid={errorMessage ? 'true' : 'false'}
              aria-describedby={
                errorMessage
                  ? 'repo-input-error'
                  : statusNotice
                  ? 'repo-input-status'
                  : 'repo-input-helper'
              }
            />

            {url && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                aria-label="Clear repository URL"
                title="Clear input"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
            aria-label="Analyze Repository"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className={styles.spinner} />
                <span>Validating</span>
              </>
            ) : (
              <>
                <span>Analyze Repository</span>
                <ArrowRight size={13} className={styles.submitArrow} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Helper text & Sample Repo Chips */}
      {!errorMessage && !statusNotice && (
        <div className={styles.helperRow} id="repo-input-helper">
          <span className={styles.helperLabel}>Try a repository:</span>
          <div className={styles.sampleChips}>
            {sampleRepositories.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleSelectSample(sample.url)}
                className={styles.sampleChip}
                disabled={isLoading}
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inline Error Message */}
      {errorMessage && (
        <div id="repo-input-error" className={styles.errorMessage} role="alert">
          <AlertCircle size={15} className={styles.errorIcon} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honest Backend Offline Notice & Direct Navigation to /analyze */}
      {statusNotice && (
        <div id="repo-input-status" className={styles.statusNotice} role="status">
          <div className={styles.statusNoticeHeader}>
            <Info size={15} className={styles.statusIcon} />
            <span className={styles.statusRepoBadge}>
              {statusNotice.owner} / {statusNotice.repo}
            </span>
            <span className={styles.statusLivePill}>Backend Disconnected</span>
          </div>

          <p className={styles.statusText}>{statusNotice.message}</p>

          <div className={styles.statusActions}>
            <button
              type="button"
              className={styles.openAnalyzeButton}
              onClick={handleLaunchAnalyze}
            >
              <span>Explore /analyze in Demo Mode</span>
              <ArrowRight size={13} />
            </button>
            <span className={styles.demoDisclaimer}>
              Clearly labeled mockup with local checklist tracking.
            </span>
          </div>
        </div>
      )}

      {/* Trust Points */}
      <div className={styles.trustGrid}>
        <div className={styles.trustCell}>
          <ShieldCheck size={14} className={styles.trustIcon} />
          <span>Public GitHub repositories</span>
        </div>
        <div className={styles.trustCell}>
          <BookOpen size={14} className={styles.trustIcon} />
          <span>Beginner-friendly guidance</span>
        </div>
        <div className={styles.trustCell}>
          <Sparkles size={14} className={styles.trustIcon} />
          <span>AI-assisted issue breakdown</span>
        </div>
      </div>
    </div>
  )
}
