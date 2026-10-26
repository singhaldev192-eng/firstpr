import { useState, useEffect } from 'react'
import { getRepository } from '../../services/api'
import { RepoHeader } from './RepoHeader'
import { IssueList } from './IssueList'
import { IssueDetail } from './IssueDetail'
import { Loader2, AlertCircle, RefreshCw, FolderSearch } from 'lucide-react'
import styles from './AnalyzePage.module.css'

export function AnalyzePage({ owner: initialOwner, repo: initialRepo, onBackToHome }) {
  const owner = initialOwner || 'facebook'
  const repo = initialRepo || 'react'

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [repoData, setRepoData] = useState(null)
  const [isDemo, setIsDemo] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [mobileTab, setMobileTab] = useState('list') // 'list' | 'detail' for small screens

  const fetchRepoData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getRepository(owner, repo)
      if (result.error && !result.isDemo) {
        setError(result.error)
        setRepoData(null)
      } else {
        setRepoData(result.data)
        setIsDemo(result.isDemo)
        if (result.data?.issues && result.data.issues.length > 0) {
          setSelectedIssue(result.data.issues[0])
        }
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching repository details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepoData()
  }, [owner, repo])

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue)
    setMobileTab('detail')
  }

  return (
    <div className={styles.page}>
      {/* Loading Skeleton */}
      {loading && (
        <div className={styles.loadingContainer}>
          <div className="container">
            <div className={styles.loaderBox}>
              <Loader2 size={24} className={styles.spinner} />
              <h2 className={styles.loadingTitle}>Analyzing repository context...</h2>
              <p className={styles.loadingSubtitle}>
                Reading codebase documentation and preparing beginner-friendly roadmap issues for {owner}/{repo}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error & Retry State */}
      {!loading && error && (
        <div className={styles.errorContainer}>
          <div className="container">
            <div className={styles.errorCard} role="alert">
              <AlertCircle size={24} className={styles.errorIcon} />
              <h2 className={styles.errorTitle}>Repository Analysis Failed</h2>
              <p className={styles.errorMsg}>{error}</p>
              <div className={styles.errorActions}>
                <button
                  type="button"
                  onClick={fetchRepoData}
                  className={styles.retryBtn}
                >
                  <RefreshCw size={14} />
                  <span>Retry Request</span>
                </button>
                <button
                  type="button"
                  onClick={onBackToHome}
                  className={styles.secondaryBtn}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Normal Content State */}
      {!loading && !error && repoData && (
        <>
          <RepoHeader
            repoData={repoData}
            isDemo={isDemo}
            onBackToHome={onBackToHome}
          />

          <div className="container">
            {/* Mobile Tab Toggle */}
            <div className={styles.mobileTabNav}>
              <button
                type="button"
                className={`${styles.tabBtn} ${mobileTab === 'list' ? styles.tabBtnActive : ''}`}
                onClick={() => setMobileTab('list')}
              >
                Issues ({repoData.issues?.length || 0})
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${mobileTab === 'detail' ? styles.tabBtnActive : ''}`}
                onClick={() => setMobileTab('detail')}
                disabled={!selectedIssue}
              >
                Roadmap #{selectedIssue?.number || ''}
              </button>
            </div>

            {/* Main Dual-Column Workspace */}
            <div className={styles.workspaceGrid}>
              {/* Left Column: Issue List */}
              <div className={`${styles.issueListCol} ${mobileTab === 'detail' ? styles.hideOnMobile : ''}`}>
                <IssueList
                  issues={repoData.issues || []}
                  selectedIssue={selectedIssue}
                  onSelectIssue={handleSelectIssue}
                />
              </div>

              {/* Right Column: Selected Issue Detail & Contribution Checklist */}
              <div className={`${styles.issueDetailCol} ${mobileTab === 'list' ? styles.hideOnMobile : ''}`}>
                {selectedIssue ? (
                  <IssueDetail
                    issue={selectedIssue}
                    repoData={repoData}
                  />
                ) : (
                  <div className={styles.noIssueSelected}>
                    <FolderSearch size={24} className={styles.noIssueIcon} />
                    <p>Select an issue from the list to view its contribution roadmap.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

