import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UnitList from '../UnitList';

const renderWithClient = (units: Array<{ name: string }>) => {
  const mockClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  mockClient.setQueryData(['units'], units);

  return render(
    <QueryClientProvider client={mockClient}>
      <UnitList />
    </QueryClientProvider>
  );
};

describe('UnitList', () => {
  it('renders unit cards from the cached query data', () => {
    renderWithClient([{ name: 'Alpha Unit' }, { name: 'Beta Unit' }]);

    const alpha = screen.getByRole('heading', { level: 3, name: 'Alpha Unit' });
    const beta = screen.getByRole('heading', { level: 3, name: 'Beta Unit' });

    expect(alpha).toBeInTheDocument();
    expect(beta).toBeInTheDocument();
  });

  it('applies the unit-list class to the list container', () => {
    const { container } = renderWithClient([{ name: 'Gamma Unit' }]);
    expect(container.querySelector('.unit-list')).toBeInTheDocument();
  });
});
