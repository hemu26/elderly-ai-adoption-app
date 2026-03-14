import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import { getAIResponse } from '../aiResponses.js';
import i18n from '../i18n/index.js';

export default function VoiceAssistant() {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported] = useState(
    () => !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);
  const suggestions = t('voice.suggestions', { returnObjects: true });

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  function getLangCode() {
    const lang = i18n.language;
    const map = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN' };
    return map[lang] || 'en-IN';
  }

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = getLangCode();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
      setIsProcessing(true);
      setTimeout(() => {
        const aiReply = getAIResponse(text, i18n.language);
        setResponse(aiReply);
        setIsProcessing(false);
        speakResponse(aiReply);
      }, 800);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
    setTranscript('');
    setResponse('');
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }

  function speakResponse(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLangCode();
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  function handleSuggestionClick(suggestion) {
    setTranscript(suggestion);
    setIsProcessing(true);
    setTimeout(() => {
      const aiReply = getAIResponse(suggestion, i18n.language);
      setResponse(aiReply);
      setIsProcessing(false);
      speakResponse(aiReply);
    }, 600);
  }

  return (
    <div className="page">
      <Header showBack />
      <main className="content-main">
        <div className="page-hero" style={{ background: 'linear-gradient(135deg, #E24A4A, #E2904A)' }}>
          <span className="page-hero-icon">🎤</span>
          <h1 className="page-hero-title">{t('voice.title')}</h1>
        </div>

        {!isSupported ? (
          <div className="card warning-card">
            <p>{t('voice.notSupported')}</p>
          </div>
        ) : (
          <div className="card center-card">
            <p className="instruction-text">{t('voice.instruction')}</p>
            <button
              className={`mic-btn ${isListening ? 'mic-btn--active' : ''}`}
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              aria-label={isListening ? t('voice.stopListening') : t('voice.startListening')}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
            <p className="mic-label">
              {isListening
                ? t('voice.listening')
                : isProcessing
                ? t('voice.processing')
                : t('voice.startListening')}
            </p>
          </div>
        )}

        {transcript && (
          <div className="card">
            <h3 className="result-label">{t('voice.yourQuestion')}</h3>
            <p className="result-text user-text">{transcript}</p>
          </div>
        )}

        {isProcessing && (
          <div className="card">
            <p className="thinking-text">⏳ {t('chat.thinking')}</p>
          </div>
        )}

        {response && (
          <div className="card ai-response-card">
            <h3 className="result-label">{t('voice.aiResponse')}</h3>
            <p className="result-text ai-text">{response}</p>
            <button
              className="speak-btn"
              onClick={() => speakResponse(response)}
              aria-label="Read aloud"
            >
              🔊 Read aloud
            </button>
          </div>
        )}

        <div className="card">
          <h3 className="section-title">{t('voice.tryThese')}</h3>
          <div className="suggestions-list">
            {Array.isArray(suggestions) &&
              suggestions.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={isListening || isProcessing}
                >
                  {s}
                </button>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
