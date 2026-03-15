import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';

const HOW_IT_WORKS = [
  {
    step: '1',
    icon: '📝',
    titleKey: 'robinhood.step1Title',
    descKey: 'robinhood.step1Desc',
  },
  {
    step: '2',
    icon: '🔍',
    titleKey: 'robinhood.step2Title',
    descKey: 'robinhood.step2Desc',
  },
  {
    step: '3',
    icon: '🤝',
    titleKey: 'robinhood.step3Title',
    descKey: 'robinhood.step3Desc',
  },
];

const COVERS = [
  { icon: '💰', titleKey: 'robinhood.coverFinancialTitle', descKey: 'robinhood.coverFinancialDesc' },
  { icon: '⚖️', titleKey: 'robinhood.coverInjusticeTitle', descKey: 'robinhood.coverInjusticeDesc' },
  { icon: '🤝', titleKey: 'robinhood.coverCommunityTitle', descKey: 'robinhood.coverCommunityDesc' },
];

export default function ModernRobinhood() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <Header showBack />

      <div
        className="page-hero"
        style={{ background: 'linear-gradient(135deg, #1a73e8, #34a853)' }}
      >
        <span className="page-hero-icon" aria-hidden="true">⚖️</span>
        <h1 className="page-hero-title">{t('robinhood.title')}</h1>
        <p className="page-hero-subtitle">{t('robinhood.subtitle')}</p>
      </div>

      <main className="content-main">

        {/* Mission statement */}
        <div className="card highlight-card" style={{ margin: '1rem 1rem 0' }}>
          <p className="robinhood-mission">{t('robinhood.mission')}</p>
        </div>

        {/* Action buttons */}
        <div className="robinhood-actions">
          <Link to="/seek-help" className="robinhood-btn robinhood-btn--seek">
            <span aria-hidden="true">🙋</span>
            <span>{t('robinhood.seekHelp')}</span>
            <small>{t('robinhood.seekHelpDesc')}</small>
          </Link>
          <Link to="/offer-help" className="robinhood-btn robinhood-btn--offer">
            <span aria-hidden="true">🤲</span>
            <span>{t('robinhood.offerHelp')}</span>
            <small>{t('robinhood.offerHelpDesc')}</small>
          </Link>
        </div>

        {/* How it works */}
        <section aria-label={t('robinhood.howItWorks')}>
          <h2 className="section-heading">{t('robinhood.howItWorks')}</h2>
          <div className="robinhood-steps">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="robinhood-step">
                <div className="robinhood-step-number">{s.step}</div>
                <div className="robinhood-step-icon" aria-hidden="true">{s.icon}</div>
                <h3 className="robinhood-step-title">{t(s.titleKey)}</h3>
                <p className="robinhood-step-desc">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we cover */}
        <section aria-label={t('robinhood.whatWeCover')}>
          <h2 className="section-heading">{t('robinhood.whatWeCover')}</h2>
          <div className="robinhood-covers">
            {COVERS.map((c) => (
              <div key={c.titleKey} className="robinhood-cover-item card">
                <span className="robinhood-cover-icon" aria-hidden="true">{c.icon}</span>
                <h3 className="robinhood-cover-title">{t(c.titleKey)}</h3>
                <p className="robinhood-cover-desc">{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="card warning-card" style={{ margin: '0 1rem 1.5rem' }}>
          <p><strong>⚠️ {t('robinhood.disclaimer')}</strong></p>
          <p style={{ marginTop: '0.4rem' }}>{t('robinhood.disclaimerText')}</p>
        </div>

      </main>
    </div>
  );
}
