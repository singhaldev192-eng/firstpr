import { ArrowLeft, Star, GitFork, GitBranch, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react'
import { GithubIcon } from '../GithubIcon'
import styles from './RepoHeader.module.css'

export function RepoHeader({ repoData, isDemo, onBackToHome }) {
  const { owner, repo, description, stars, forks, defaultBranch, openIssuesCount } = repoData

  const githubUrl = `https://github.com/${owner}/${repo}`

  return (
    <header className={styles.header}>
      {/* Disclaimer banner for demo mode */}
      {isDemo && (
        <div className={styles.demoBanner} role="note">
          <div className="container">
            <div className={styles.bannerContent}>
              <div className={styles.bannerLeft}>
                <span className={styles.demoPill}>DEMO MODE</span>
                <span className={styles.bannerText}>
                  DigitalHost AI backend is not yet connected. Showing a transparent illustrative repository view.
                </span>
              </div>
              <span className={styles.bannerSubtext}>No mock data is presented as live results.</span>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.headerBar}>
          {/* Back button & Breadcrumbs */}
          <div className={styles.leftCol}>
            <button
              type="button"
              onClick={onBackToHome}
              className={styles.backButton}
              aria-label="Return to FirstPR home"
            >
              <ArrowLeft size={15} />
              <span>Back</span>
            </button>

            <div className={styles.breadcrumbs}>
              <GithubIcon size={18} className={styles.githubIcon} />
              <span className={styles.ownerText}>{owner}</span>
              <span className={styles.slash} aria-hidden="true">/</span>
              <h1 className={styles.repoText}>{repo}</h1>
            </div>
          </div>

          {/* Metadata badges & GitHub External Link */}
          <div className={styles.metaRow}>
            {stars !== undefined && (
              <div className={styles.metaBadge} title="GitHub Stars">
                <Star size={13} className={styles.starIcon} />
                <span>{stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}</span>
              </div>
            )}

            {defaultBranch && (
              <div className={styles.metaBadge} title="Default Branch">
                <GitBranch size={13} className={styles.branchIcon} />
                <span>{defaultBranch}</span>
              </div>
            )}

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubButton}
              aria-label="Open repository on GitHub (opens in new tab)"
            >
              <span>View on GitHub</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </header>
  )
}

