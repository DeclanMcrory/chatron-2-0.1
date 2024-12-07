import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SystemMetrics } from '../../components/SystemMetrics';

describe('SystemMetrics Integration', () => {
  const mockStatus = {
    energyLevel: 75,
    processingState: 'idle' as const,
    connectionStatus: 'connected' as const,
    temperature: 45,
    confidenceLevel: 90
  };

  it('renders all metrics correctly', () => {
    render(<SystemMetrics status={mockStatus} />);
    
    expect(screen.getByTestId('energy-level')).toHaveStyle({ width: '75%' });
    expect(screen.getByTestId('temperature')).toHaveStyle({ width: '45%' });
    expect(screen.getByTestId('confidence')).toHaveStyle({ width: '90%' });
  });

  it('updates metrics in real-time', async () => {
    const { rerender } = render(<SystemMetrics status={mockStatus} />);
    
    const updatedStatus = { ...mockStatus, energyLevel: 85 };
    rerender(<SystemMetrics status={updatedStatus} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('energy-level')).toHaveStyle({ width: '85%' });
    });
  });
});