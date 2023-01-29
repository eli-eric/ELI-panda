import React, { Component, ErrorInfo, ReactNode } from 'react'

import ErrorPage from './ErrorPage.comp'

interface Props {
  children?: ReactNode
}

interface State {
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error: error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.error) {
      return <ErrorPage message={this.state.error.message} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
