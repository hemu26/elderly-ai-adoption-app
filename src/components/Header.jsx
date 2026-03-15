import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n/index.js';
import i18n from '../i18n/index.js';

export default function Header({ showBack = false }) {
  const { t } = useTranslation();

  function handleLanguageChange(e) {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('ai-saathi-lang', lang);
  }

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack ? (
          <Link to="/" className="back-btn" aria-label={t('back')}>
            ← {t('back')}
          </Link>
        ) : (
          <span className="app-logo">🤖</span>
        )}
        <span className="app-name">{t('appName')}</span>
      </div>
      <div className="header-right">
        <label htmlFor="lang-select" className="sr-only">
          {t('selectLanguage')}
        </label>
        <select
          id="lang-select"
          className="lang-select"
          value={i18n.language}
          onChange={handleLanguageChange}
          aria-label={t('selectLanguage')}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
