import { Compass, Sparkles, CheckCircle2, GitBranch, ArrowRight, Terminal, FileText } from 'lucide-react'
import styles from './HowItWorks.module.css'

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Find a repository',
      description: 'Start with a public GitHub project you want to contribute to.',
      meta: 'git clone & repository index',
      icon: Compass,
      detail: 'Paste any public repo link to start the workflow.',
    },
    {
      step: '02',
      title: 'Understand an issue',
      description: 'Gemma helps explain the problem, relevant skills, and repository context in plain English.',
      meta: 'context grounding & issue analysis',
      icon: Sparkles,
      detail: 'Extracts relevant documentation and explains requirements.',
    },
    {
      step: '03',
      title: 'Follow your roadmap',
      description: 'Get a practical checklist to explore the code, make a change, test it, and prepare a pull request.',
      meta: 'git branch, test, and commit',
      icon: CheckCircle2,
      detail: 'Provides an actionable, step-by-step checklist to ship your PR.',
    },
  ]

  return (
    <section id="how-it-works" className={styles.section} aria-labelledby="how-it-works-title">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>WORKFLOW</span>
          <h2 id="how-it-works-title" className={styles.title}>
            From repository URL to your first contribution.
          </h2>
          <p className={styles.subtitle}>
            A structured, repeatable process to take you from unfamiliar codebase to confident pull request.
          </p>
        </div>

        {/* Cohesive Process Pipeline */}
        <div className={styles.pipeline}>
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.step} className={styles.pipelinePhase}>
                {/* Phase Header */}
                <div className={styles.phaseHeader}>
                  <div className={styles.stepBadge}>Phase {item.step}</div>
                  <div className={styles.stepMetaBadge}>{item.meta}</div>
                </div>

                {/* Phase Content */}
                <div className={styles.phaseContent}>
                  <div className={styles.iconRow}>
                    <div className={styles.iconBox}>
                      <Icon size={16} className={styles.phaseIcon} />
                    </div>
                    <h3 className={styles.phaseTitle}>{item.title}</h3>
                  </div>

                  <p className={styles.phaseDesc}>{item.description}</p>
                </div>

                {/* Phase Technical Annotation */}
                <div className={styles.phaseFooter}>
                  <Terminal size={12} className={styles.terminalIcon} />
                  <span className={styles.detailText}>{item.detail}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
