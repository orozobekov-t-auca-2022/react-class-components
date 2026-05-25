import { useState, type ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test-utils/render';
import { ThemeContext } from './ThemeContext';
import { useTheme } from '../hooks/useTheme';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div>Current theme: {theme}</div>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe('ThemeContext / useTheme', () => {
  it('returns default values when not wrapped with provider', async () => {
    const { findByText } = rtlRender(<TestComponent />);
    const user = userEvent.setup();

    expect(await findByText('Current theme: light')).toBeTruthy();

    const btn = await findByText('toggle');
    await user.click(btn);

    expect(await findByText('Current theme: light')).toBeTruthy();
  });

  it('works when wrapped with a provider and toggles theme', async () => {
    function ProviderWrapper({ children }: { children: ReactNode }) {
      const [theme, setTheme] = useState('light');
      const toggleTheme = () =>
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    }

    const { findByText, user } = render(
      <ProviderWrapper>
        <TestComponent />
      </ProviderWrapper>
    );

    expect(await findByText('Current theme: light')).toBeTruthy();

    const btn = await findByText('toggle');
    await user.click(btn);

    expect(await findByText('Current theme: dark')).toBeTruthy();
  });
});
