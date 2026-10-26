import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { AnalyzePage } from './components/analyze/AnalyzePage'
import { useRoute } from './utils/useRoute'

export function App() {
  const { path, params, navigate } = useRoute()

  const handleGetStarted = () => {
    const inputElement = document.getElementById('repo-url-input')
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        inputElement.focus()
      }, 350)
    }
  }

  const handleAnalyze = (repoInfo) => {
    console.info('[FirstPR] Repository validated:', repoInfo)
  }

  const handleNavigateToAnalyze = ({ owner, repo, demo = true }) => {
    navigate('/analyze', { owner, repo, demo })
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className="app-root">
      {/* Precision developer hairline & grid pattern */}
      <div className="top-hairline" aria-hidden="true" />
      <div className="bg-grid-pattern" aria-hidden="true" />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '20px',
          background: 'var(--accent-violet)',
          color: '#fff',
          padding: '6px 14px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          zIndex: 100,
          transition: 'top 0.15s ease-out',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '10px' }}
        onBlur={(e) => { e.currentTarget.style.top = '-100px' }}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar
        onGetStartedClick={handleGetStarted}
        onNavigate={navigate}
        currentPath={path}
      />

      {/* Main Content Landmark */}
      <main id="main-content">
        {path === '/analyze' ? (
          <AnalyzePage
            owner={params.owner}
            repo={params.repo}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <>
            <Hero
              onAnalyze={handleAnalyze}
              onNavigateToAnalyze={handleNavigateToAnalyze}
            />
            <HowItWorks />
            <Features />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
