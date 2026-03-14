import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';

const CATEGORIES = ['diet', 'exercise', 'sleep', 'mental'];
const CATEGORY_ICONS = { diet: '🥗', exercise: '🏃', sleep: '😴', mental: '🧘' };

const TODAY_TIP = {
  en: '💡 Start your day with a glass of warm water with lemon. This helps digestion and boosts immunity.',
  hi: '💡 नींबू के साथ गर्म पानी के गिलास से अपना दिन शुरू करें। यह पाचन में मदद करता है और प्रतिरक्षा बढ़ाता है।',
  ta: '💡 எலுமிச்சை மற்றும் வெதுவெதுப்பான நீர் குடித்து உங்கள் நாளை தொடங்குங்கள். இது செரிமானத்திற்கு உதவுகிறது.',
  te: '💡 నిమ్మకాయతో వేడి నీటి గ్లాసుతో మీ రోజు ప్రారంభించండి. ఇది జీర్ణక్రియకు సహాయపడుతుంది.',
  bn: '💡 লেবু দিয়ে এক গ্লাস গরম পানি দিয়ে আপনার দিন শুরু করুন। এটি হজম শক্তি বাড়ায়।',
};

export default function HealthTips() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('diet');
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Metformin', time: 'morning', enabled: true },
    { id: 2, name: 'Atenolol', time: 'night', enabled: true },
  ]);
  const [newMed, setNewMed] = useState('');
  const [newMedTime, setNewMedTime] = useState('morning');

  const tips = t(`health.tips.${activeCategory}`, { returnObjects: true });
  const todayTip = TODAY_TIP[i18n.language] || TODAY_TIP.en;

  function addMedicine() {
    if (!newMed.trim()) return;
    setMedicines((prev) => [
      ...prev,
      { id: Date.now(), name: newMed.trim(), time: newMedTime, enabled: true },
    ]);
    setNewMed('');
  }

  function toggleMedicine(id) {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  }

  function removeMedicine(id) {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="page">
      <Header showBack />
      <main className="content-main">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #E24A4A, #E2904A)' }}>
          <span className="page-hero-icon">❤️</span>
          <h1 className="page-hero-title">{t('health.title')}</h1>
        </div>

        <div className="card highlight-card">
          <h2 className="section-title">✨ {t('health.todayTip')}</h2>
          <p className="highlight-text">{todayTip}</p>
        </div>

        <div className="card">
          <div className="category-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`category-tab ${activeCategory === cat ? 'category-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {CATEGORY_ICONS[cat]} {t(`health.categories.${cat}`)}
              </button>
            ))}
          </div>

          <ul className="tips-list" role="tabpanel">
            {Array.isArray(tips) &&
              tips.map((tip, i) => (
                <li key={i} className="tip-item">
                  <span className="tip-number">{i + 1}</span>
                  <span className="tip-text">{tip}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="section-title">💊 {t('health.reminder.title')}</h2>

          <div className="medicines-list">
            {medicines.map((med) => (
              <div key={med.id} className={`medicine-item ${med.enabled ? '' : 'medicine-item--disabled'}`}>
                <span className="medicine-icon">💊</span>
                <div className="medicine-info">
                  <span className="medicine-name">{med.name}</span>
                  <span className="medicine-time">
                    {CATEGORY_ICONS[med.time] || '⏰'}{' '}
                    {t(`health.reminder.${med.time}`)}
                  </span>
                </div>
                <div className="medicine-actions">
                  <button
                    className={`toggle-btn ${med.enabled ? 'toggle-btn--on' : 'toggle-btn--off'}`}
                    onClick={() => toggleMedicine(med.id)}
                    aria-label={med.enabled ? 'Disable reminder' : 'Enable reminder'}
                  >
                    {med.enabled ? '🔔' : '🔕'}
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMedicine(med.id)}
                    aria-label={`Remove ${med.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-medicine-form">
            <input
              type="text"
              className="medicine-input"
              placeholder={t('health.reminder.medicineName')}
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              aria-label={t('health.reminder.medicineName')}
            />
            <select
              className="time-select"
              value={newMedTime}
              onChange={(e) => setNewMedTime(e.target.value)}
              aria-label="Time of day"
            >
              {['morning', 'afternoon', 'evening', 'night'].map((t2) => (
                <option key={t2} value={t2}>{t(`health.reminder.${t2}`)}</option>
              ))}
            </select>
            <button className="add-med-btn" onClick={addMedicine}>
              + {t('health.reminder.addMedicine')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
