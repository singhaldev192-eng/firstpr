import { GitBranch } from 'lucide-react'
import { RepositoryInput } from './RepositoryInput'
import { PreviewCard } from './PreviewCard'
import styles from './Hero.module.css'

export function Hero({ onAnalyze, onNavigateToAnalyze }) {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column: Intentional copy and primary input action */}
        <div className={styles.copyColumn}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <GitBranch size={13} className={styles.eyebrowIcon} />
            <span>YOUR FIRST OPEN-SOURCE CONTRIBUTION STARTS HERE</span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className={styles.headline}>
            Your <span className={styles.highlightText}>first PR</span> shouldn't feel impossible.
          </h1>

          {/* Supporting Copy */}
          <p className={styles.supportingText}>
            Find an issue worth solving, understand the codebase, and get a step-by-step plan to contribute — even if you're new to open source.
          </p>

          {/* Primary Action Input */}
          <div className={styles.inputWrapper}>
            <RepositoryInput
              onAnalyze={onAnalyze}
              onNavigateToAnalyze={onNavigateToAnalyze}
            />
          </div>
        </div>

        {/* Right Column: Believable Product Interface Preview */}
        <div className={styles.previewColumn}>
          <PreviewCard />
        </div>
      </div>
    </section>
  )
}
