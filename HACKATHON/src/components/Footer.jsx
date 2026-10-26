import { GitPullRequest, ArrowUp } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import styles from './Footer.module.css'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.topRow}>
          {/* Brand & Tagline */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <div className={styles.logoIconWrapper}>
                <GitPullRequest size={15} className={styles.brandIcon} />
              </div>
              <span className={styles.brandName}>
                First<span className={styles.brandAccent}>PR</span>
              </span>
            </div>
            <p className={styles.tagline}>Making open source easier to enter.</p>
          </div>

          {/* Links */}
          <nav className={styles.linksCol} aria-label="Footer Navigation">
            <a
              href="#how-it-works"
              className={styles.footerLink}
              onClick={(e) => handleLinkClick(e, 'how-it-works')}
            >
              How It Works
            </a>
            <a
              href="#features"
              className={styles.footerLink}
              onClick={(e) => handleLinkClick(e, 'features')}
            >
              Features
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              aria-label="GitHub (external link)"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.backToTopButton}
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Bottom Note */}
        <div className={styles.bottomRow}>
          <p className={styles.developerNote}>
            Built for developers making their first contribution.
          </p>
          <p className={styles.copyright}>
            FirstPR
          </p>
        </div>
      </div>
    </footer>
  )
}
