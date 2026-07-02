import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-cream px-6">
            <div className="text-center">
              <h1 className="font-display text-3xl text-primary md:text-4xl">
                Something went wrong
              </h1>
              <p className="mx-auto mt-4 max-w-md font-body text-charcoal-muted">
                An unexpected error occurred. Please refresh the page or try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 rounded-lg bg-primary px-8 py-3 font-body font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
