import { render, screen } from '../../test-utils/render';
import { describe, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Error');
  }

  return <div>Child Component</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('displays fallback ui when the child throws', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
    expect(screen.getByText(/oops, something went wrong/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('logs the caught error to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
