import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import { Link } from 'react-router-dom';

const AI_EXAMPLES = [
  { icon: '📱', label: 'Asking phone for weather' },
  { icon: '💊', label: 'Getting health advice' },
  { icon: '🌐', label: 'Translating languages' },
  { icon: '📰', label: 'Reading news aloud' },
];

export default function WhatIsAI() {
  const { t } = useTranslation();
  const points = t('whatIsAI.points', { returnObjects: true });
  const exampleList = t('whatIsAI.exampleList', { returnObjects: true });

  return (
    <div className="page">
      <Header showBack />
      <main className="content-main">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #4A90E2, #764AE2)' }}>
          <span className="page-hero-icon">🧠</span>
          <h1 className="page-hero-title">{t('whatIsAI.title')}</h1>
        </div>

        <section className="card">
          <p className="intro-text">{t('whatIsAI.intro')}</p>
        </section>

        <section className="card">
          <h2 className="section-title">{t('whatIsAI.canHelpYou', { appName: t('appName') })}</h2>
          <ul className="points-list">
            {Array.isArray(points) &&
              points.map((point, i) => (
                <li key={i} className="point-item">
                  <span className="point-bullet">•</span>
                  <span>{point}</span>
                </li>
              ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="section-title">🌟 {t('whatIsAI.examples')}</h2>
          <div className="examples-grid">
            {AI_EXAMPLES.map((ex, i) => (
              <div key={i} className="example-item">
                <span className="example-icon">{ex.icon}</span>
                <span className="example-label">
                  {Array.isArray(exampleList) ? exampleList[i] : ex.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="cta-banner">
          <p className="cta-text">🚀 {t('whatIsAI.tryIt')}</p>
          <Link to="/voice-assistant" className="cta-btn">
            🎤 {t('features.voiceAssistant')}
          </Link>
        </div>
      </main>
    </div>
  );
}
