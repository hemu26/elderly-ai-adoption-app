import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';

const CATEGORIES = [
  { value: 'financial', labelKey: 'robinhood.catFinancial', icon: '💰' },
  { value: 'injustice', labelKey: 'robinhood.catInjustice', icon: '⚖️' },
  { value: 'community', labelKey: 'robinhood.catCommunity', icon: '🤝' },
];

const INITIAL_FORM = {
  name: '',
  category: '',
  title: '',
  description: '',
  amountNeeded: '',
  contact: '',
};

export default function SeekHelp() {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.category) errs.category = t('robinhood.errorCategory');
    if (!form.title.trim()) errs.title = t('robinhood.errorTitle');
    if (!form.description.trim()) errs.description = t('robinhood.errorDescription');
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'category' && value !== 'financial') {
        next.amountNeeded = '';
      }
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const selectedCategory = CATEGORIES.find((c) => c.value === form.category);
    const categoryLabel = selectedCategory?.labelKey
      ? t(selectedCategory.labelKey)
      : form.category;

    const newCase = {
      id: `case-${Date.now()}`,
      ...form,
      categoryLabel,
      amountNeeded: form.amountNeeded ? parseInt(form.amountNeeded, 10) : null,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      verified: false,
      status: 'pending',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('robinhood-cases') || '[]');
      localStorage.setItem('robinhood-cases', JSON.stringify([...existing, newCase]));
    } catch {
      // localStorage unavailable – continue anyway
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="page">
        <Header showBack />
        <main className="content-main">
          <div className="robinhood-success card">
            <span className="robinhood-success-icon" aria-hidden="true">✅</span>
            <h2>{t('robinhood.successTitle')}</h2>
            <p>{t('robinhood.successText')}</p>
            <p className="robinhood-success-note">{t('robinhood.successNote')}</p>
            <button
              className="robinhood-submit-btn"
              style={{ marginTop: '1.25rem' }}
              onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); }}
            >
              {t('robinhood.submitAnother')}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header showBack />

      <div
        className="page-hero"
        style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)' }}
      >
        <span className="page-hero-icon" aria-hidden="true">🙋</span>
        <h1 className="page-hero-title">{t('robinhood.seekHelpTitle')}</h1>
      </div>

      <main className="content-main">
        <div className="card" style={{ margin: '1rem 1rem 0' }}>
          <p>{t('robinhood.seekHelpIntro')}</p>
        </div>

        <form
          className="robinhood-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label={t('robinhood.seekHelpTitle')}
        >
          {/* Category */}
          <div className="robinhood-field">
            <label className="robinhood-label">
              {t('robinhood.labelCategory')} <span aria-hidden="true" className="required-star">*</span>
            </label>
            <div className="robinhood-category-group" role="group" aria-label={t('robinhood.labelCategory')}>
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  className={`robinhood-category-btn${form.category === cat.value ? ' selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.value}
                    checked={form.category === cat.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span aria-hidden="true">{cat.icon}</span> {t(cat.labelKey)}
                </label>
              ))}
            </div>
            {errors.category && <span className="robinhood-error" role="alert">{errors.category}</span>}
          </div>

          {/* Title */}
          <div className="robinhood-field">
            <label className="robinhood-label" htmlFor="title">
              {t('robinhood.labelTitle')} <span aria-hidden="true" className="required-star">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`robinhood-input${errors.title ? ' input-error' : ''}`}
              value={form.title}
              onChange={handleChange}
              placeholder={t('robinhood.placeholderTitle')}
              maxLength={100}
              aria-required="true"
              aria-invalid={!!errors.title}
            />
            {errors.title && <span className="robinhood-error" role="alert">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="robinhood-field">
            <label className="robinhood-label" htmlFor="description">
              {t('robinhood.labelDescription')} <span aria-hidden="true" className="required-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`robinhood-textarea${errors.description ? ' input-error' : ''}`}
              value={form.description}
              onChange={handleChange}
              placeholder={t('robinhood.placeholderDescription')}
              rows={5}
              maxLength={1000}
              aria-required="true"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <span className="robinhood-error" role="alert">{errors.description}</span>
            )}
          </div>

          {/* Amount needed (financial only) */}
          {form.category === 'financial' && (
            <div className="robinhood-field">
              <label className="robinhood-label" htmlFor="amountNeeded">
                {t('robinhood.labelAmount')}
              </label>
              <input
                id="amountNeeded"
                name="amountNeeded"
                type="number"
                className="robinhood-input"
                value={form.amountNeeded}
                onChange={handleChange}
                placeholder={t('robinhood.placeholderAmount')}
                min={1}
                max={10000000}
              />
            </div>
          )}

          {/* Name (optional) */}
          <div className="robinhood-field">
            <label className="robinhood-label" htmlFor="name">
              {t('robinhood.labelName')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="robinhood-input"
              value={form.name}
              onChange={handleChange}
              placeholder={t('robinhood.placeholderName')}
              maxLength={60}
            />
          </div>

          {/* Contact (optional) */}
          <div className="robinhood-field">
            <label className="robinhood-label" htmlFor="contact">
              {t('robinhood.labelContact')}
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              className="robinhood-input"
              value={form.contact}
              onChange={handleChange}
              placeholder={t('robinhood.placeholderContact')}
              maxLength={100}
            />
            <small className="robinhood-hint">{t('robinhood.contactHint')}</small>
          </div>

          <button type="submit" className="robinhood-submit-btn">
            {t('robinhood.submitCase')}
          </button>
        </form>
      </main>
    </div>
  );
}
