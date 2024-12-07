import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThoughtStream } from '../../components/ThoughtStream';

describe('ThoughtStream Integration', () => {
  const mockThoughts = [
    { id: '1', type: 'reasoning', content: 'Analyzing input...' },
    { id: '2', type: 'quantum', content: 'Processing quantum states...' }
  ];

  it('renders thoughts in correct order', () => {
    render(<ThoughtStream thoughts={mockThoughts} />);
    
    const thoughtElements = screen.getAllByTestId('thought-item');
    expect(thoughtElements).toHaveLength(2);
    expect(thoughtElements[0]).toHaveTextContent('Analyzing input...');
  });

  it('animates thoughts appropriately', async () => {
    const { rerender } = render(<ThoughtStream thoughts={mockThoughts} />);
    
    const newThought = { id: '3', type: 'synthesis', content: 'New thought' };
    rerender(<ThoughtStream thoughts={[...mockThoughts, newThought]} />);
    
    await waitFor(() => {
      expect(screen.getByText('New thought')).toHaveClass('animate-fade-in');
    });
  });
});