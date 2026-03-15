import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const FEATURES = [
  {
    to: '/what-is-ai',
    icon: '🧠',
    key: 'whatIsAI',
    descKey: 'whatIsAIDesc',
    color: '#4A90E2',
  },
  {
    to: '/voice-assistant',
    icon: '🎤',
    key: 'voiceAssistant',
    descKey: 'voiceAssistantDesc',
    color: '#E24A4A',
  },
  {
    to: '/chat',
    icon: '💬',
    key: 'chat',
    descKey: 'chatDesc',
    color: '#4AE290',
  },
  {
    to: '/health-tips',
    icon: '❤️',
    key: 'healthTips',
    descKey: 'healthTipsDesc',
    color: '#E2904A',
  },
  {
    to: '/news-weather',
    icon: '📰',
    key: 'newsWeather',
    descKey: 'newsWeatherDesc',
    color: '#904AE2',
  },
  {
    to: '/modern-robinhood',
    icon: '⚖️',
    key: 'modernRobinhood',
    descKey: 'modernRobinhoodDesc',
    color: '#1a73e8',
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <Header />
      <main className="home-main">
        <div className="home-greeting">
          <h1 className="home-title">🙏 {t('appName')}</h1>
          <p className="home-tagline">{t('tagline')}</p>
        </div>
        <nav className="features-grid" aria-label="Main features">
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.key}
              to={f.to}
              icon={f.icon}
              title={t(`features.${f.key}`)}
              description={t(`features.${f.descKey}`)}
              color={f.color}
            />
          ))}
        </nav>
      </main>
    </div>
  );
}
