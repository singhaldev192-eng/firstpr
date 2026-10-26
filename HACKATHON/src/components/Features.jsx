import { BookOpen, Layers, Terminal, Sparkles, CheckCircle2 } from 'lucide-react'
import styles from './Features.module.css'

export function Features() {
  const features = [
    {
      index: '01',
      tag: 'CLARITY',
      title: 'Issue, Explained',
      description: 'Understand what the issue actually asks you to solve without getting lost in codebase jargon or undocumented project assumptions.',
    },
    {
      index: '02',
      tag: 'GROUNDING',
      title: 'Repository-Aware Guidance',
      description: 'Ground suggestions in actual project documentation and available code context so you follow the project’s established conventions.',
    },
    {
      index: '03',
      tag: 'EXECUTION',
      title: 'A Clear Action Plan',
      description: 'Break a confusing task into manageable steps: locate relevant files, implement the change, and run the test suite.',
    },
    {
      index: '04',
      tag: 'GROWTH',
      title: 'Learn While Contributing',
      description: 'Identify the concepts and tools you may need to learn, turning each pull request into a genuine learning opportunity.',
    },
  ]

  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className={`container ${styles.featuresContainer}`}>
        {/* Left Column: Context & Architectural Premise */}
        <div className={styles.contextColumn}>
          <span className={styles.eyebrow}>CORE CAPABILITIES</span>
          <h2 id="features-title" className={styles.title}>
            Engineered for first-time contributors.
          </h2>
          <p className={styles.lead}>
            Contributing to open source often requires understanding implicit workflows, unwritten conventions, and complex file hierarchies.
          </p>
          <p className={styles.subtext}>
            FirstPR structures that exploration into concrete, transparent phases so you can focus on writing good code.
          </p>
          <div className={styles.specBadge}>
            <span className={styles.specDot} />
            <span>Planned Capabilities · In Active Design</span>
          </div>
        </div>

        {/* Right Column: Technical Feature Stack */}
        <div className={styles.stackColumn}>
          {features.map((feature) => (
            <div key={feature.index} className={styles.featureRow}>
              <div className={styles.rowMeta}>
                <span className={styles.indexNum}>{feature.index}</span>
                <span className={styles.categoryTag}>{feature.tag}</span>
              </div>
              <div className={styles.rowContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
