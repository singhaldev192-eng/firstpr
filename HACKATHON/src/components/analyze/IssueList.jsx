import { useState, useMemo } from 'react'
import { Search, MessageSquare, Tag, CircleDot, X, Filter } from 'lucide-react'
import styles from './IssueList.module.css'

export function IssueList({ issues = [], selectedIssue, onSelectIssue }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('all')

  // Extract all unique labels across issues
  const availableLabels = useMemo(() => {
    const set = new Set()
    issues.forEach((iss) => {
      if (iss.labels) {
        iss.labels.forEach((l) => set.add(l))
      }
    })
    return ['all', ...Array.from(set)]
  }, [issues])

  // Filter issues based on search query and selected label
  const filteredIssues = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return issues.filter((iss) => {
      const matchesLabel =
        selectedLabel === 'all' ||
        (iss.labels && iss.labels.some((l) => l.toLowerCase() === selectedLabel.toLowerCase()))

      if (!matchesLabel) return false

      if (!q) return true

      const matchesTitle = iss.title.toLowerCase().includes(q)
      const matchesNum = String(iss.number).includes(q)
      const matchesAuthor = iss.author?.toLowerCase().includes(q)
      const matchesBody = iss.body?.toLowerCase().includes(q)
      const matchesAnyLabel = iss.labels?.some((l) => l.toLowerCase().includes(q))

      return matchesTitle || matchesNum || matchesAuthor || matchesBody || matchesAnyLabel
    })
  }, [issues, searchQuery, selectedLabel])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedLabel('all')
  }

  return (
    <div className={styles.container}>
      {/* Search Input Bar */}
      <div className={styles.searchBox}>
        <Search size={15} className={styles.searchIcon} aria-hidden="true" />
        <label htmlFor="issue-search-input" className={styles.visuallyHidden}>
          Search repository issues
        </label>
        <input
          id="issue-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search issues by keyword, #number, or label..."
          className={styles.searchInput}
          autoComplete="off"
          spellCheck="false"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className={styles.clearSearchBtn}
            aria-label="Clear search input"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Label Chips */}
      <div className={styles.filterRow} role="tablist" aria-label="Filter issues by label">
        {availableLabels.map((label) => {
          const isActive = selectedLabel === label
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedLabel(label)}
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
            >
              {label === 'all' ? 'All Issues' : label}
            </button>
          )
        })}
      </div>

      {/* Issues Count Summary */}
      <div className={styles.countSummary}>
        <span>{filteredIssues.length} of {issues.length} beginner-friendly issues</span>
      </div>

      {/* Issue Items List */}
      <div className={styles.list}>
        {filteredIssues.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No matching issues found</p>
            <p className={styles.emptySubtitle}>Try adjusting your search terms or clearing the label filter.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className={styles.resetBtn}
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isSelected = selectedIssue?.number === issue.number
            return (
              <button
                key={issue.number}
                type="button"
                onClick={() => onSelectIssue(issue)}
                className={`${styles.issueCard} ${isSelected ? styles.issueCardSelected : ''}`}
                aria-pressed={isSelected}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.idGroup}>
                    <CircleDot size={14} className={styles.openIcon} aria-hidden="true" />
                    <span className={styles.issueNumber}>#{issue.number}</span>
                  </div>
                  {issue.commentsCount !== undefined && (
                    <div className={styles.commentsBadge} title={`${issue.commentsCount} comments`}>
                      <MessageSquare size={12} />
                      <span>{issue.commentsCount}</span>
                    </div>
                  )}
                </div>

                <h3 className={styles.issueTitle}>{issue.title}</h3>

                <div className={styles.cardMeta}>
                  <span className={styles.authorText}>by {issue.author}</span>
                  {issue.analysis?.difficulty && (
                    <span className={styles.difficultyTag}>
                      {issue.analysis.difficulty}
                    </span>
                  )}
                </div>

                {issue.labels && issue.labels.length > 0 && (
                  <div className={styles.labelsRow}>
                    {issue.labels.slice(0, 3).map((lbl) => (
                      <span key={lbl} className={styles.labelPill}>
                        {lbl}
                      </span>
                    ))}
                    {issue.labels.length > 3 && (
                      <span className={styles.moreLabels}>+{issue.labels.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

