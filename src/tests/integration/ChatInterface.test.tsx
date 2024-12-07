import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface } from '../../components/ChatInterface';
import { useChatStore } from '../../store/chatStore';

describe('ChatInterface Integration', () => {
  beforeEach(() => {
    useChatStore.setState({ messages: [], isProcessing: false });
  });

  it('renders correctly across different screen sizes', async () => {
    const { container } = render(<ChatInterface messages={[]} onSendMessage={() => {}} />);
    
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      Object.assign(window, { innerWidth: viewport.width, innerHeight: viewport.height });
      window.dispatchEvent(new Event('resize'));
      
      await waitFor(() => {
        expect(container.querySelector('.chat-interface')).toBeVisible();
      });
    }
  });

  it('handles user input and message submission correctly', async () => {
    const onSendMessage = vi.fn();
    render(<ChatInterface messages={[]} onSendMessage={onSendMessage} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });

    await userEvent.type(input, 'Hello CHATRON');
    await userEvent.click(submitButton);

    expect(onSendMessage).toHaveBeenCalledWith('Hello CHATRON');
    expect(input).toHaveValue('');
  });

  it('displays loading states appropriately', async () => {
    render(<ChatInterface messages={[]} onSendMessage={() => {}} />);
    
    useChatStore.setState({ isProcessing: true });
    
    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeVisible();
    });
  });

  it('handles error states gracefully', async () => {
    const onSendMessage = () => {
      throw new Error('Network error');
    };

    render(<ChatInterface messages={[]} onSendMessage={onSendMessage} />);
    
    const input = screen.getByPlaceholderText(/type your message/i);
    const submitButton = screen.getByRole('button', { name: /send/i });

    await userEvent.type(input, 'Hello');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/neural pathways encountered an unexpected anomaly/i)).toBeVisible();
    });
  });
});