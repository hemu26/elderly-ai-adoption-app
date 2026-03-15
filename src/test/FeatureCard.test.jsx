import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(
      <MemoryRouter>
        <FeatureCard
          to="/test"
          icon="🧠"
          title="What is AI?"
          description="Learn about AI"
          color="#4A90E2"
        />
      </MemoryRouter>
    );
    expect(screen.getByText('What is AI?')).toBeInTheDocument();
    expect(screen.getByText('Learn about AI')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(
      <MemoryRouter>
        <FeatureCard to="/test" icon="🎤" title="Voice" description="Speak" color="#E24A4A" />
      </MemoryRouter>
    );
    expect(screen.getByText('🎤')).toBeInTheDocument();
  });

  it('renders as a link with the correct href', () => {
    render(
      <MemoryRouter>
        <FeatureCard to="/health-tips" icon="❤️" title="Health" description="Tips" color="#E2904A" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/health-tips');
  });

  it('applies aria-label for accessibility', () => {
    render(
      <MemoryRouter>
        <FeatureCard to="/chat" icon="💬" title="Chat" description="Ask questions" color="#4AE290" />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Chat')).toBeInTheDocument();
  });
});
