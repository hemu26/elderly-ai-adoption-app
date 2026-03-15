import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';

// Simulated news headlines tailored for elderly Indian readers
const NEWS_BY_LANG = {
  en: [
    {
      title: 'Government Launches New Health Scheme for Senior Citizens',
      summary: 'The government has announced a new health insurance scheme providing free medical treatment up to ₹5 lakh for citizens above 70 years.',
      category: '🏥 Health',
    },
    {
      title: 'Yoga Day Celebrations Across India',
      summary: 'Millions of Indians participated in yoga sessions on International Yoga Day, promoting health and wellness.',
      category: '🧘 Wellness',
    },
    {
      title: 'New Pension Increase for Retired Government Employees',
      summary: 'The finance ministry has approved a 4% increase in dearness relief for pensioners effective from this month.',
      category: '💰 Finance',
    },
    {
      title: 'Ayushman Bharat Scheme Expanded to More Districts',
      summary: 'The Ayushman Bharat scheme now covers more rural districts, providing affordable healthcare to millions.',
      category: '🏥 Health',
    },
    {
      title: 'Simple Technology Tips to Help Elders Stay Connected',
      summary: 'Experts share simple ways for senior citizens to use smartphones to video call family and access government services.',
      category: '📱 Technology',
    },
  ],
  hi: [
    {
      title: 'सरकार ने वरिष्ठ नागरिकों के लिए नई स्वास्थ्य योजना शुरू की',
      summary: '70 वर्ष से अधिक नागरिकों को ₹5 लाख तक मुफ्त चिकित्सा उपचार देने वाली नई स्वास्थ्य बीमा योजना की घोषणा।',
      category: '🏥 स्वास्थ्य',
    },
    {
      title: 'पूरे भारत में अंतर्राष्ट्रीय योग दिवस मनाया गया',
      summary: 'लाखों भारतीयों ने योग दिवस पर स्वास्थ्य और वेलनेस को बढ़ावा देने के लिए योग सत्र में भाग लिया।',
      category: '🧘 स्वास्थ्य',
    },
    {
      title: 'सेवानिवृत्त सरकारी कर्मचारियों की पेंशन में वृद्धि',
      summary: 'वित्त मंत्रालय ने इस महीने से पेंशनभोगियों के लिए 4% महंगाई राहत वृद्धि को मंजूरी दी।',
      category: '💰 वित्त',
    },
    {
      title: 'आयुष्मान भारत योजना का विस्तार',
      summary: 'आयुष्मान भारत योजना अब अधिक ग्रामीण जिलों को कवर करती है, जिससे लाखों लोगों को किफायती स्वास्थ्य सेवा मिल रही है।',
      category: '🏥 स्वास्थ्य',
    },
    {
      title: 'बुज़ुर्गों के लिए सरल तकनीक सुझाव',
      summary: 'विशेषज्ञ वरिष्ठ नागरिकों के लिए स्मार्टफोन से परिवार से वीडियो कॉल करने के सरल तरीके साझा करते हैं।',
      category: '📱 तकनीक',
    },
  ],
  ta: [
    {
      title: 'மூத்த குடிமக்களுக்கு புதிய சுகாதார திட்டம்',
      summary: '70 வயதுக்கு மேற்பட்டவர்களுக்கு ₹5 லட்சம் வரை இலவச மருத்துவ சிகிச்சை வழங்கும் புதிய காப்பீட்டுத் திட்டம்.',
      category: '🏥 சுகாதாரம்',
    },
    {
      title: 'இந்தியாவில் யோகா தினம் கொண்டாட்டம்',
      summary: 'சர்வதேச யோகா தினத்தில் கோடிக்கணக்கான இந்தியர்கள் ஆரோக்கியத்தை மேம்படுத்த யோகா அமர்வுகளில் பங்கேற்றனர்.',
      category: '🧘 நலன்',
    },
    {
      title: 'ஓய்வூதியதாரர்களுக்கு நிவாரணம் அதிகரிப்பு',
      summary: 'நிதி அமைச்சகம் இம்மாதம் முதல் ஓய்வூதியதாரர்களுக்கு 4% விலைவாசி நிவாரண அதிகரிப்பை அனுமதித்தது.',
      category: '💰 நிதி',
    },
  ],
};

// Simulated weather data for major Indian cities
const WEATHER_CITIES = [
  { city: 'Delhi', temp: 32, feels: 35, humidity: 45, condition: '☀️ Sunny', conditionHi: '☀️ धूप', conditionTa: '☀️ வெயில்' },
  { city: 'Mumbai', temp: 30, feels: 34, humidity: 78, condition: '⛅ Partly Cloudy', conditionHi: '⛅ आंशिक बादल', conditionTa: '⛅ சிறிய மேகம்' },
  { city: 'Chennai', temp: 33, feels: 38, humidity: 70, condition: '🌤️ Mostly Sunny', conditionHi: '🌤️ ज्यादातर धूप', conditionTa: '🌤️ பெரும்பாலும் வெயில்' },
  { city: 'Kolkata', temp: 28, feels: 31, humidity: 82, condition: '🌦️ Light Showers', conditionHi: '🌦️ हल्की बारिश', conditionTa: '🌦️ லேசான மழை' },
  { city: 'Bangalore', temp: 25, feels: 27, humidity: 60, condition: '⛅ Pleasant', conditionHi: '⛅ सुहावना', conditionTa: '⛅ இனிமையான' },
];

export default function NewsWeather() {
  const { t, i18n } = useTranslation();
  const [selectedCity, setSelectedCity] = useState(0);
  const [lastUpdated] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  });

  const news = NEWS_BY_LANG[i18n.language] || NEWS_BY_LANG.en;
  const weather = WEATHER_CITIES[selectedCity];

  function getCondition(w) {
    if (i18n.language === 'hi') return w.conditionHi;
    if (i18n.language === 'ta') return w.conditionTa;
    return w.condition;
  }

  return (
    <div className="page">
      <Header showBack />
      <main className="content-main">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #904AE2, #4A90E2)' }}>
          <span className="page-hero-icon">📰</span>
          <h1 className="page-hero-title">{t('news.title')}</h1>
        </div>

        {/* Weather Section */}
        <div className="card weather-card">
          <h2 className="section-title">🌤️ {t('news.weather')}</h2>
          <div className="city-tabs">
            {WEATHER_CITIES.map((w, i) => (
              <button
                key={i}
                className={`city-tab ${selectedCity === i ? 'city-tab--active' : ''}`}
                onClick={() => setSelectedCity(i)}
              >
                {w.city}
              </button>
            ))}
          </div>
          <div className="weather-display">
            <div className="weather-condition">{getCondition(weather)}</div>
            <div className="weather-temp">{weather.temp}°C</div>
            <div className="weather-details">
              <span>💧 {t('news.humidity')}: {weather.humidity}%</span>
              <span>🌡️ {t('news.feelsLike')}: {weather.feels}°C</span>
            </div>
          </div>
          <p className="last-updated">
            🕐 {t('news.lastUpdated')}: {lastUpdated}
          </p>
        </div>

        {/* News Section */}
        <div className="card">
          <h2 className="section-title">📰 {t('news.headlines')}</h2>
          <div className="news-list">
            {news.map((item, i) => (
              <article key={i} className="news-item">
                <span className="news-category">{item.category}</span>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
