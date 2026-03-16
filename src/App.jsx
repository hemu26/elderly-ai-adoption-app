import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import WhatIsAI from './pages/WhatIsAI.jsx';
import VoiceAssistant from './pages/VoiceAssistant.jsx';
import Chat from './pages/Chat.jsx';
import HealthTips from './pages/HealthTips.jsx';
import NewsWeather from './pages/NewsWeather.jsx';
import ModernRobinhood from './pages/ModernRobinhood.jsx';
import SeekHelp from './pages/SeekHelp.jsx';
import OfferHelp from './pages/OfferHelp.jsx';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-is-ai" element={<WhatIsAI />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/news-weather" element={<NewsWeather />} />
        <Route path="/modern-robinhood" element={<ModernRobinhood />} />
        <Route path="/seek-help" element={<SeekHelp />} />
        <Route path="/offer-help" element={<OfferHelp />} />
      </Routes>
    </HashRouter>
  );
}
