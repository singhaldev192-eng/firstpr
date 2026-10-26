import { useState } from 'react'
import { CircleDot, ExternalLink, Clock, Layers, Sparkles, Tag, GitPullRequest } from 'lucide-react'
import { ContributionChecklist } from './ContributionChecklist'
import { MarkdownExport } from './MarkdownExport'
import styles from './IssueDetail.module.css'

export function IssueDetail({ issue, repoData }) {
  const [completedSteps, setCompletedSteps] = useState([])
  const { owner, repo } = repoData
  const analysis = issue.analysis || {}
  const githubIssueUrl = `https://github.com/${owner}/${repo}/issues/${issue.number}`

  return (
    <article className={styles.detailCard} aria-labelledby="issue-detail-title">
      {/* Top Issue Meta Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.idGroup}>
            <span className={styles.openBadge}>
              <CircleDot size={13} className={styles.openIcon} />
              <span>Open Issue</span>
            </span>
            <span className={styles.issueId}>#{issue.number}</span>
          </div>

          <a
            href={githubIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label={`View issue #${issue.number} on GitHub (opens in new tab)`}
          >
            <span>View on GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <h2 id="issue-detail-title" className={styles.issueTitle}>
          {issue.title}
        </h2>

        <div className={styles.authorRow}>
          <span>Opened by <strong>@{issue.author}</strong></span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span>{issue.commentsCount || 0} comments</span>
        </div>

        {/* Issue Labels */}
        {issue.labels && issue.labels.length > 0 && (
          <div className={styles.labelsRow}>
            {issue.labels.map((lbl) => (
              <span key={lbl} className={styles.labelChip}>
                <Tag size={10} className={styles.tagIcon} />
                <span>{lbl}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* DigitalHost AI Analysis Overview Card */}
      <div className={styles.aiOverviewCard}>
        <div className={styles.aiHeader}>
          <div className={styles.aiTitleGroup}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span className={styles.aiHeading}>DigitalHost AI Synthesis</span>
          </div>
          <span className={styles.groundedPill}>Repository Grounded</span>
        </div>

        <p className={styles.aiSummary}>{analysis.summary || issue.body}</p>

        {/* Technical Profile Strip */}
        <div className={styles.techStrip}>
          {analysis.difficulty && (
            <div className={styles.techItem}>
              <span className={styles.techLabel}>Difficulty:</span>
              <span className={styles.techVal}>{analysis.difficulty}</span>
            </div>
          )}

          {analysis.estimatedMinutes && (
            <div className={styles.techItem}>
              <span className={styles.techLabel}>Estimated Time:</span>
              <span className={styles.techVal}>~{analysis.estimatedMinutes} mins</span>
            </div>
          )}

          {analysis.targetStack && (
            <div className={styles.techItem}>
              <span className={styles.techLabel}>Target Stack:</span>
              <span className={styles.techVal}>{analysis.targetStack.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Contribution Checklist */}
      <ContributionChecklist
        issue={issue}
        repoData={repoData}
        onProgressChange={setCompletedSteps}
      />

      {/* Markdown Export Bar */}
      <MarkdownExport
        issue={issue}
        repoData={repoData}
        completedSteps={completedSteps}
      />
    </article>
  )
}

