import { render, screen } from '../../test-utils/render';
import { describe, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton';

describe('ErrorButton Component', () => {
  it('throws through the error boundary when clicked', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { user } = render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /error/i }));

    expect(
      await screen.findByText(/oops, something went wrong/i)
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
