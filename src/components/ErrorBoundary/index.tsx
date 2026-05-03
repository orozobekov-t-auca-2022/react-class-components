import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface IErrorBoundaryProps{
  children: ReactNode,
}

interface IErrorBoundaryState{
  hasError: boolean,
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState>{
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    }
  }
  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true};
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Error caught by error boundary ', error, errorInfo);
  }
  render(): ReactNode {
    if(this.state.hasError) {
      return (
        <section className={styles.errorBoundary}>
          <h2 className={styles.emoji}>🐱</h2>
          <h2>Oops, something went wrong. Please, visit this website later</h2>
        </section>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;