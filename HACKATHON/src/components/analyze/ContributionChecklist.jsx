import { useState, useEffect } from 'react'
import { Check, ChevronDown, ChevronUp, Copy, CheckCheck, Terminal, FileCode, RotateCcw } from 'lucide-react'
import styles from './ContributionChecklist.module.css'

export function ContributionChecklist({ issue, repoData, onProgressChange }) {
  const steps = issue.analysis?.steps || []
  const storageKey = `firstpr_progress_${repoData.owner}_${repoData.repo}_issue_${issue.number}`

  // Load completed step IDs from localStorage
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  // Open the first unfinished step by default, or the first step
  const [expandedSteps, setExpandedSteps] = useState(() => {
    const firstIncomplete = steps.find((s) => !completedSteps.includes(s.id))
    return firstIncomplete ? [firstIncomplete.id] : (steps[0] ? [steps[0].id] : [])
  })

  const [copiedItem, setCopiedItem] = useState(null)

  // Sync completed steps with localStorage and parent
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedSteps))
    } catch (e) {
      console.warn('localStorage access failed:', e)
    }
    if (typeof onProgressChange === 'function') {
      onProgressChange(completedSteps)
    }
  }, [completedSteps, storageKey, onProgressChange])

  // Reset when switching issues
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      const parsed = saved ? JSON.parse(saved) : []
      setCompletedSteps(parsed)
      const firstIncomplete = steps.find((s) => !parsed.includes(s.id))
      setExpandedSteps(firstIncomplete ? [firstIncomplete.id] : (steps[0] ? [steps[0].id] : []))
    } catch (e) {
      setCompletedSteps([])
    }
  }, [issue.number, storageKey])

  const handleToggleComplete = (stepId, e) => {
    e.stopPropagation()
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) {
        return prev.filter((id) => id !== stepId)
      } else {
        return [...prev, stepId]
      }
    })
  }

  const handleToggleExpand = (stepId) => {
    setExpandedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    )
  }

  const handleReset = () => {
    setCompletedSteps([])
    try {
      localStorage.removeItem(storageKey)
    } catch (e) {
      // ignore
    }
  }

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 1500)
  }

  const progressPercent = steps.length > 0 ? Math.round((completedSteps.length / steps.length) * 100) : 0

  return (
    <div className={styles.checklistSection}>
      {/* Header with progress */}
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.sectionHeading}>Contribution Roadmap</h3>
          <p className={styles.subheading}>
            Step-by-step checklist to guide your local environment, code edits, and verification.
          </p>
        </div>

        <div className={styles.progressGroup}>
          <div className={styles.progressText}>
            <span className={styles.countText}>
              {completedSteps.length} of {steps.length} completed
            </span>
            <span className={styles.percentText}>{progressPercent}%</span>
          </div>

          <div className={styles.progressBarBg} aria-hidden="true">
            <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
          </div>

          {completedSteps.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetBtn}
              title="Reset progress for this issue"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Steps List */}
      <div className={styles.stepsList} role="list" aria-label="Contribution steps">
        {steps.map((step, index) => {
          const isDone = completedSteps.includes(step.id)
          const isExpanded = expandedSteps.includes(step.id)

          return (
            <div
              key={step.id}
              className={`${styles.stepCard} ${isDone ? styles.stepCardDone : ''} ${
                isExpanded ? styles.stepCardExpanded : ''
              }`}
              role="listitem"
            >
              {/* Step Header Line */}
              <div
                className={styles.stepHeader}
                onClick={() => handleToggleExpand(step.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleToggleExpand(step.id)
                  }
                }}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
                  onClick={(e) => handleToggleComplete(step.id, e)}
                  aria-label={`Mark step ${index + 1} as ${isDone ? 'incomplete' : 'complete'}`}
                >
                  {isDone && <Check size={12} />}
                </button>

                <div className={styles.stepIndex}>Step 0{index + 1}</div>

                <div className={styles.stepTitleBox}>
                  <span className={`${styles.stepTitle} ${isDone ? styles.stepTitleDone : ''}`}>
                    {step.title}
                  </span>
                  <span className={styles.stepFileSubtext}>{step.fileTarget}</span>
                </div>

                <div className={styles.chevronIcon} aria-hidden="true">
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {/* Step Expanded Body */}
              {isExpanded && (
                <div className={styles.stepBody}>
                  <p className={styles.stepDetailText}>{step.detail}</p>

                  {/* Target File */}
                  <div className={styles.targetFileRow}>
                    <div className={styles.targetLabel}>Target File:</div>
                    <div className={styles.filePill}>
                      <FileCode size={12} className={styles.codeIcon} />
                      <code>{step.fileTarget}</code>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopy(step.fileTarget, `file-${step.id}`)
                        }}
                        className={styles.miniCopyBtn}
                        title="Copy file path"
                        aria-label="Copy file path"
                      >
                        {copiedItem === `file-${step.id}` ? (
                          <CheckCheck size={12} className={styles.copiedIcon} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Command */}
                  {step.command && (
                    <div className={styles.commandRow}>
                      <div className={styles.commandBox}>
                        <Terminal size={12} className={styles.termIcon} />
                        <code className={styles.cmdText}>{step.command}</code>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopy(step.command, `cmd-${step.id}`)
                        }}
                        className={styles.copyCmdBtn}
                        title="Copy command to clipboard"
                        aria-label="Copy terminal command"
                      >
                        {copiedItem === `cmd-${step.id}` ? (
                          <>
                            <CheckCheck size={12} className={styles.copiedIcon} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Guidance Note */}
                  {step.guidance && (
                    <div className={styles.guidanceBox}>
                      <span className={styles.guidanceTitle}>Contextual Guidance:</span>
                      <p className={styles.guidanceText}>{step.guidance}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

