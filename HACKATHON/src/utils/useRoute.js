import { useState, useEffect, useCallback } from 'react'

/**
 * Lightweight browser history router that supports:
 * - Direct path navigation: `/` and `/analyze`
 * - Query string parsing: `?owner=facebook&repo=react`
 * - Hash fallback: `#/analyze?owner=...` (for static hosting)
 * - Browser back / forward buttons (popstate)
 */
export function useRoute() {
  const parseCurrentLocation = () => {
    const pathname = window.location.pathname || '/'
    const search = window.location.search || ''
    const hash = window.location.hash || ''

    // Support both standard paths (/analyze) and hash routes (#/analyze or #analyze)
    let currentPath = pathname
    let queryParams = new URLSearchParams(search)

    if (hash.startsWith('#/analyze') || hash.startsWith('#analyze')) {
      currentPath = '/analyze'
      const hashQueryIndex = hash.indexOf('?')
      if (hashQueryIndex !== -1) {
        queryParams = new URLSearchParams(hash.slice(hashQueryIndex))
      }
    } else if (currentPath.includes('/analyze')) {
      currentPath = '/analyze'
    } else {
      currentPath = '/'
    }

    return {
      path: currentPath,
      params: {
        owner: queryParams.get('owner') || '',
        repo: queryParams.get('repo') || '',
        issue: queryParams.get('issue') || '',
        demo: queryParams.get('demo') === 'true',
      },
      search,
    }
  }

  const [route, setRoute] = useState(parseCurrentLocation)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentLocation())
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  const navigate = useCallback((toPath, params = {}) => {
    const searchParams = new URLSearchParams()
    if (params.owner) searchParams.set('owner', params.owner)
    if (params.repo) searchParams.set('repo', params.repo)
    if (params.issue) searchParams.set('issue', params.issue)
    if (params.demo) searchParams.set('demo', 'true')

    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ''
    const fullUrl = `${toPath}${queryString}`

    try {
      window.history.pushState({}, '', fullUrl)
    } catch (e) {
      // Fallback for file:// or restricted origins
      window.location.hash = `#${toPath}${queryString}`
    }

    setRoute({
      path: toPath,
      params: {
        owner: params.owner || '',
        repo: params.repo || '',
        issue: params.issue || '',
        demo: Boolean(params.demo),
      },
      search: queryString,
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    path: route.path,
    params: route.params,
    navigate,
  }
}

