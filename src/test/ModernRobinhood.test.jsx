import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        'robinhood.title': 'Modern Robinhood',
        'robinhood.subtitle': 'Connecting helpers with those who need help',
        'robinhood.mission': 'We bridge the gap between people facing hardship and helpers.',
        'robinhood.seekHelp': 'I Need Help',
        'robinhood.seekHelpDesc': 'Submit your case for review',
        'robinhood.offerHelp': 'I Want to Help',
        'robinhood.offerHelpDesc': 'Browse verified cases',
        'robinhood.howItWorks': 'How It Works',
        'robinhood.whatWeCover': 'What We Cover',
        'robinhood.step1Title': 'Submit Your Case',
        'robinhood.step1Desc': 'Describe your situation honestly.',
        'robinhood.step2Title': 'We Verify',
        'robinhood.step2Desc': 'Our team reviews each case.',
        'robinhood.step3Title': 'Helpers Step In',
        'robinhood.step3Desc': 'Verified cases are listed publicly.',
        'robinhood.coverFinancialTitle': 'Financial Help',
        'robinhood.coverFinancialDesc': 'School fees, medical bills, etc.',
        'robinhood.coverInjusticeTitle': 'Injustice / Legal',
        'robinhood.coverInjusticeDesc': 'Land fraud, wage theft, etc.',
        'robinhood.coverCommunityTitle': 'Community Issues',
        'robinhood.coverCommunityDesc': 'Shared problems in villages.',
        'robinhood.disclaimer': 'Important',
        'robinhood.disclaimerText': 'We do not handle health or emergency services.',
        'robinhood.seekHelpTitle': 'Submit Your Case',
        'robinhood.seekHelpIntro': 'Fill in the form below.',
        'robinhood.labelCategory': 'Type of Help Needed',
        'robinhood.catFinancial': 'Financial Help',
        'robinhood.catInjustice': 'Injustice / Legal',
        'robinhood.catCommunity': 'Community Issue',
        'robinhood.labelTitle': 'Brief Summary',
        'robinhood.placeholderTitle': 'e.g. Need help with school fees',
        'robinhood.labelDescription': 'Full Description',
        'robinhood.placeholderDescription': 'Describe your situation...',
        'robinhood.labelAmount': 'Amount Needed (₹)',
        'robinhood.placeholderAmount': 'e.g. 10000',
        'robinhood.labelName': 'Your Name (optional)',
        'robinhood.placeholderName': 'You may use an alias',
        'robinhood.labelContact': 'Contact Details (optional)',
        'robinhood.placeholderContact': 'Phone or email',
        'robinhood.contactHint': 'Shared only with verified helpers.',
        'robinhood.submitCase': 'Submit Case for Review',
        'robinhood.errorCategory': 'Please select a category',
        'robinhood.errorTitle': 'Please enter a brief summary',
        'robinhood.errorDescription': 'Please describe your situation',
        'robinhood.successTitle': 'Case Submitted!',
        'robinhood.successText': 'Our team will review your case.',
        'robinhood.successNote': 'It will be listed if genuine.',
        'robinhood.submitAnother': 'Submit Another Case',
        'robinhood.offerHelpTitle': 'Help Someone Today',
        'robinhood.offerHelpIntro': 'All cases below have been verified.',
        'robinhood.filterLabel': 'Filter by category',
        'robinhood.filterAll': 'All Cases',
        'robinhood.noCases': 'No cases found for this category.',
        'robinhood.helpModalTitle': 'Thank You for Wanting to Help!',
        'robinhood.helpModalText': 'Here is how to get in touch:',
        'robinhood.helpStep1': 'Send us an email mentioning the case.',
        'robinhood.helpStep2': 'We will connect you with the person.',
        'robinhood.helpStep3': 'Your help goes directly to them.',
        'robinhood.helpContact': 'contact@modernrobinhood.in',
        'robinhood.helpModalClose': "Got it, I'll reach out",
        'appName': 'AI Saathi',
        'back': 'Back',
        'selectLanguage': 'Choose Your Language',
        'features.modernRobinhood': 'Modern Robinhood',
        'features.modernRobinhoodDesc': 'Connect helpers & help-seekers for justice',
      };
      return map[key] || key;
    },
  }),
}));

// Minimal Header stub to avoid i18n/routing complexity
vi.mock('../components/Header.jsx', () => ({
  default: () => <header data-testid="header" />,
}));

import ModernRobinhood from '../pages/ModernRobinhood.jsx';
import SeekHelp from '../pages/SeekHelp.jsx';
import OfferHelp from '../pages/OfferHelp.jsx';
import CaseCard from '../components/CaseCard.jsx';

// ---------- CaseCard ----------
describe('CaseCard', () => {
  const mockCase = {
    id: 'test-1',
    category: 'financial',
    categoryLabel: 'Financial Help',
    title: 'Help with school fees',
    description: 'A family needs support paying school fees.',
    amountNeeded: 5000,
    date: '10 Mar 2026',
    verified: true,
  };

  it('renders the case title', () => {
    render(<CaseCard caseItem={mockCase} />);
    expect(screen.getByText('Help with school fees')).toBeInTheDocument();
  });

  it('renders the category label', () => {
    render(<CaseCard caseItem={mockCase} />);
    expect(screen.getByText('Financial Help')).toBeInTheDocument();
  });

  it('renders verified badge when case is verified', () => {
    render(<CaseCard caseItem={mockCase} />);
    expect(screen.getByText('✅ Verified')).toBeInTheDocument();
  });

  it('does not render verified badge when case is not verified', () => {
    render(<CaseCard caseItem={{ ...mockCase, verified: false }} />);
    expect(screen.queryByText('✅ Verified')).not.toBeInTheDocument();
  });

  it('renders amount when provided', () => {
    render(<CaseCard caseItem={mockCase} />);
    expect(screen.getByText(/5,000/)).toBeInTheDocument();
  });

  it('does not render amount when null', () => {
    render(<CaseCard caseItem={{ ...mockCase, amountNeeded: null }} />);
    expect(screen.queryByText(/Amount needed/)).not.toBeInTheDocument();
  });

  it('renders help button when onHelp is provided', () => {
    const onHelp = vi.fn();
    render(<CaseCard caseItem={mockCase} onHelp={onHelp} />);
    expect(screen.getByRole('button', { name: /Help with: Help with school fees/i })).toBeInTheDocument();
  });

  it('calls onHelp with the case item when button clicked', () => {
    const onHelp = vi.fn();
    render(<CaseCard caseItem={mockCase} onHelp={onHelp} />);
    fireEvent.click(screen.getByRole('button', { name: /Help with:/i }));
    expect(onHelp).toHaveBeenCalledWith(mockCase);
  });

  it('does not render help button when onHelp is not provided', () => {
    render(<CaseCard caseItem={mockCase} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

// ---------- ModernRobinhood ----------
describe('ModernRobinhood page', () => {
  it('renders the page title', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByText('Modern Robinhood')).toBeInTheDocument();
  });

  it('renders seek help and offer help links', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /I Need Help/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /I Want to Help/i })).toBeInTheDocument();
  });

  it('renders "How It Works" section', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Submit Your Case')).toBeInTheDocument();
    expect(screen.getByText('We Verify')).toBeInTheDocument();
    expect(screen.getByText('Helpers Step In')).toBeInTheDocument();
  });

  it('renders "What We Cover" section', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByText('What We Cover')).toBeInTheDocument();
    expect(screen.getByText('Financial Help')).toBeInTheDocument();
    expect(screen.getByText('Injustice / Legal')).toBeInTheDocument();
    expect(screen.getByText('Community Issues')).toBeInTheDocument();
  });

  it('renders the disclaimer', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByText(/Important/)).toBeInTheDocument();
  });

  it('seek help link points to /seek-help', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /I Need Help/i })).toHaveAttribute('href', '/seek-help');
  });

  it('offer help link points to /offer-help', () => {
    render(
      <MemoryRouter>
        <ModernRobinhood />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /I Want to Help/i })).toHaveAttribute('href', '/offer-help');
  });
});

// ---------- SeekHelp ----------
describe('SeekHelp page', () => {
  beforeEach(() => {
    // Provide a minimal localStorage mock
    const store = {};
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((k) => store[k] ?? null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((k, v) => { store[k] = v; });
  });

  it('renders the form heading', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );
    expect(screen.getByText('Submit Your Case')).toBeInTheDocument();
  });

  it('renders all three category options', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );
    expect(screen.getByText('Financial Help')).toBeInTheDocument();
    expect(screen.getByText('Injustice / Legal')).toBeInTheDocument();
    expect(screen.getByText('Community Issue')).toBeInTheDocument();
  });

  it('shows validation errors when form submitted empty', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Submit Case for Review/i }));
    expect(screen.getByText('Please select a category')).toBeInTheDocument();
    expect(screen.getByText('Please enter a brief summary')).toBeInTheDocument();
    expect(screen.getByText('Please describe your situation')).toBeInTheDocument();
  });

  it('shows amount field only when Financial Help is selected', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/Amount Needed/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Financial Help'));
    expect(screen.getByLabelText(/Amount Needed/i)).toBeInTheDocument();
  });

  it('shows success screen after valid submission', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Financial Help'));
    fireEvent.change(screen.getByPlaceholderText('e.g. Need help with school fees'), {
      target: { value: 'Need tuition help' },
    });
    fireEvent.change(screen.getByPlaceholderText('Describe your situation...'), {
      target: { value: 'We cannot afford education costs this year.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit Case for Review/i }));

    expect(screen.getByText('Case Submitted!')).toBeInTheDocument();
  });

  it('can submit another case after first submission', () => {
    render(
      <MemoryRouter>
        <SeekHelp />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Community Issue'));
    fireEvent.change(screen.getByPlaceholderText('e.g. Need help with school fees'), {
      target: { value: 'No clean water' },
    });
    fireEvent.change(screen.getByPlaceholderText('Describe your situation...'), {
      target: { value: 'Our village pump has been broken for months.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Case for Review/i }));

    expect(screen.getByText('Case Submitted!')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Submit Another Case/i }));
    expect(screen.getByRole('button', { name: /Submit Case for Review/i })).toBeInTheDocument();
  });
});

// ---------- OfferHelp ----------
describe('OfferHelp page', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  it('renders the page heading', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    expect(screen.getByText('Help Someone Today')).toBeInTheDocument();
  });

  it('renders the All Cases filter by default', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /All Cases/i })).toBeInTheDocument();
  });

  it('renders verified mock cases', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    expect(screen.getByText('Widow needs school fee support for two children')).toBeInTheDocument();
    expect(screen.getByText('Farmer cheated of land rights by local official')).toBeInTheDocument();
  });

  it('filters cases by category when filter button clicked', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Injustice/i }));
    expect(screen.getByText('Farmer cheated of land rights by local official')).toBeInTheDocument();
    expect(screen.queryByText('Widow needs school fee support for two children')).not.toBeInTheDocument();
  });

  it('shows help modal when "I Want to Help" is clicked', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    const helpButtons = screen.getAllByRole('button', { name: /Help with:/i });
    fireEvent.click(helpButtons[0]);
    expect(screen.getByText('Thank You for Wanting to Help!')).toBeInTheDocument();
    expect(screen.getByText(/contact@modernrobinhood\.in/)).toBeInTheDocument();
  });

  it('closes modal when close button clicked', () => {
    render(
      <MemoryRouter>
        <OfferHelp />
      </MemoryRouter>
    );
    fireEvent.click(screen.getAllByRole('button', { name: /Help with:/i })[0]);
    expect(screen.getByText('Thank You for Wanting to Help!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Got it/i }));
    expect(screen.queryByText('Thank You for Wanting to Help!')).not.toBeInTheDocument();
  });
});
