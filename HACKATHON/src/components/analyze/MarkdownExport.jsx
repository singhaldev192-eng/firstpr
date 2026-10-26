import { useState } from 'react'
import { Download, Copy, CheckCheck, FileText } from 'lucide-react'
import styles from './MarkdownExport.module.css'

export function MarkdownExport({ issue, repoData, completedSteps = [] }) {
  const [copied, setCopied] = useState(false)

  const generateMarkdown = () => {
    const { owner, repo } = repoData
    const analysis = issue.analysis || {}
    const steps = analysis.steps || []

    const completedSet = new Set(completedSteps)

    let md = `# Contribution Plan: #${issue.number} ${issue.title}\n\n`
    md += `**Repository:** [${owner}/${repo}](https://github.com/${owner}/${repo})\n`
    md += `**Issue Link:** [GitHub Issue #${issue.number}](https://github.com/${owner}/${repo}/issues/${issue.number})\n`
    md += `**Author:** @${issue.author}\n`
    md += `**Difficulty:** ${analysis.difficulty || 'Beginner'}\n`
    md += `**Estimated Time:** ~${analysis.estimatedMinutes || 45} minutes\n`
    if (analysis.targetStack) {
      md += `**Target Stack:** ${analysis.targetStack.join(', ')}\n`
    }
    md += `\n---\n\n`

    md += `## 📋 Summary\n\n`
    md += `${analysis.summary || issue.body || 'No summary available.'}\n\n`

    md += `## ✅ Contribution Checklist\n\n`
    steps.forEach((step, idx) => {
      const isDone = completedSet.has(step.id) ? 'x' : ' '
      md += `- [${isDone}] **Step ${idx + 1}: ${step.title}**\n`
      md += `  - **File Target:** \`${step.fileTarget}\`\n`
      if (step.command) {
        md += `  - **Command:** \`${step.command}\`\n`
      }
      if (step.guidance) {
        md += `  - **Guidance:** ${step.guidance}\n`
      }
      md += `\n`
    })

    md += `\n---\n`
    md += `*Generated via [FirstPR](https://github.com/${owner}/${repo}) — AI-powered open-source contribution guide.*\n`

    return md
  }

  const handleCopy = () => {
    const content = generateMarkdown()
    navigator.clipboard?.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const content = generateMarkdown()
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `firstpr-plan-${repoData.repo}-issue-${issue.number}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.exportBar}>
      <div className={styles.exportInfo}>
        <FileText size={14} className={styles.fileIcon} />
        <span>Export contribution plan</span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCopy}
          className={styles.actionBtn}
          title="Copy formatted Markdown to clipboard"
        >
          {copied ? <CheckCheck size={13} className={styles.checkIcon} /> : <Copy size={13} />}
          <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className={styles.actionBtn}
          title="Download plan as .md file"
        >
          <Download size={13} />
          <span>Download .md</span>
        </button>
      </div>
    </div>
  )
}

