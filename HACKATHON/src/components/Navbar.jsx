import { useState, useEffect } from 'react'
import { GitPullRequest, Menu, X, ArrowRight } from 'lucide-react'
import { GithubIcon } from './GithubIcon'
import styles from './Navbar.module.css'

export function Navbar({ onGetStartedClick, onNavigate, currentPath = '/' }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (currentPath !== '/') {
      if (typeof onNavigate === 'function') {
        onNavigate('/')
        setTimeout(() => {
          const element = document.getElementById(targetId)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
      return
    }

    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (typeof onNavigate === 'function') {
      onNavigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCtaClick = () => {
    setMobileMenuOpen(false)
    if (currentPath !== '/') {
      if (typeof onNavigate === 'function') {
        onNavigate('/')
        setTimeout(() => {
          if (onGetStartedClick) onGetStartedClick()
        }, 150)
      }
      return
    }

    if (onGetStartedClick) {
      onGetStartedClick()
    } else {
      const input = document.getElementById('repo-url-input')
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' })
        input.focus()
      }
    }
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <a href="/" className={styles.brand} onClick={handleBrandClick} aria-label="FirstPR Home">
          <div className={styles.brandIconWrapper}>
            <GitPullRequest size={16} className={styles.brandIcon} />
          </div>
          <span className={styles.brandName}>
            First<span className={styles.brandAccent}>PR</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <a
            href="#how-it-works"
            className={styles.navLink}
            onClick={(e) => handleNavLinkClick(e, 'how-it-works')}
          >
            How It Works
          </a>
          <a
            href="#features"
            className={styles.navLink}
            onClick={(e) => handleNavLinkClick(e, 'features')}
          >
            Features
          </a>
          <div className={styles.navDivider} aria-hidden="true" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="GitHub Repository (external link)"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={handleCtaClick}
          >
            <span>Get Started</span>
            <ArrowRight size={13} className={styles.ctaArrow} />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <div className={styles.mobileMenuContent}>
            <a
              href="#how-it-works"
              className={styles.mobileNavLink}
              onClick={(e) => handleNavLinkClick(e, 'how-it-works')}
            >
              How It Works
            </a>
            <a
              href="#features"
              className={styles.mobileNavLink}
              onClick={(e) => handleNavLinkClick(e, 'features')}
            >
              Features
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileGithubLink}
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <button
              type="button"
              className={styles.mobileCtaButton}
              onClick={handleCtaClick}
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
