import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import { getAIResponse } from '../aiResponses.js';
import i18n from '../i18n/index.js';

export default function Chat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { role: 'ai', text: t('chat.greeting') },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);
  const suggestions = t('chat.suggestionList', { returnObjects: true });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'ai', text: t('chat.greeting') }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const aiReply = getAIResponse(text.trim(), i18n.language);
      setMessages((prev) => [...prev, { role: 'ai', text: aiReply }]);
      setIsThinking(false);
    }, 700 + Math.random() * 600);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleSuggestion(s) {
    sendMessage(s);
  }

  function handleClear() {
    setMessages([{ role: 'ai', text: t('chat.greeting') }]);
    setInput('');
  }

  return (
    <div className="page chat-page">
      <Header showBack />
      <main className="chat-main">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #4AE290, #4A90E2)' }}>
          <span className="page-hero-icon">💬</span>
          <h1 className="page-hero-title">{t('chat.title')}</h1>
        </div>

        <div className="chat-messages" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === 'ai' ? 'chat-bubble--ai' : 'chat-bubble--user'}`}>
              {msg.role === 'ai' && <span className="chat-avatar">🤖</span>}
              <p className="chat-text">{msg.text}</p>
              {msg.role === 'user' && <span className="chat-avatar">👤</span>}
            </div>
          ))}
          {isThinking && (
            <div className="chat-bubble chat-bubble--ai">
              <span className="chat-avatar">🤖</span>
              <p className="chat-text thinking-dots">⏳ {t('chat.thinking')}</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="suggestions-row">
          <p className="suggestions-label">{t('chat.suggestions')}</p>
          <div className="suggestions-scroll">
            {Array.isArray(suggestions) &&
              suggestions.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => handleSuggestion(s)}
                  disabled={isThinking}
                >
                  {s}
                </button>
              ))}
          </div>
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
            aria-label={t('chat.placeholder')}
            disabled={isThinking}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || isThinking}
            aria-label={t('chat.send')}
          >
            {t('chat.send')}
          </button>
          <button
            type="button"
            className="chat-clear-btn"
            onClick={handleClear}
            aria-label={t('chat.clear')}
          >
            {t('chat.clear')}
          </button>
        </form>
      </main>
    </div>
  );
}
