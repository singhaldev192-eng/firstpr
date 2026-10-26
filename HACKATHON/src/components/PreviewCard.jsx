import { useState } from 'react'
import { Tag, Check, FileCode, ChevronDown, ChevronUp, Terminal, GitBranch, AlertCircle, Copy, CheckCheck } from 'lucide-react'
import styles from './PreviewCard.module.css'

export function PreviewCard() {
  const [expandedStep, setExpandedStep] = useState('02') // step 2 expanded by default
  const [copiedCommand, setCopiedCommand] = useState(null)

  const steps = [
    {
      number: '01',
      title: 'Inspect existing registration form',
      detail: 'Examine input fields, state hooks, and submit handlers in client component.',
      file: 'src/components/RegisterForm.jsx',
      status: 'completed',
      command: 'git status && git diff',
      notes: 'Form currently binds directly to state without client-side error boundaries.',
    },
    {
      number: '02',
      title: 'Implement email regex validation',
      detail: 'Add standard RFC-compliant email validation and display an inline error toast.',
      file: 'src/utils/validators.js',
      status: 'active',
      command: 'git checkout -b fix/registration-validation',
      notes: 'Export validateEmail(value) helper and hook it before the onSubmit dispatch.',
    },
    {
      number: '03',
      title: 'Run test suite on form submission',
      detail: 'Verify both empty submissions and malformed domains trigger visible warnings.',
      file: 'tests/RegisterForm.test.js',
      status: 'pending',
      command: 'npm test -- RegisterForm.test.js',
      notes: 'Ensure all 4 existing unit tests pass before opening your pull request.',
    },
  ]

  const handleToggleStep = (num) => {
    setExpandedStep(expandedStep === num ? null : num)
  }

  const handleCopy = (cmd) => {
    navigator.clipboard?.writeText(cmd)
    setCopiedCommand(cmd)
    setTimeout(() => setCopiedCommand(null), 1500)
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        {/* Window Bar */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.windowControls} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.repoBreadcrumb}>
              <span className={styles.repoOwner}>owner</span>
              <span className={styles.repoDivider}>/</span>
              <span className={styles.repoName}>sample-project</span>
            </div>
          </div>
          <span className={styles.previewTag}>ILLUSTRATIVE PREVIEW</span>
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          {/* Issue Header */}
          <div className={styles.issueHeader}>
            <div className={styles.badgesRow}>
              <span className={styles.issueId}>#142</span>
              <span className={styles.goodFirstIssueBadge}>
                <Tag size={11} />
                GOOD FIRST ISSUE
              </span>
              <span className={styles.difficultyBadge}>
                Beginner-friendly
              </span>
              <span className={styles.authorBadge}>opened by contributor</span>
            </div>

            <h2 className={styles.issueTitle}>
              Add form validation to registration page
            </h2>

            <p className={styles.issueDescription}>
              Users can currently submit blank or malformed emails. Add clear client-side validation feedback before sending API requests.
            </p>
          </div>

          {/* Interactive Contribution Roadmap */}
          <div className={styles.roadmapBox}>
            <div className={styles.roadmapTop}>
              <div className={styles.roadmapTitleGroup}>
                <GitBranch size={13} className={styles.branchIcon} />
                <span className={styles.roadmapHeading}>Contribution Roadmap</span>
              </div>
              <span className={styles.stepProgress}>1 of 3 complete (33%)</span>
            </div>

            {/* Progress Track */}
            <div className={styles.progressTrack} aria-hidden="true">
              <div className={styles.progressBar} style={{ width: '33%' }} />
            </div>

            <div className={styles.stepList}>
              {steps.map((step) => {
                const isExpanded = expandedStep === step.number
                return (
                  <div
                    key={step.number}
                    className={`${styles.stepRow} ${
                      step.status === 'active' ? styles.stepRowActive : ''
                    }`}
                  >
                    {/* Header of step item */}
                    <button
                      type="button"
                      className={styles.stepHeaderButton}
                      onClick={() => handleToggleStep(step.number)}
                      aria-expanded={isExpanded}
                    >
                      <div className={styles.stepIndicator}>
                        {step.status === 'completed' ? (
                          <span className={styles.badgeCompleted} title="Completed">
                            <Check size={11} />
                          </span>
                        ) : step.status === 'active' ? (
                          <span className={styles.badgeActive} title="In Progress">
                            {step.number}
                          </span>
                        ) : (
                          <span className={styles.badgePending} title="Pending">
                            {step.number}
                          </span>
                        )}
                      </div>

                      <div className={styles.stepTitleBar}>
                        <div className={styles.stepTitleLine}>
                          <span className={styles.stepTitle}>{step.title}</span>
                          {step.status === 'active' && (
                            <span className={styles.currentStepBadge}>Suggested Next</span>
                          )}
                        </div>
                        <span className={styles.stepFileSubtext}>{step.file}</span>
                      </div>

                      <div className={styles.expandChevron} aria-hidden="true">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </button>

                    {/* Expandable Step Details */}
                    {isExpanded && (
                      <div className={styles.expandedContent}>
                        <p className={styles.stepDetail}>{step.detail}</p>
                        
                        <div className={styles.guidanceBox}>
                          <span className={styles.guidanceLabel}>Action Guidance:</span>
                          <p className={styles.guidanceText}>{step.notes}</p>
                        </div>

                        {step.command && (
                          <div className={styles.commandRow}>
                            <Terminal size={11} className={styles.terminalIcon} />
                            <code className={styles.commandCode}>{step.command}</code>
                            <button
                              type="button"
                              onClick={() => handleCopy(step.command)}
                              className={styles.copyButton}
                              title="Copy command"
                              aria-label={`Copy command ${step.command}`}
                            >
                              {copiedCommand === step.command ? (
                                <CheckCheck size={12} className={styles.copiedIcon} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card Footer: Skills & Scope */}
          <div className={styles.cardFooter}>
            <div className={styles.skillsRow}>
              <span className={styles.skillsLabel}>Target Stack:</span>
              <span className={styles.skillsList}>HTML · CSS · JavaScript</span>
            </div>
            <div className={styles.scopeNotice}>
              <span>Click steps to preview details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
