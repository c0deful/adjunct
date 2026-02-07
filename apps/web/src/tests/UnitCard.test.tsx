import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UnitCard } from '../UnitCard';

describe('UnitCard', () => {
  it('renders the unit name inside an h3', () => {
    render(<UnitCard unit={{name: 'Test Unit'}}/>) ;
    const heading = screen.getByRole('heading', { level: 3, name: 'Test Unit' });
    expect(heading).toBeInTheDocument();
  });

  it('applies the unit-card class to the top level element', () => {
    const { container } = render(<UnitCard unit={{ name: 'Another Unit' }} />);
    expect(container.firstChild).toHaveClass('unit-card')
  });
});