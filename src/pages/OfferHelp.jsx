import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import CaseCard from '../components/CaseCard.jsx';

const VERIFIED_CASES = [
  {
    id: 'mock-1',
    category: 'financial',
    categoryLabel: 'Financial Help',
    title: 'Widow needs school fee support for two children',
    description:
      'A widow from Rajasthan lost her husband in a road accident. She works as a daily-wage labourer and cannot afford the annual school fees (₹8,000) for her two children, aged 8 and 11.',
    amountNeeded: 8000,
    date: '10 Mar 2026',
    verified: true,
    status: 'open',
    name: 'Sunita D.',
  },
  {
    id: 'mock-2',
    category: 'injustice',
    categoryLabel: 'Injustice / Legal',
    title: 'Farmer cheated of land rights by local official',
    description:
      'A small farmer in UP was coerced into signing documents he could not read. His 2-acre family land was transferred without fair compensation. Legal assistance is needed to challenge the fraud.',
    amountNeeded: null,
    date: '8 Mar 2026',
    verified: true,
    status: 'open',
    name: 'Ramesh K.',
  },
  {
    id: 'mock-3',
    category: 'financial',
    categoryLabel: 'Financial Help',
    title: 'Elderly couple stranded after house fire',
    description:
      'An elderly couple in their 70s lost their home to a fire. They are currently living with neighbours. Basic utensils, clothing, and one month rent assistance would help them restart.',
    amountNeeded: 25000,
    date: '5 Mar 2026',
    verified: true,
    status: 'open',
    name: 'Anonymous',
  },
  {
    id: 'mock-4',
    category: 'community',
    categoryLabel: 'Community Issue',
    title: 'Village water pump broken for 3 months',
    description:
      'Residents of a small village in MP have no functional drinking water source. The government pump is broken and repeated complaints have been ignored. Need funds to repair or replace the pump.',
    amountNeeded: 15000,
    date: '2 Mar 2026',
    verified: true,
    status: 'open',
    name: 'Village Council Rep.',
  },
];

const ALL_FILTER = 'all';
const FILTERS = [
  { value: ALL_FILTER, labelKey: 'robinhood.filterAll', icon: '📋' },
  { value: 'financial', labelKey: 'robinhood.catFinancial', icon: '💰' },
  { value: 'injustice', labelKey: 'robinhood.catInjustice', icon: '⚖️' },
  { value: 'community', labelKey: 'robinhood.catCommunity', icon: '🤝' },
];

function loadUserCases() {
  try {
    return JSON.parse(localStorage.getItem('robinhood-cases') || '[]');
  } catch {
    return [];
  }
}

export default function OfferHelp() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(ALL_FILTER);
  const [helpedCase, setHelpedCase] = useState(null);

  const userCases = useMemo(() => loadUserCases(), []);
  const verifiedUserCases = userCases.filter((c) => c.verified);

  const allCases = [...VERIFIED_CASES, ...verifiedUserCases];

  const visibleCases =
    filter === ALL_FILTER ? allCases : allCases.filter((c) => c.category === filter);

  function handleHelp(caseItem) {
    setHelpedCase(caseItem);
  }

  function closeModal() {
    setHelpedCase(null);
  }

  return (
    <div className="page">
      <Header showBack />

      <div
        className="page-hero"
        style={{ background: 'linear-gradient(135deg, #34a853, #1a73e8)' }}
      >
        <span className="page-hero-icon" aria-hidden="true">🤲</span>
        <h1 className="page-hero-title">{t('robinhood.offerHelpTitle')}</h1>
      </div>

      <main className="content-main">
        <div className="card" style={{ margin: '1rem 1rem 0' }}>
          <p>{t('robinhood.offerHelpIntro')}</p>
        </div>

        {/* Filter bar */}
        <div className="robinhood-filter-bar" role="group" aria-label={t('robinhood.filterLabel')}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`robinhood-filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
            >
              <span aria-hidden="true">{f.icon}</span> {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* Cases list */}
        {visibleCases.length === 0 ? (
          <div className="robinhood-empty card">
            <span aria-hidden="true">🔍</span>
            <p>{t('robinhood.noCases')}</p>
          </div>
        ) : (
          <div className="robinhood-cases-list">
            {visibleCases.map((c) => (
              <CaseCard key={c.id} caseItem={c} onHelp={handleHelp} />
            ))}
          </div>
        )}

        {/* Help modal */}
        {helpedCase && (
          <div
            className="robinhood-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={t('robinhood.helpModalTitle')}
            onClick={closeModal}
          >
            <div className="robinhood-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="robinhood-modal-title">{t('robinhood.helpModalTitle')}</h2>
              <p className="robinhood-modal-case">"{helpedCase.title}"</p>
              <p>{t('robinhood.helpModalText')}</p>
              <ul className="robinhood-modal-steps">
                <li>{t('robinhood.helpStep1')}</li>
                <li>{t('robinhood.helpStep2')}</li>
                <li>{t('robinhood.helpStep3')}</li>
              </ul>
              <p className="robinhood-modal-contact">
                📧 {t('robinhood.helpContact')}
              </p>
              <button className="robinhood-submit-btn" onClick={closeModal} style={{ marginTop: '1rem' }}>
                {t('robinhood.helpModalClose')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
